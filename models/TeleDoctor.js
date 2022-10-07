const mongoose = require('mongoose');

const TeleDoctorSchema = new mongoose.Schema({
	patient_id: {
		type: String,
		required: true,
	},
	patient_name: {
		type: String,
	},
	time: {
		type: String,
	},
	date: {
		type: String,
	},
	doctorType: {
		type: String,
	},
	doctorID: {
		type: String,
	},
});

module.exports = mongoose.model('teledoctor', TeleDoctorSchema);
