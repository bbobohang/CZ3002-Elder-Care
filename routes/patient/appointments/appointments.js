const express = require('express');
const router = express.Router();
const verifyToken = require('../../../utils/verifyToken');
const Medication = require('../../../models/Medication');
const TeleDoctor = require('../../../models/TeleDoctor');
const HomeDoctor = require('../../../models/HomeDoctor');

// @route GET med/appt
// @descr Get all patients' appointment time (med, teledoc, homedoc)
// @role Patient
router.get('/all', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	const convertMonth = (month) => {
		if (month === 'Jan') return 0;
		if (month === 'Feb') return 1;
		if (month === 'Mar') return 2;
		if (month === 'Apr') return 3;
		if (month === 'May') return 4;
		if (month === 'Jun') return 5;
		if (month === 'Jul') return 6;
		if (month === 'Aug') return 7;
		if (month === 'Sep') return 8;
		if (month === 'Oct') return 9;
		if (month === 'Nov') return 10;
		if (month === 'Dec') return 11;
		return 0;
	};
	try {
		// const data = {
		// 	patient_id: req.user.id,
		// 	time: req.body.time,
		// 	medication_name: req.body.medication_name,
		// 	medication_quantity: req.body.medication_quantity,
		// 	patient_name: req.user.name,
		// 	date: req.body.date,
		// 	price: req.body.price,
		// };
		const med = await Medication.find({ patient_id: req.user.id });
		const teledoc = await TeleDoctor.find({ patient_id: req.user.id });
		const homedoc = await HomeDoctor.find({ patient_id: req.user.id });
		var list = [];
		med.map((item, index) => {
			const day = item.date.split(' ')[2];
			const year = item.date.split(' ')[3];
			const month = convertMonth(item.date.split(' ')[1]);
			const hour = item.time.split(':')[0];
			const min = item.time.split(':')[1];
			const calendar_object = {
				title: 'Medication Delivery',
				desc: item.medication_name,
				year: parseInt(year),
				month: month,
				day: parseInt(day),
				hour: parseInt(hour),
				end_hour: parseInt(hour) + 1,
				min: parseInt(min),
				allDay: false,
				appt_id: item._id,
				patient_id: item.patient_id,
				patient_name: item.name,
			};
			list.push(calendar_object);
		});
		teledoc.map((item, index) => {
			const day = item.date.split(' ')[2];
			const year = item.date.split(' ')[3];
			const month = convertMonth(item.date.split(' ')[1]);
			const hour = item.time.split(':')[0];
			const min = item.time.split(':')[1];
			const calendar_object = {
				title: 'TeleDoctor Appointment',
				year: parseInt(year),
				month: month,
				day: parseInt(day),
				hour: parseInt(hour),
				end_hour: parseInt(hour) + 1,
				min: parseInt(min),
				allDay: false,
				appt_id: item._id,
				patient_id: req.user.id,
				patient_name: req.user.name,
			};
			list.push(calendar_object);
		});
		homedoc.map((item, index) => {
			const day = item.date.split(' ')[2];
			const year = item.date.split(' ')[3];
			const month = convertMonth(item.date.split(' ')[1]);
			const hour = item.time.split(':')[0];
			const min = item.time.split(':')[1];
			const calendar_object = {
				title: 'Home Doctor Appointment',
				year: parseInt(year),
				month: month,
				day: parseInt(day),
				hour: parseInt(hour),
				end_hour: parseInt(hour) + 1,
				min: parseInt(min),
				allDay: false,
				appt_id: item._id,
				patient_id: req.user.id,
				patient_name: req.user.name,
			};
			list.push(calendar_object);
		});
		return res.status(200).json(list);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET med/appt
// @descr Get all patients' appointment time (med, teledoc, homedoc)
// @role Patient
router.get('/doc/all', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	const convertMonth = (month) => {
		if (month === 'Jan') return 0;
		if (month === 'Feb') return 1;
		if (month === 'Mar') return 2;
		if (month === 'Apr') return 3;
		if (month === 'May') return 4;
		if (month === 'Jun') return 5;
		if (month === 'Jul') return 6;
		if (month === 'Aug') return 7;
		if (month === 'Sep') return 8;
		if (month === 'Oct') return 9;
		if (month === 'Nov') return 10;
		if (month === 'Dec') return 11;
		return 0;
	};
	try {
		// const data = {
		// 	patient_id: req.user.id,
		// 	time: req.body.time,
		// 	medication_name: req.body.medication_name,
		// 	medication_quantity: req.body.medication_quantity,
		// 	patient_name: req.user.name,
		// 	date: req.body.date,
		// 	price: req.body.price,
		// };
		const med = await Medication.find({});
		const teledoc = await TeleDoctor.find({});
		const homedoc = await HomeDoctor.find({});
		var list = [];
		med.map((item, index) => {
			const day = item.date.split(' ')[2];
			const year = item.date.split(' ')[3];
			const month = convertMonth(item.date.split(' ')[1]);
			const hour = item.time.split(':')[0];
			const min = item.time.split(':')[1];
			const calendar_object = {
				title: 'Medication Delivery',
				desc: item.medication_name,
				year: parseInt(year),
				month: month,
				day: parseInt(day),
				hour: parseInt(hour),
				end_hour: parseInt(hour) + 1,
				min: parseInt(min),
				allDay: false,
				appt_id: item._id,
				patient_id: item.patient_id,
				patient_name: item.patient_name,
			};
			list.push(calendar_object);
		});
		teledoc.map((item, index) => {
			const day = item.date.split(' ')[2];
			const year = item.date.split(' ')[3];
			const month = convertMonth(item.date.split(' ')[1]);
			const hour = item.time.split(':')[0];
			const min = item.time.split(':')[1];
			const calendar_object = {
				title: 'TeleDoctor Appointment',
				year: parseInt(year),
				month: month,
				day: parseInt(day),
				hour: parseInt(hour),
				end_hour: parseInt(hour) + 1,
				min: parseInt(min),
				allDay: false,
				appt_id: item._id,
				patient_id: item.patient_id,
				patient_name: item.patient_name,
			};
			list.push(calendar_object);
		});
		homedoc.map((item, index) => {
			const day = item.date.split(' ')[2];
			const year = item.date.split(' ')[3];
			const month = convertMonth(item.date.split(' ')[1]);
			const hour = item.time.split(':')[0];
			const min = item.time.split(':')[1];
			const calendar_object = {
				title: 'Home Doctor Appointment',
				year: parseInt(year),
				month: month,
				day: parseInt(day),
				hour: parseInt(hour),
				end_hour: parseInt(hour) + 1,
				min: parseInt(min),
				allDay: false,
				appt_id: item._id,
				patient_id: item.patient_id,
				patient_name: item.patient_name,
			};
			list.push(calendar_object);
		});
		return res.status(200).json(list);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
