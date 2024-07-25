"use client";
import MessageCard from "@/components/MessageCard";
import MessageItem from "@/components/MessageItem";
import UpdateIcon from "@/icon/UpdateIcon";
import { Button, Textarea } from "@nextui-org/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
	const [messageBody, setMessageBody] = useState("");
	const [messages, setMessages] = useState([]);
	const [showMessage, setShowMessage] = useState([]);
	const [index, setIndex] = useState(0);
	const [messagePerPage, setMessagePerPage] = useState(10);
	const auth = useSelector((st) => st.auth);

	useEffect(() => {
		fetchMessage();
	}, []);

	useEffect(() => {
		let array = [];
		for (
			let i = index * messagePerPage;
			i < messages.length && i < index * messagePerPage + messagePerPage;
			i++
		) {
			array.push(messages[i]);
		}
		setShowMessage(array);
	}, [index, messages]);

	const sendMessage = async () => {
		try {
			if (messageBody == "") return;
			const res = await axios({
				url: `${process.env.backendUrl}/chat/sendMessage`,
				method: "POST",
				headers: {
					authorization: "Bearer " + auth.token,
				},
				data: { messageBody },
			});
			fetchMessage();
			setMessageBody("");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const updateIndex = (val) => {
		if (
			val + index < 0 ||
			val + index >= Math.ceil(messages.length / messagePerPage)
		)
			return;
		setIndex((p) => p + val);
	};

	// useEffect(() => {
	// 	setInterval(() => {
	// 		fetchMessage();
	// 	}, 10000);
	// }, []);

	const fetchMessage = async () => {
		try {
			const res = await axios({
				url: `${process.env.backendUrl}/chat/getMessage`,
				method: "GET",
				headers: {
					authorization: "Bearer " + auth.token,
				},
			});

			if (!res.data.status) {
				throw new Error(res.data.message);
			}
			setMessages(res.data.messages);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className="pt-2 w-full text-center text-white font-bold text-xl">
				Open Chat
			</div>
			<div className="lg:mx-20 mx-20 my-4 w-[95%] lg:w-1/2 border rounded-xl p-2">
				<div>
					<Textarea
						placeholder="Write your message here..."
						onChange={(e) => setMessageBody(e.target.value)}
						value={messageBody}
						onKeyDown={(e) =>
							e.keyCode == 13 ? sendMessage() : null
						}
					/>
					<div className="flex justify-end p-2 font-bold border-b-2">
						<input
							type="file"
							multiple
							accept=".pdf,.png,.jpg,.jpeg.gif"
							hidden
						/>
						<Button
							onClick={sendMessage}
							className="font-bold bg-green-700 text-white"
						>
							Send
						</Button>
					</div>
				</div>
				<div className="text-white py-2 space-y-2">
					{showMessage.map((item, idx) => (
						<MessageCard
							self={item.userId == auth.user.id}
							time={item.time}
							username={item.user}
							body={item.body}
						/>
					))}
				</div>
			</div>
			<div className="flex justify-center gap-10 items-center py-4 font-bold text-md w-full text-white">
				<Button
					onClick={() => {
						updateIndex(-1);
					}}
				>
					Newer
				</Button>
				<div>
					{index +
						1 +
						"/" +
						Math.ceil(messages.length / messagePerPage)}
				</div>
				<Button
					onClick={() => {
						updateIndex(1);
					}}
				>
					Previous
				</Button>
			</div>
			<div
				onClick={fetchMessage}
				className="absolute rounded-full p-2 top-16 right-4 bg-green-100"
			>
				<UpdateIcon />
			</div>
		</>
	);
};

export default page;
