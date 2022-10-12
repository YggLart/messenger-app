import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { HiOutlineChat as LogoIcon } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export const Chats = () => {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const history = useHistory();

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push("/");
        return;
      }

      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": "dd625e5-696f-4015-88b2-0f7326d0e7fd6",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })

        .then(() => setLoading(false))

        .catch((e) => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log("e", e.response));
          });
        });
    }
  }, [user, history]);

  if (!user || loading) return "loading";

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
        userName={user.email}
        userSecret={user.uid}
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
      />
    </div>
  );
};
