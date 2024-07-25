const axios = require("axios");

module.exports = {
	// It's a dummy middleware function
	checkValidity: async (req, res, next) => {
		try {
			let flag = true;
			if (flag) {
				await new Promise(() =>
					setTimeout(() => {
						next();
					}, 1000)
				);
				next("Error 404");
			} else {
				throw new Error("There was an validation error.");
			}
		} catch (error) {
			next(error);
		}
	},

	// Common middleware to validate captcha
	validateCaptcha: async (req, res, next) => {
		try {
			const { captcha } = req.body;
			if (!captcha) {
				throw new Error("Invalid captcha!");
			}
			const response = await axios.post(
				`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTA_KEY}&response=${captcha}`
			);

			if (!response.data.success) {
				throw new Error("Captcha validation failed!");
			}

			next();
		} catch (error) {
			next(error.message);
		}
	},
};
