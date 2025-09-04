import React from "react";

const Sendmsg = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const itsMe = authUser._id === message.senderId;

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`px-4 py-1 flex ${itsMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl shadow-md max-w-xs sm:max-w-md break-words flex flex-col ${
          itsMe
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {/* message text */}
        <p className="text-sm sm:text-base leading-snug">{message.message}</p>

        {/* timestamp */}
        <span
          className={`text-[10px] sm:text-xs mt-1 self-end ${
            itsMe ? "text-gray-200" : "text-gray-600"
          }`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default Sendmsg;
