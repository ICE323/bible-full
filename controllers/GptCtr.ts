import { RequestHandler, Request, Response } from "express";
import { callGPT } from "../services/gptService";
import rootDir from "../rootDir";
const fs = require("fs");

export const generateAnswerbyGPT: RequestHandler = (
	req: Request,
	res: Response
) => {
	const { userPrompt } = req.body;
	let baseText = "";
	new Promise((resolve: any, reject) => {
		fs.readFile(
			`${rootDir}/app/uploads/jesus23.txt`,
			"utf8",
			(err: Error, data: any) => {
				if (err) {
					reject(err);
					return;
				}
				baseText = data;
				resolve();
			}
		);
	})
		.then((r) => {
			// callGPT(baseText, userPrompt);
			// .then((response) => {
			// 	if (response) res.status(200).json(response);
			// })
			// .catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};
