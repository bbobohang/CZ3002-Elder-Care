const mongoose = require('mongoose');

const TeleDoctorSchema = new mongoose.Schema({
	patient_id: {
		type: String,
		required: true,
	},
	dateTime: {
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
