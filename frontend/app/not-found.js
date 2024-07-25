"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
	return (
		<div className="w-full bg-slate-800 h-screen flex justify-center items-center">
			<div className="text-white flex flex-col text-center space-y-4">
				<div className="text-4xl">404 - Page not found</div>
				<Link href="/">
					<Button>Go Home</Button>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
