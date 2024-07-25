import React from "react";

const MessageItem = ({ user, body, time, self }) => {
	return (
		<div>
			{self ? (
				<div className="flex flex-col items-end">
					<div className="bg-gray-700 z-10 rounded-xl p-2 text-right">
						{user}
						<p className="text-[10px] text-gray-500">{time}</p>
					</div>
					<div className="mr-10 mt-[-5px] bg-gray-900 p-2 rounded-xl">
						{body}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-start">
					<div className="bg-gray-800 w-auto z-50 rounded-xl p-2">
						{user}
						<p className="text-[10px] text-gray-500">{time}</p>
					</div>
					<div className="ml-10 mt-[-5px] bg-gray-900 p-2 rounded-xl">
						{body}
					</div>
				</div>
			)}
		</div>
	);
};

export default MessageItem;
