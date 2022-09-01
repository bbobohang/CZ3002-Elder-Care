const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
	patient_id: {
		type: String,
		required: true,
	},
	age: {
		type: String,
	},
	heart_rate: {
		type: String,
	},
	blood_pressure: {
		type: String,
	},
});

module.exports = mongoose.model('records', RecordSchema);
