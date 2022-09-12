const express = require('express');
const router = express.Router();
const verifyToken = require('../../../utils/verifyToken');
const HomeDoctor = require('../../../models/HomeDoctor');

// @route POST homedoc/create
// @descr Create/Update patients medication's tele appointment to DB
// @role Patient
router.post('/create', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	try {
		const data = {
			patient_id: req.user.id,
			time: req.body.time,
			date: req.body.date,			
			doctorType: req.body.doctorType,
            address: req.body.address
		};

		const exist = await HomeDoctor.findOne({
			time: req.body.time,
			date: req.body.date,
			doctorType: req.body.doctorType,
		});

		if (exist)
			return res
				.status(400)
				.json({ errors: { msg: 'Timing is already booked ' } });
		const result = await HomeDoctor.insertMany(data);
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET homedoc/get-all-docs
// @descr Get all doctors' appointment
// @role Patient
router.get('/doctype/:type', async (req, res) => {
	try {
		const result = await HomeDoctor.find({ doctorType: req.params.type });

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

// @route GET homedoc/id/:id
// @descr Get all patients appoitment
// @role Patient
router.get('/id/:id', async (req, res) => {
	try {
		const result = await HomeDoctor.find({ patient_id: req.params.id });

		if (!result)
			return res.status(400).json({ errors: { msg: 'No Appointments found' } });

		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET homedoc/all
// @descr Get all  appoitment
// @role Patient
router.get('/all', async (req, res) => {
	try {
		const result = await HomeDoctor.find({});

		if (!result)
			return res.status(400).json({ errors: { msg: 'No Appointments found' } });

		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
