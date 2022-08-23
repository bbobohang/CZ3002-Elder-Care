const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (req, res, next) => {
	try {
		const token = req.cookies.access_token;
		if (!token)
			return res.status(401).json({ errors: [{ msg: 'User not logged in' }] });

		jwt.verify(token, config.get('jwtSecret'), (err, user) => {
			if (err) res.status(403).json({ errors: [{ msg: 'Token in valid' }] });
			req.user = user;
			next();
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = verifyToken;
