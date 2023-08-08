import { RequestHandler, Request, Response } from "express";
import UserModel from "../models/userModel";
import { IUserModel } from "../utils/types";
import { secretOrKey } from "../config/secret";
import { readPdfContent } from "../services/readPdfService";
import { callGPT } from "../services/gptService";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load Input Validation
const validateLoginInput = require("../validators/login");
const validateRegisterInput = require("../validators/register");

export const signIn: RequestHandler = (req: Request, res: Response) => {
	const { errors, isValid } = validateLoginInput(req.body);

	//initial check validation of the inputs
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	//Find user by email
	UserModel.findOne({ email }).then((user) => {
		//check for user
		if (!user) {
			errors.msg = "User not found.";
			return res.status(404).json(errors);
		}
		//check password
		bcrypt
			.compare(password, user.password)
			//returns a boolean
			.then((isMatch: any) => {
				if (isMatch) {
					//user matched
					//create JWT payload
					const payload = {
						id: user.id,
						name: user.name,
					};

					//sign token
					//  payload - what we want included
					//  secret - key
					//	expiration
					jwt.sign(
						payload,
						secretOrKey,
						{ expiresIn: 3600 },
						(err: any, token: any) => {
							res.json({
								success: true,
								token: "Bearer " + token,
							});
						}
					);
				} else {
					errors.msg = "Incorrect password entered.";
					return res.status(400).json(errors);
				}
			});
	});
};

export const signUp: RequestHandler = (req: Request, res: Response) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	//initial check validation of the inputs
	if (!isValid) {
		return res.status(400).json(errors);
	}

	UserModel.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			errors.email = "Email already exists.";
			// don't proceed because the user exists
			return res.status(400).json(errors);
		} else {
			// if user doesn't exist, create new User
			const newUser: IUserModel = new UserModel({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});

			bcrypt.genSalt(10, (err: Error, salt: unknown) => {
				bcrypt.hash(
					newUser.password,
					salt,
					(err: Error | null, hash: string) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then((user) => res.json(user))
							.catch((err) => console.log(err));
					}
				);
			});
		}
	});
};

export const uploadPDF: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const pdfFile = req.file;
	const { userContent } = req.body;
	const result: any = await readPdfContent(pdfFile);
	if (result.pageNumber > 5) {
		return res.status(400).json({ msg: "You can upload max 5 pages." });
	}
	// callGPT(result.content, userContent)
	//     .then(response => {
	//         if(response) res.status(200).json(response)
	//     })
	//     .catch(err => console.log(err))
};
