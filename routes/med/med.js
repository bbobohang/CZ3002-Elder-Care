const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');
const Medication = require('../../models/Medication');

// @route POST med/update
// @descr Create/Update patients medication's record to DB
// @role Patient
router.post('/create', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	try {
		const data = {
			patient_id: req.user.id,
			time: req.body.time,
			medication_name: req.body.medication_name,
			medication_quantity: req.body.medication_quantity,
			patient_name: req.user.name,
		};
		const result = await Medication.insertMany(data);
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route POST med/accept
// @descr Create/Update patients medication's record to DB
// @role Doctor
router.post('/accept/:id', verifyToken, async (req, res) => {
	const med_id = req.params.id;
	const role = req.user.role;

	if (role === 'patient')
		return res.status(401).json({ errors: { msg: 'Not authorised' } });
	//Check if there is an existing patient record
	try {
		const options = { upsert: false };
		const filter = { _id: med_id };
		const updateData = {
			$set: {
				acceptance: true,
			},
		};
		const result = await Medication.updateOne(filter, updateData, options);

		if (!result) return res.status(400).json('Medication Order cannot be found!');
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET med/all
// @descr Get all medication request
router.get('/all', async (req, res) => {
	//Check if there is an existing patient record
	try {
		const result = await Medication.find();
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET med/:id
// @descr Get all medication request
// @role Doctor
router.get('/id/:id', verifyToken, async (req, res) => {
	//Check if there is an existing patient record
	const role = req.user.role;

	if (role === 'patient')
		return res.status(401).json({ errors: { msg: 'Not authorised' } });
	const patient_id = req.params.id;
	try {
		const result = await Medication.find({ patient_id: patient_id });
		if (!result)
			return res.status(400).json('Patient does not have medicine order');
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
