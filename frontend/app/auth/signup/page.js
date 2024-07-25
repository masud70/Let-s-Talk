"use client";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [name, setName] = useState("");
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [cPassword, setCPassword] = useState("");
	const router = useRouter();

	const signup = async () => {
		try {
			if (password != cPassword) {
				throw new Error(
					"Password and confirm password must be the same."
				);
			}
			const res = await axios.post(
				`${process.env.backendUrl}/auth/signup`,
				{
					fullname: name,
					username: user,
					password: password,
				}
			);
			if (!res.data.status) {
				throw new Error(res.data.message);
			} else {
				toast.success(res.data.message);
				router.push("/auth/login");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="w-full flex flex-col justify-center items-center h-screen">
			<div className="flex flex-col justify-center border-2 p-4 rounded-2xl lg:w-1/3 w-2/3 items-center divide-y-2 divide-green-700">
				<div className="text-2xl text-white pb-4 font-bold w-full text-center">
					Sign Up
				</div>
				<div className="pt-4 w-full flex flex-col items-center">
					<Input
						onChange={(e) => setName(e.target.value)}
						label="Full Name"
					/>
					<Input
						onChange={(e) => setUser(e.target.value)}
						className="pt-4"
						label="Username"
					/>
					<Input
						onChange={(e) => setPassword(e.target.value)}
						className="pt-4"
						label="Password"
					/>
					<Input
						onChange={(e) => setCPassword(e.target.value)}
						className="pt-4"
						label="Confirm Password"
					/>
					<Button
						className="mt-4 text-xl bg-green-700 font-bold"
						color="secondary"
						onClick={signup}
					>
						Submit
					</Button>
					<div className="mt-2 text-white">
						already have an account?{" "}
						<Link className="text-green-400" href="/auth/login">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
