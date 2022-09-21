const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');

const getToken = async (req, res, next) => {
	try {
		const username = process.env.medicApiUsername;
		const password = process.env.medicApiPassword;
		const authUrl = process.env.priaid_authservice_url;

		var computedHash = CryptoJS.HmacMD5(authUrl, password);
		var computedHashString = computedHash.toString(CryptoJS.enc.Base64);

		fetch(authUrl, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${username}:${computedHashString}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.Token);
				req.body.medicToken = data.Token;
				next();
			});
	} catch (error) {
		console.log(error);
	}
};
module.exports = getToken;
