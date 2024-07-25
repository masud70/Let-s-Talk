"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
	const auth = useSelector((st) => st.auth);
	const router = useRouter();

	useEffect(() => {
		if (auth.status) router.push("/home");
	}, [auth]);

	return (
		<>
			<div className="items-center text-white w-screen h-screen justify-center flex flex-col">
				<div className="text-3xl w-full text-center">
					Welcome to{" "}
					<p className="text-red-500 text-5xl pt-2 font-extrabold">
						Let's Chat
					</p>
				</div>
				<div className="text-xl flex border-4 rounded-xl mt-8 p-4 space-x-4 divide-x-2">
					<Link href="/auth/login">Login</Link>
					<Link href="/auth/signup" className="pl-4">
						Sign Up
					</Link>
				</div>
			</div>
		</>
	);
}
