const { generateToken } = require("../helper");
const db = require("../models");

module.exports = {
	signup: async ({ fullname, username, password }) => {
		try {
            if (!fullname) {
				throw new Error("Full name cannot be empty!");
			}
            if (username.length < 4 || username.length > 20) {
				throw new Error("Username must be 5 to 20 characters long.");
			}
			if (password.length < 6 || password.length > 20) {
				throw new Error(
					"Length of the password must be within 6 to 20 characters."
				);
			}

			const user = await db.User.findAll({
				where: { username: username },
			});

			if (user.length) {
				throw new Error("Username already exists!");
			}

			const createUser = await db.User.create({
				fullname,
				username,
				password,
			});

			return {
				status: true,
				message: "User created successfully!",
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},

	login: async ({ username, password }) => {
		try {
			const user = await db.User.findOne({ where: { username } });
			if (!user|| user.password != password) {
				throw new Error("Invalid username or password.");
			}
			const token = generateToken({ username, id: user.id });

			return {
				status: true,
				token: token,
				user: {
					username: user.username,
					fullname: user.fullname,
					id: user.id,
				},
				message: "Login successful!",
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},
};
