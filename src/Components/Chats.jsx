import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { HiOutlineChat as LogoIcon } from "react-icons/hi";

export const Chats = () => {
  const { logout } = useAuth();

  return (
    <div id="chats-page">
      <div className="navbar">
        <div className="logo">
          <LogoIcon />
          Ygg's Messenger
        </div>

        <div className="menu-options inactive">
          <p>What is this?</p>
          <p onClick={logout}>Logout</p>
        </div>
      </div>
      <ChatEngine
        userName="Ygg"
        userSecret="202020"
        projectID="ddd625e5-696f-4015-88b2-0f7326d0e7f6"
      />
    </div>
  );
};
