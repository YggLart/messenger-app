import React from "react";
import { AiOutlineGoogle as GoogleIcon } from "react-icons/ai";
import { FaFacebookF as FacebookIcon } from "react-icons/fa";

import { useAuth } from "../Contexts/AuthContext";

export const Login = () => {
  const { signInGoogle, signInFacebook } = useAuth();
  return (
    <div id="login-page">
      <h2>Ygg's Messenger</h2>
      <div className="btn google" onClick={signInGoogle}>
        <GoogleIcon />
        Login with Google
      </div>
      <div className="btn facebook" onClick={signInFacebook}>
        <FacebookIcon />
        Login with Facebook
      </div>
    </div>
  );
};
