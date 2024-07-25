"use client";
import MessageCard from "@/components/MessageCard";
import UpdateIcon from "@/icon/UpdateIcon";
import { Button, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
	const [usernames, setUsernames] = useState("");
	const [message, setMessage] = useState("");
	const [groupName, setGroupName] = useState("");
	const [chats, setChats] = useState([]);
	const router = useRouter();
	const params = useParams();
	const auth = useSelector((st) => st.auth);

	const addMember = async () => {
		if (usernames == "") return;
		const users = usernames.replace(" ", "").split(",");
		try {
			const res = await axios({
				url: `${process.env.backendUrl}/chat/addMembers`,
				method: "POST",
				headers: {
					Authorization: "Bearer " + auth.token,
				},
				data: { groupId: params.id, usernames: users },
			});
			toast.info(res.data.message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const fetchMessages = async () => {
		try {
			const res = await axios({
				url: `${process.env.backendUrl}/chat/getGroupMessages`,
				method: "POST",
				headers: {
					Authorization: "Bearer " + auth.token,
				},
				data: {
					groupId: params.id,
				},
			});
			if (!res.data.access) {
				router.replace("/home/group");
			}
			setChats(res.data.messages);
			setGroupName(res.data.groupName);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const sendMessage = async () => {
		try {
			if (message == "") return;
			const res = await axios({
				url: `${process.env.backendUrl}/chat/sendGropuMessage`,
				method: "POST",
				headers: {
					Authorization: "Bearer " + auth.token,
				},
				data: {
					groupId: params.id,
					messageBody: message,
				},
			});
			setMessage("");
			fetchMessages();
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchMessages();
	}, []);

	return (
		<>
			<div className="pt-2 w-full text-center text-white font-bold text-xl">
				{groupName}
			</div>
			<div className="w-[95%] lg:w-1/2 border my-2 rounded-xl p-2">
				<div className="w-full p-2 my-2">
					<div className="flex justify-between gap-2">
						<Input
							onChange={(e) => setMessage(e.target.value)}
							value={message}
							placeholder="Write your message here..."
							onKeyDown={(key) => {
								if (key.keyCode == 13) {
									sendMessage();
								}
							}}
						/>
						<Button onClick={sendMessage}>Send</Button>
					</div>
					<Divider className="mt-4 bg-white" />
				</div>
				<div className="space-y-2 max-h-[500px] overflow-auto">
					{chats?.map((item, idx) => (
						<MessageCard
							key={idx}
							self={item.userId == auth.user.id}
							time={item.time}
							username={item.username}
							body={item.messageBody}
						/>
					))}
				</div>
				<div className="w-full p-2 my-2">
					<Divider className="mt-4 bg-white" />
					<div className="text-white font-bold, text-xl p-2">
						Add Members
					</div>
					<div className="flex justify-between gap-2">
						<Input
							onChange={(e) => setUsernames(e.target.value)}
							value={usernames}
							placeholder="Username1, Username2, ..."
						/>
						<Button onClick={addMember} className="font-bold px-6">
							Add Members
						</Button>
					</div>
				</div>
			</div>

			<div
				onClick={fetchMessages}
				className="absolute rounded-full p-2 top-16 right-4 bg-green-100"
			>
				<UpdateIcon />
			</div>
		</>
	);
};

export default Page;
