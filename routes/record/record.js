const express = require('express');
const router = express.Router();
const Record = require('../../models/PatientRecord');
const verifyToken = require('../../utils/verifyToken');

// @route GET record/all
// @descr Get all patients records
router.get('/all', async (req, res) => {
	try {
		const records = await Record.find({});

		return res.status(200).json(records);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET record/id/:id
// @descr Get patients record by id
// @role Doctor
router.get('/id/:id', async (req, res) => {
	try {
		const record = await Record.findOne({ patient_id: req.params.id });

		if (!record)
			return res
				.status(400)
				.json({ errors: { msg: "Patient's record not found" } });

		return res.status(200).json(record);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET record/current
// @descr Get current patients record
// @role Patient
router.get('/current', verifyToken, async (req, res) => {
	try {
		const record = await Record.findOne({
			patient_id: req.user.id,
		});

		if (!record)
			return res
				.status(400)
				.json({ errors: { msg: "Patient's record not found" } });

		return res.status(200).json(record);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route POST record/update
// @descr Create/Update patient's record to DB
router.post('/update', verifyToken, async (req, res) => {
	const user_id = req.user.id;

	//Check if there is an existing patient record
	try {
		const options = { upsert: true };
		const filter = { patient_id: user_id };
		const updateData = {
			$set: {
				age: req.body.age,
				blood_pressure: req.body.blood_pressure,
				heart_rate: req.body.heart_rate,
			},
		};
		const result = await Record.updateOne(filter, updateData, options);
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route POST record/delete/:id
// @descr Delete patient's record by id
// @success Returns JSON of deleted record
router.delete('/delete/:id', async (req, res) => {
	try {
		const deleted = await Record.findOneAndDelete({ patient_id: req.params.id });

		if (!deleted)
			return res
				.status(400)
				.json({ errors: { msg: "Patient's record not found" } });

		return res.status(200).json(deleted);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
