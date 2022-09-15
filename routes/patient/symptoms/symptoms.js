const express = require('express');
const router = express.Router();
const verifyToken = require('../../../utils/verifyToken');
const Symptoms = require('../../../models/Symptoms');
const config = require('config');
const apiKey = config.get('medicAPIToken');
const axios = require('axios');
//To push the data into Mongo. Run once will do
router.post('/create-sym', async (req, res) => {
	//Check if there is an existing patient record
	symptoms.map(async (item, index) => {
		try {
			const data = {
				ID: item.ID,
				Name: item.Name,
			};
			const result = await Symptoms.insertMany(data);
		} catch (error) {
			console.log(error.message);
			res.status(500).send('Server Error');
		}
	});
	return res.status(200).json('All in');
});

// @route GET all
// @descr Get all symptoms
// @role Patient
router.get('/all', async (req, res) => {
	try {
		const result = await Symptoms.find();
		return res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET all
// @descr Get all symptoms
// @role Patient
router.get('/predict', async (req, res) => {
	try {
		axios
			.get(
				`https://healthservice.priaid.ch/diagnosis/specialisations?symptoms=[${req.body.symptoms}]&gender=${req.body.gender}&year_of_birth=${req.body.year}&token=${apiKey}&format=json&language=en-gb`
			)
			.then((result) => {
				return res.status(200).json(result);
			});
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
