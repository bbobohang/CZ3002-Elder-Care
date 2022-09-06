const mongoose = require('mongoose');

const TeleDoctorSchema = new mongoose.Schema({
	patient_id: {
		type: String,
		required: true,
	},
	patient_name: {
		type: String,
	},
	datetime: {
		type: String,
	},
	doctorType: {
		type: String,
	},
});

module.exports = mongoose.model('teledoctor', TeleDoctorSchema);
