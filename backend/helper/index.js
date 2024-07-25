const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_SECRET,
	},
});

module.exports = {
	getRandomChars: (length) => {
		const string = "QWERTYUIOPLKJHGFDSAZXCVBNM1209348756";
		let result = "";
		const stringLength = string.length;
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * stringLength);
			result += string.charAt(randomIndex);
		}
		return result;
	},

	sendMail: async ({ email, body }) => {
		try {
			const info = await transporter.sendMail({
				from: "cppvitamin@gmail.com",
				to: email,
				subject: "EcoSync official",
				text: body.text,
				html: body.html,
			});

			return {
				success: true,
				message: "Email sent successfully!",
				info: info,
			};
		} catch (error) {
			return {
				success: false,
				message: "Email could not send!",
				error: error.message,
			};
		}
	},

	generateToken: ({ username, id }) => {
		const token = jwt.sign(
			{
				id: id,
				username: username,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);
		return token;
	},
};
