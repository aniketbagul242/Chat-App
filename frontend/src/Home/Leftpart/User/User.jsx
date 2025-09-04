import React, { useContext, useEffect } from "react";
import Users from "../RegisterUser/Users";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";


const User = () => {
  const token = localStorage.getItem("token");
  const { alluser, setAlluser, url, unreadCounts, setUnreadCounts } =
    useContext(StoreContext);

  
  useEffect(() => {
    // Get all users from database
    const getAlluser = async () => {
      try {
        const response = await axios.get(`${url}/user/userdata`, {
          headers: { token },
        });
        setAlluser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAlluser();
  }, [token, url, setAlluser]);

  // Sort users: most recent message first
  const sortedUsers = [...alluser].sort((a, b) => {
    const aTime = new Date(a.lastMessageAt || 0).getTime();
    const bTime = new Date(b.lastMessageAt || 0).getTime();
    return bTime - aTime;
  });

  return (
    <div>
      <h1 className="text-white px-8 py-2 bg-slate-800 rounded-md font-semibold mt-4">
        Messages
      </h1>

      <div
        className="overflow-y-auto flex-1"
        style={{ maxHeight: "calc(85vh - 10vh)" }}
      >
        {sortedUsers.map((user, index) => (
          <Users
            user={user}
            key={index}
            unread={unreadCounts[user._id] || 0}
            onOpen={() => {
              // reset unread count when opening
              setUnreadCounts((prev) => ({ ...prev, [user._id]: 0 }));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default User;
