"use client";
import PlanIcon from "@/icon/PlanIcon";
import { Button, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
	const [groupName, setGroupName] = useState("");
	const [groups, setGroups] = useState([]);
	const auth = useSelector((st) => st.auth);
	const router = useRouter();

	const createGroup = async () => {
		try {
			const res = await axios({
				url: `${process.env.backendUrl}/chat/createGroup`,
				method: "POST",
				headers: {
					Authorization: "Bearer " + auth.token,
				},
				data: { groupName },
			});
			if (!res.data.status) {
				throw new Error(res.data.message);
			}
			toast.success(res.data.message);
			router.push(`group/${res.data.groupId}`);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const getGroups = async () => {
		try {
			const res = await axios({
				url: `${process.env.backendUrl}/chat/getGroups`,
				method: "GET",
				headers: {
					authorization: "Bearer " + auth.token,
				},
			});
			console.log(res.data);
			setGroups(res.data.groups);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getGroups();
	}, []);

	return (
		<div className="border rounded-xl w-5/6 lg:w-1/2 p-2 my-2">
			<div className="flex justify-between gap-2">
				<Input
					placeholder="Group name"
					onChange={(e) => setGroupName(e.target.value)}
					value={groupName}
				/>
				<Button onClick={createGroup}>Create</Button>
			</div>
			<Divider className="my-2 bg-white" />
			<div className="space-y-2 flex flex-col">
				{groups.map((item, idx) => (
					<Link href={`/home/group/${item.id}`} key={idx}>
						<div className="flex justify-between p-2 bg-green-200 font-bold rounded-xl">
							<div className="flex items-center">
								<PlanIcon /> {item.groupName}
							</div>
							<div className="">Members: {item.members}</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default page;
