"use client";
import Logout from "@/icon/Logout";
import { getLogout } from "@/redux/state/authSlice";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const auth = useSelector((st) => st.auth);

	const logout = () => {
		dispatch(getLogout());
		router.push("/");
	};

	return (
		<div className="w-full h-12 bg-gray-300 flex justify-between px-6 lg:px-20 items-center">
			<div className="font-bold text-xl lg:text-3xl text-red-600">
				Let's Talk!
			</div>
			<div className="flex gap-1 text-md font-bold items-center">
				<Link className="hover:bg-green-100 transition-all duration-300 px-2 py-1 rounded-xl" href="/home/group">Groups</Link>
				<Link className="hover:bg-green-100 transition-all duration-300 px-2 py-1 rounded-xl" href="/home">{auth.user.username}</Link>
				<Button className="hover:bg-green-100 transition-all duration-300 px-2 py-1 rounded-xl font-bold text-md" onClick={logout}>
					<Logout /> Logout
				</Button>
			</div>
		</div>
	);
};

export default NavBar;
