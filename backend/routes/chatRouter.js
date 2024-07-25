const express = require("express");
const { checkLogin } = require("../middlewares/authMiddleware");
const {
	sendGlobalMessage,
	getGlobalMessage,
	createGroup,
	getGroups,
	addMembers,
	sendGroupMessage,
	getGroupMessages,
} = require("../controllers/chatController");
const router = express.Router();

router.post("/sendMessage", checkLogin, async (req, res, next) => {
	try {
		const { id } = req.user;
		const { messageBody } = req.body;
		const result = await sendGlobalMessage({
			userId: id,
			messageBody: messageBody,
		});
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.get("/getMessage", checkLogin, async (req, res, next) => {
	try {
		const result = await getGlobalMessage();
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/createGroup", checkLogin, async (req, res, next) => {
	try {
		const { groupName } = req.body;
		const userId = req.user.id;
		const result = await createGroup({ groupName, userId });
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/addMembers", checkLogin, async (req, res, next) => {
	try {
		const { groupId, usernames } = req.body;
		const result = await addMembers({ groupId, usernames });
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.get("/getgroups", checkLogin, async (req, res, next) => {
	try {
		res.json(await getGroups());
	} catch (error) {
		next(error.message);
	}
});

router.post("/sendGropuMessage", checkLogin, async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { messageBody, groupId } = req.body;
		const result = await sendGroupMessage({ groupId, userId, messageBody });
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/getGroupMessages", checkLogin, async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { groupId } = req.body;
		const result = await getGroupMessages({ groupId, userId });
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

module.exports = router;
