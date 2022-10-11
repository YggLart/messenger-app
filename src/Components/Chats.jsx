import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import { HiOutlineChat as LogoIcon } from "react-icons/hi";

export const Chats = () => {
  function handleLogout() {
    signOut(auth);
  }

  return (
    <div id="chats-page">
      <div className="navbar">
        <div className="logo">
          <LogoIcon />
          Ygg's Messenger
        </div>

        <div className="menu-options inactive">
          <p>What is this?</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
      <ChatEngine
        userName="."
        userSecret="."
        projectID="ddd625e5-696f-4015-88b2-0f7326d0e7f6"
      />
    </div>
  );
};
