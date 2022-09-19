const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
	ID: {
		type: String,
	},
	Name: {
		type: String,
	},
});

module.exports = mongoose.model('symptoms', SymptomSchema);
