const db = require("../models");

module.exports = {
	sendGlobalMessage: async ({ messageBody, userId }) => {
		try {
			const res = await db.Message.create({
				messageBody,
				UserId: userId,
			});

			return {
				status: true,
				message: "Message sent successfully!",
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},
	getGlobalMessage: async () => {
		try {
			const res = await db.Message.findAll({
				where: {
					GroupId: null,
				},
				include: db.User,
			});

			let ret = [];
			res.map((item) => {
				const time = item.createdAt.toString().split(" ");
				ret.push({
					id: item.id,
					body: item.messageBody,
					userId: item.UserId,
					user: item.User.username,
					time: `${time[2]}/${time[1]}/${time[3][2]}${time[3][3]} ${time[4]}`,
				});
			});

			return {
				status: true,
				messages: ret.reverse(),
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},

	createGroup: async ({ groupName, userId }) => {
		try {
			const res = await db.Group.create({ groupName });
			// usernames.forEach(async (username) => {
			const user = await db.User.findByPk(userId);
			res.addUser(user);
			// });
			return {
				status: true,
				message: "Group created successfully!",
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},

	addMembers: async ({ groupId, usernames }) => {
		try {
			let added = [];
			let failed = [];
			const group = await db.Group.findByPk(groupId);
			if (!group) {
				throw new Error("Group not found.");
			}
			for (let i = 0; i < usernames.length; i++) {
				const username = usernames[i];
				try {
					const user = await db.User.findOne({
						where: { username: username },
					});
					if (user) {
						group.addUser(user);
						added.push(username);
					} else {
						throw new Error(`User not found!`);
					}
				} catch (error) {
					console.log(username);
					failed.push(username);
				}
			}
			return {
				status: true,
				message:
					failed.length == 0
						? `${added.length} member(s) added successfully!`
						: `Success: ${added.length}  Failed: ${failed.length}`,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getGroups: async () => {
		try {
			const res = await db.Group.findAll({ include: db.User });
			let groups = [];
			for (let i = 0; i < res.length; i++) {
				const group = {
					id: res[i].id,
					groupName: res[i].groupName,
					members: res[i].Users.length,
					createdAt: res[i].createdAt.toString(),
				};
				groups.push(group);
			}
			return {
				status: true,
				groups: groups,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getGroupMessages: async ({ groupId, userId }) => {
		try {
			const group = await db.Group.findOne({
				where: { id: groupId },
				include: {
					model: db.User,
					where: {
						id: userId,
					},
				},
			});
			if (!group) {
				return {
					status: true,
					message: "Invalid group access.",
					access: false,
				};
			}
			const messages = await db.Message.findAll({
				where: {
					GroupId: groupId,
				},
				include: db.User,
			});

			let ret = [];
			for (let i = 0; i < messages.length; i++) {
				const time = messages[i].createdAt.toString().split(" ");
				ret.push({
					id: messages[i].id,
					groupId: messages[i].GroupId,
					username: messages[i].User.username,
					userId: messages[i].User.id,
					messageBody: messages[i].messageBody,
					time: `${time[2]}/${time[1]}/${time[3][2]}${time[3][3]} ${time[4]}`,
				});
			}

			return {
				status: true,
				messages: ret.reverse(),
				groupName: group.groupName,
				access: true,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},

	sendGroupMessage: async ({ groupId, userId, messageBody }) => {
		try {
			const group = await db.Group.findOne({
				where: { id: groupId },
				include: {
					model: db.User,
					where: {
						id: userId,
					},
				},
			});
			if (!group) {
				throw new Error("Invalid access!");
			}
			const user = await db.User.findByPk(userId);
			const message = await db.Message.create({ messageBody });
			user.addMessage(message);
			group.addMessage(message);

			return {
				status: true,
				message: "Message sent successfully!",
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},
};
