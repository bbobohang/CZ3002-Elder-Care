const express = require('express');
const router = express.Router();
const verifyToken = require('../../../utils/verifyToken');
const TeleDoctor = require('../../../models/TeleDoctor');

// @route POST teledoc/create
// @descr Create/Update patients medication's tele appointment to DB
// @role Patient
router.post('/create', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	try {
		const data = {
			patient_id: req.user.id,
			dateTime: req.body.dateTime,
			doctorType: req.body.doctorType,
		};

		const exist = await TeleDoctor.findOne({
			dateTime: req.body.dateTime,
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
