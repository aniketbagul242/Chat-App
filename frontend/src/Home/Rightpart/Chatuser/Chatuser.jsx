import React, { useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";
import { SocketContext } from "../../../context/SocketContext";

const Chatuser = () => {
  const { selectedConversation, show, SetShow } = useContext(StoreContext);
  const { OnlineUsers, typingUser } = useContext(SocketContext);

  if (!selectedConversation) return null; // avoid crash if not selected

  const isOnline = OnlineUsers.includes(selectedConversation._id);
  const isTyping = typingUser === selectedConversation._id;

  // combine typing and online status
  let status = "";
  if (isTyping) status += "typing...";
  if (isTyping && isOnline) status += " • ";
  if (isOnline) status += "Online";
  if (!isTyping && !isOnline) status = "Offline";

  return (
    <div className="flex items-center bg-gray-800 h-[8vh] px-3 relative">
      {/* Menu button on the left */}
      <div className="w-9 flex items-center justify-center">
        {!show && (
          <button onClick={() => SetShow(true)}>
            <img className="w-7 sm:w-9" src="menu-icon.png" alt="menu" />
          </button>
        )}
      </div>

      {/* Profile info centered */}
      <div className="flex items-center justify-center mx-auto space-x-3">
        <img
          className="w-10 sm:w-12 bg-white rounded-full"
          src="profile.png"
          alt="profile"
        />
        <div className="text-center">
          <h1 className="text-base sm:text-lg font-medium">
            {selectedConversation.fullname}
          </h1>
          <span className="text-xs sm:text-sm text-gray-300">{status}</span>
        </div>
      </div>
    </div>
  );
};

export default Chatuser;
