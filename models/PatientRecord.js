const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
	patient_id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	title: {
		type: String,
	},
	country: {
		type: String,
	},
	address: {
		type: String,
	},
	block_no: {
		type: String,
	},
	psotal_code: {
		type: String,
	},
	medical_conditions: {
		type: String,
	},
});

module.exports = mongoose.model('records', RecordSchema);
