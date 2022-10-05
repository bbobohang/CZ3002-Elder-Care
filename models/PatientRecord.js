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
		default: 'NTU SCSE',
	},
	block_no: {
		type: String,
		default: 'Software Lab 3',
	},
	postal_code: {
		type: String,
		default: '123456',
	},
	medical_conditions: {
		type: String,
	},
});

module.exports = mongoose.model('records', RecordSchema);
