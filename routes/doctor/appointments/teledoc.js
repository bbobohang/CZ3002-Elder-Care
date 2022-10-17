const express = require('express');
const router = express.Router();
const verifyToken = require('../../../utils/verifyToken');
const TeleDoctor = require('../../../models/TeleDoctor');

// @route POST teledoc/create
// @descr Create patients medication's tele appointment to DB
// @role Patient
router.post('/create', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	try {
		const data = {
			patient_id: req.user.id,
			patient_name: req.user.name,
			time: req.body.time,
			date: req.body.date,
			doctorType: req.body.doctorType,
		};

		const exist = await TeleDoctor.findOne({
			time: req.body.time,
			date: req.body.date,
			doctorType: req.body.doctorType,
		});

		if (exist)
			return res
				.status(400)
				.json({ errors: { msg: 'Timing is already booked ' } });
		const result = await TeleDoctor.insertMany(data);
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});
// @route POST teledoc/edit
// @descr Update patients medication's tele appointment to DB
// @role Patient
router.post('/edit', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	try {
		const data = {
			patient_id: req.user.id,
			time: req.body.time,
			date: req.body.date,
		};

		const exist = await TeleDoctor.findOne({
			time: req.body.time,
			date: req.body.date,
		});

		if (exist)
			return res
				.status(400)
				.json({ errors: { msg: 'Timing is already booked ' } });
		const options = { upsert: false };
		const filter = { _id: req.body.appt_id };
		const updateData = {
			$set: {
				time: req.body.time,
				date: req.body.date,
			},
		};
		const result = await TeleDoctor.updateOne(filter, updateData, options);

		if (!result) return res.status(400).json('Update failed!');
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route POST teledoc/edit
// @descr Update patients medication's tele appointment to DB
// @role Patient
router.post('/delete', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	try {
		const query = { _id: req.body.appt_id };
		const result = await TeleDoctor.deleteOne(query);

		if (!result) return res.status(400).json('Update failed!');
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET teledoc/get-all-docs
// @descr Get all doctors' appointment
// @role Patient
router.get('/doctype/:type', async (req, res) => {
	try {
		const result = await TeleDoctor.find({ doctorType: req.params.type });

		if (!result)
			return res
				.status(400)
				.json({ errors: { msg: 'No Appointments found for doctor' } });

		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET teledoc/id/:id
// @descr Get all patients appoitment
// @role Patient
router.get('/id/:id', async (req, res) => {
	try {
		const result = await TeleDoctor.find({ patient_id: req.params.id });

		if (!result)
			return res.status(400).json({ errors: { msg: 'No Appointments found' } });

		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET teledoc/all
// @descr Get all  appoitment
// @role Patient
router.get('/all', async (req, res) => {
	try {
		const result = await TeleDoctor.find({});

		if (!result)
			return res.status(400).json({ errors: { msg: 'No Appointments found' } });

		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
