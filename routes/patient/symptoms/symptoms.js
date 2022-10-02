const express = require('express');
const router = express.Router();
const Symptoms = require('../../../models/Symptoms');
const getToken = require('../../../utils/getToken');
const fetch = require('node-fetch');

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
// @descr Get all symptoms with their chosen symptoms
// @role Patient
router.get('/predict', getToken, async (req, res) => {
	try {
		const token = req.body.medicToken;
		const apiUrl = process.env.priaid_healthservice_url;
		const symptoms = req.body.symptoms;
		const gender = req.body.gender;
		const year = req.body.year;

		fetch(
			`${apiUrl}/diagnosis/specialisations?symptoms=[${symptoms}]&language=en-gb&format=json&token=${token}&gender=${gender}&year_of_birth=${year}`,
			{
				method: 'GET',
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				res.status(200).json(data);
			});
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
