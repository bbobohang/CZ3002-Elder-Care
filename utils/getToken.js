const config = require('config');
const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');

const getToken = async (req, res, next) => {
	try {
		const username = config.get('medicApiUsername');
		const password = config.get('medicApiPassword');
		const authUrl = config.get('priaid_authservice_url');

		var computedHash = CryptoJS.HmacMD5(authUrl, password);
		var computedHashString = computedHash.toString(CryptoJS.enc.Base64);

		// axios
		// 	.post(authUrl, {
		// 		headers: {
		// 			Authorization: authorization,
		// 		},
		// 	})
		// 	.then((response) => {
		// 		console.log(response);
		// 	})
		// 	.catch(next);
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
