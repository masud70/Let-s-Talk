import React from "react";

const MessageCard = ({ self, body, time, username }) => {
	return (
		<>
			{self ? (
				<div className="space-y-2 flex justify-end px-2 text-black">
					<div className="p-2 bg-green-100 rounded-xl">
						<div className="flex items-end font-bold gap-2 w-full border-b border-gray-400 justify-end">
							<div className="text-[10px] text-gray-600">
								{time}
							</div>
							<div className="flex items-center">{username}</div>
						</div>
						<div className="">{body}</div>
					</div>
				</div>
			) : (
				<div className="space-y-2 flex px-2 text-black">
					<div className="p-2 bg-green-100 rounded-xl">
						<div className="flex items-end font-bold gap-2 border-b border-gray-400">
							<div className="flex items-center">{username}</div>
							<div className="text-[10px] text-gray-600">
								{time}
							</div>
						</div>
						<div className="">{body}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MessageCard;
