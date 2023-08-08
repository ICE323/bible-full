import { OPENAI_API_KEY } from "../config/secret";
import { Configuration, OpenAIApi } from "openai";

const express = require("express");
const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// const {
// 	fetchStreamedChat,
// 	fetchStreamedChatContent,
// } = require("streamed-chatgpt-api");

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const callGPT = (baseText: any, userContent: any) => {
	let tempMSG: any = [
		{
			role: "system",
			content: `${baseText}
			<------------------------------>
			Hopefully answer with Markdown
				`,
		},
		...userContent,
	];
	// fetchStreamedChatContent(
	// 	{
	// 		apiKey: OPENAI_API_KEY,
	// 		messageInput: tempMSG,
	// 		model: "gpt-4",
	// 		maxTokens: 1000,
	// 		temperature: 0,
	// 	},
	// 	(content: string) => {
	// 		// onResponse
	// 		socket.emit("GPTResponse", content);
	// 	},
	// 	() => {
	// 		// onFinish
	// 		console.log("Chat completed");
	// 	},
	// 	(error: Error) => {
	// 		// onError
	// 		console.error("Error:", error);
	// 	}
	// );
	// console.log(tempMSG);
	return new Promise((resolve, reject) => {
		openai
			.createChatCompletion({
				model: "gpt-4",
				messages: tempMSG,
				max_tokens: 1000,
				temperature: 0,
			})
			.then((res: any) => {
				if (res) {
					// console.log(res.data.choices[0].message.content);
					const response = res.data.choices[0].message.content;
					resolve(response);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
};
