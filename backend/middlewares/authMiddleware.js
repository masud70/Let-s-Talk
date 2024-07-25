const jwt = require("jsonwebtoken");
const db = require("../models");
const { checkCommonElements } = require("../helper");

module.exports = {
	decodeToken: async ({ authorization }) => {
		if (!authorization) {
			throw new Error("Authorization token error!");
		}
		const token = authorization.split(" ")[1];
		const { id, username } = jwt.verify(token, process.env.JWT_SECRET);

		const user = await db.User.findByPk(id);

		return user;
	},

	checkLogin: async (req, res, next) => {
		try {
			const authorization = req.headers.authorization;
			const token = authorization.split(" ")[1];
			const data = jwt.verify(token, process.env.JWT_SECRET);
			const user = await db.User.findByPk(data.id);

            if (user) {
				req.user = user;
				next();
			} else {
				throw new Error("Invalid access token.");
			}
		} catch (error) {
			next(error.message);
		}
	},

	systemAdminAccessCheck: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			const isSysAdmin = user.roles.find(
				(item) => item === "system_admin"
			);

			if (user.loginStatus === true && isSysAdmin) {
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},

	stsManagerAccessCheck: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			const isSysAdmin = user.roles.find(
				(item) => item === "sts_manager"
			);

			if (user.loginStatus === true && isSysAdmin) {
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},

	landfillManagerAccessCheck: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			const isSysAdmin = user.roles.find(
				(item) => item === "landfill_manager"
			);

			if (user.loginStatus === true && isSysAdmin) {
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},

	managerAccessCheck: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			const isManager = checkCommonElements(user.roles, [
				"system_admin",
				"sts_manager",
				"landfill_manager",
			]);

			if (user.loginStatus === true && isManager) {
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},

	contractorManagerAccessCheck: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			const isManager = checkCommonElements(user.roles, [
				"contractor_manager",
			]);

			if (user.loginStatus === true && isManager) {
				const user2 = await db.User.findOne({
					where: { id: user.id },
					include: db.Contractor,
				});
				req.contractorId = user2.Contractors[0].id;
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},
};
