"use client";

import { useEffect, useRef, useState } from "react";
import "./resetPassword.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ATextField from "../components/ATextField";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

export default function Page() {
	const [password, setpassword] = useState("");
	const [capVal, setCapVal] = useState(null);
	const [confirmPassword, setconfirmPassword] = useState("");
	const [errorMessaage, setErrorMessaage] = useState("");
	const [loading, setLoading] = useState(false);
	const [time, setTime] = useState(300);
	const auth = useSelector((st) => st.auth);
	const router = useRouter();
	const capRef = useRef(null);

	useEffect(() => {
		if (!hasCookie(process.env.tokenKey)) {
			router.push("/");
		}
	}, [auth]);

	useEffect(() => {
		const timer = setTimeout(() => {
			decrement();
			if (time === 0) router.push("/dashboard");
		}, 1000);

		return () => clearTimeout(timer);
	}, [time]);

	const decrement = () => {
		setTime((prevTime) => prevTime - 1);
	};

	const submitResetPassword = async () => {
		try {
			setLoading(true);
			setErrorMessaage("");

			if (password !== confirmPassword) {
				throw new Error("Passwrds doesn't match");
			}

			const result = await axios({
				method: "POST",
				url: process.env.backendUrl + "/auth/change-password",
				headers: {
					authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: {
					newPassword: password,
				},
			});

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			toast.success(result.data.message);
			router.push("/dashboard");
			setpassword("");
			setconfirmPassword("");
		} catch (error) {
			toast.error(error.message);
			setErrorMessaage(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box className="inputDiv relative">
			<div className="text-3xl w-full text-center pb-[15px] text-[wheat]">
				Change Password
			</div>
			<div className="absolute top-[-20px] right-[-20px] bg-slate-100 w-[50px] h-[50px] flex items-center justify-center rounded-full border-4 border-red-200">
				{time}s
			</div>
			<div className="flex flex-col space-y-2">
				<ATextField
					type={"password"}
					label={"Old Password"}
					setFunction={setpassword}
					value={password}
				/>
				<ATextField
					type={"password"}
					label={"New Password"}
					setFunction={setconfirmPassword}
					value={confirmPassword}
				/>

				{errorMessaage.length > 0 && (
					<Typography className="errorMessageText">
						** {errorMessaage} **
					</Typography>
				)}

				<ReCAPTCHA
					ref={capRef}
					sitekey={process.env.recaptchaKey}
					onChange={setCapVal}
				/>

				<Button
					isLoading={loading}
					disabled={!capVal}
					size="lg"
					className="w-full"
					onClick={submitResetPassword}
				>
					Reset Password
				</Button>
			</div>
		</Box>
	);
}
