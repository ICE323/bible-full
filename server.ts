// @ts-nocheck
import express from "express";
import { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import fs from "fs";
import socketIO from "socket.io";
import { callGPT } from "./services/gptService";
import rootDir from "./rootDir";

dotenv.config();
const app: Application = express();
const server = http.createServer(app);
const io = socketIO(server);

const corsOption = {
	origin: `*`,
	methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	credentials: true,
	exposedHeaders: ["x-auth-token"],
	url: ["https://localhost:5000"],
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use("/", (req, res) => res.json("working server!"));
app.use("/api/gpt", (req, res) => {
	const { history } = req.body;
	let baseText = "";
	fs.readFile(`${rootDir}/uploads/jesus23.txt`, "utf8", async (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		baseText = data;
		let gpt_result = await callGPT(baseText, history);
		return res.json(gpt_result);
	});
});

// io.on("connection", (socket) => {
// 	socket.on("userPrompt", (userPrompt) => {
// 		let baseText = "";

// 		fs.readFile(`${rootDir}/app/uploads/jesus23.txt`, "utf8", (err, data) => {
// 			if (err) {
// 				console.log(err);
// 				return;
// 			}
// 			baseText = data;
// 			callGPT(baseText, userPrompt, socket);
// 		});
// 	});
// });

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
