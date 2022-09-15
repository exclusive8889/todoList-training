import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import React, { useState } from "react";
import Signin from "./Login/Signin";
import Register from "./Register/Register";

export default function Login() {
  const [authMode, setAuthMode] = useState("signin");
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  if (authMode === "signin") {
    return <Signin changeAuthMode={changeAuthMode} />;
  }
  return <Register changeAuthMode={changeAuthMode} />;
}
