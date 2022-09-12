import React, { useState, useEffect } from "react";
import "./Auth.css";
import Signin from "./Login/Signin";
import Register from "./Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login(props) {
  const [authMode, setAuthMode] = useState("signin");
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  if (authMode === "signin") {
    return <Signin changeAuthMode={changeAuthMode} />;
  }
  return <Register changeAuthMode={changeAuthMode} />;
}
