const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", async (req, res, next) => {
	try {
		const { fullname, username, password } = req.body;
		const result = await signup({ fullname, username, password });
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const result = await login({ username, password });
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});


module.exports = router