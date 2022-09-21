const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGOURI);

		console.log('Mongo DB connected...');
	} catch (err) {
		console.error(err.message);

		process.exit(1);
	}
};

module.exports = connectDB;
