const mongoose = require('mongoose');

const HomeDoctorSchema = new mongoose.Schema({
	patient_id: {
		type: String,
		required: true,
	},
	time: {
		type: String,
	},
	date: {
		type: String,
	},
    address: {
		type: String,
	},
	doctorType: {
		type: String,
	},
	doctorID: {
		type: String,
	},
});

module.exports = mongoose.model('homedoctor', HomeDoctorSchema);