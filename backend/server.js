require("dotenv").config();
const express = require("express");
const tox = require("@tensorflow-models/toxicity");
const cors = require("cors");
const db = require("./models");
const { checkValidity } = require("./middlewares");
const app = express();
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const chatRouter = require("./routes/chatRouter");

const PORT = process.env.NODE_DOCKER_PORT_BACKEND || 8000;
var corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", checkValidity, async (req, res) => {
	try {
		res.status(200).json({
			message: "Welcome to Let's Chat!",
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
});

// Routes
app.use("/auth", authRouter);
app.use("/chat", chatRouter);

app.use((err, req, res, next) => {
	res.json({ success: false, message: err });
});

// listen for requests
app.listen(PORT, () => {
	db.sequelize
		.sync({ alter: !true })
		.then(async () => {
			console.log(
				`\n===========================\nApp listening to port ${PORT}\n===========================\n`
			);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
