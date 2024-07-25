"use client";
import { getLogin, logout } from "@/redux/state/authSlice";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { hasCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const auth = useSelector((st) => st.auth);
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (hasCookie(process.env.tokenKey)) {
			router.push("/home");
		}
	}, [auth]);

	const login = async () => {
		try {
			const res = await axios.post(
				`${process.env.backendUrl}/auth/login`,
				{
					username: user,
					password: pass,
				}
			);
			if (!res.data.status) {
				throw new Error(res.data.message);
			} else {
				dispatch(getLogin(res.data));
				// toast.success(res.data.message);
				router.push("/home");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="w-full flex flex-col justify-center items-center h-screen">
			<div className="flex flex-col justify-center border-2 p-4 rounded-2xl lg:w-1/3 w-2/3 items-center divide-y-2 divide-green-700">
				<div className="text-2xl text-white pb-4 font-bold w-full text-center">
					Login
				</div>
				<div className="pt-4 w-full flex flex-col items-center">
					<Input
						onChange={(e) => setUser(e.target.value)}
						label="Username"
					/>
					<Input
						onChange={(e) => setPass(e.target.value)}
						className="pt-4"
						label="Password"
					/>
					<Button
						onClick={login}
						className="mt-4 font-bold bg-green-700"
						color="secondary"
					>
						Submit
					</Button>
					<div className="mt-2 text-white">
						Don't have an account?{" "}
						<Link className="text-green-400" href="/auth/signup">
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;

// ("use client");

// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import React, { useEffect, useRef, useState } from "react";
// import "./login.css";
// import Link from "next/link";
// import ATextField from "../components/ATextField";
// import { Button } from "@nextui-org/react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { login } from "@/redux/state/authSlice";
// import { hasCookie } from "cookies-next";
// import ReCAPTCHA from "react-google-recaptcha";

// function Login() {
// 	const [emailOrMobile, setEmailOrMobile] = useState("");
// 	const [capVal, setCapVal] = useState(null);
// 	const [password, setpassword] = useState("");
// 	const [errorMessaage, seterrorMessaage] = useState("");
// 	const [isLoading, setIsLoading] = useState(false);
// 	const dispatch = useDispatch();
// 	const router = useRouter();
// 	const auth = useSelector((st) => st.auth);
// 	const capRef = useRef(null);

// 	useEffect(() => {
// 		if (hasCookie(process.env.tokenKey)) {
// 			router.push("/dashboard");
// 		}
// 	}, [auth]);

// 	const submitLogin = async () => {
// 		try {
// 			setIsLoading(true);
// 			const result = await axios.post(
// 				`${process.env.backendUrl}/auth/login`,
// 				{
// 					emailOrMobileNumber: emailOrMobile,
// 					password: password,
// 					captcha: capVal,
// 				}
// 			);

// 			console.log(result.data);

// 			if (!result.data.success) {
// 				throw new Error(result.data.message);
// 			}

// 			if (result.data.success) {
// 				setEmailOrMobile("");
// 				setpassword("");
// 				dispatch(
// 					login({ token: result.data.token, user: result.data.user })
// 				);
// 				router.push("/dashboard");
// 			}
// 		} catch (error) {
// 			seterrorMessaage(error.message);
// 			toast.error(error.message);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<Box className="inputDiv">
// 			<div className="text-3xl w-full text-left p-[20px] text-[wheat]">
// 				Log In
// 			</div>
// 			<Box className="flex flex-col gap-3">
// 				<ATextField
// 					type={"text"}
// 					label={"Email / Mobile Number"}
// 					setFunction={setEmailOrMobile}
// 					value={emailOrMobile}
// 				/>

// 				<ATextField
// 					type={"password"}
// 					label={"Password"}
// 					setFunction={setpassword}
// 					value={password}
// 				/>
// 			</Box>
// 			<Box className="errorMessageDiv">
// 				{errorMessaage.length > 0 && (
// 					<Typography className="errorMessageText">
// 						** {errorMessaage} **
// 					</Typography>
// 				)}
// 			</Box>
// 			<Box className="forgotPasswordDiv">
// 				<Link
// 					href={"/auth/reset-password/initiate"}
// 					className="forgotPasswordLink"
// 				>
// 					Forgot Password?
// 				</Link>
// 			</Box>
// 			<ReCAPTCHA
// 				className="mt-4"
// 				ref={capRef}
// 				sitekey={process.env.recaptchaKey}
// 				onChange={setCapVal}
// 			/>
// 			<Box className="SubmitButtonDiv pt-2">
// 				<Button
// 					isLoading={isLoading}
// 					disabled={
// 						!capVal && (!emailOrMobile.length || !password.length)
// 					}
// 					onClick={submitLogin}
// 					className="SubmitButton"
// 				>
// 					Submit
// 				</Button>
// 			</Box>
// 		</Box>
// 	);
// }
