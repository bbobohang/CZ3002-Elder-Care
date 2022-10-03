const express = require('express');
const router = express.Router();
const Record = require('../../../models/PatientRecord');
const User = require('../../../models/User');
const verifyToken = require('../../../utils/verifyToken');
const jwt = require('jsonwebtoken');

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
	//Check if there is an existing patient record
	try {
		const user = req.user;
		//Updating record model
		const options = { upsert: true };
		const filter = { patient_id: req.user.id };
		const filter2 = { email: req.user.email };
		const updateRecordData = {
			$set: {
				name: req.body.name,
				medical_conditions: req.body.medical_conditions,
				address: req.body.address,
				block_no: req.body.block_no,
				postal_code: req.body.postal_code,
			},
		};
		await Record.updateOne(filter, updateRecordData, options);
		//Updating the user model
		const updateUserData = {
			$set: {
				name: req.body.name,
			},
		};
		await User.updateOne(filter2, updateUserData, options);

		//Reset the cookies as the name as changed
		//Maybe should not store the email in the token
		const new_user = {
			id: user.id,
			email: user.email,
			name: req.body.name,
			role: user.role,
		};
		const token = jwt.sign(new_user, process.env.jwtSecret);
		console.log('User token updated');

		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json({ new_user });
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
