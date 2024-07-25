"use client";
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const layout = ({ children }) => {
	const auth = useSelector((st) => st.auth);
	const router = useRouter();

	useEffect(() => {
		if (!auth.status) {
			router.push("/");
		}
	}, [auth]);

	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<NavBar />
			{children}
		</div>
	);
};

export default layout;
