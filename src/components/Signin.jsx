import React, { useContext, useState } from "react";

import "../style sheets/loging.css";
import { Appcontext } from "../context/Contexts";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [FirstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pwdState, setPwdState] = useState("");
  const [emailState, setEmailState] = useState("");
  const SIGN_URL = "http://ecommerce.muersolutions.com/api/v1/user/signup";
  const vl = useContext(Appcontext);
  const navigateToHome = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const signData = {
      first_name: FirstName,
      last_name: lastName,
      email: emailState,
      password: pwdState,
    };

    fetch(SIGN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signData),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Failed");
        } else {
          localStorage.setItem("user", JSON.stringify(signData));

          alert("Sign in successful");
          navigateToHome("/");
        }
        return res.json();
      })
      .then((data) => {
        upDateUserInContext(data);
      })
      .catch((error) => console.log(error));
  }
  function upDateUserInContext(data) {
    const name = data.first_name;
    vl.setUser(name);
  }
  function handleFirstName(e) {
    const value = e.target.value;
    setFirstName(value);
  }
  function handleLastName(e) {
    const value = e.target.value;
    setLastName(value);
  }
  function handleEmail(e) {
    const value = e.target.value;
    setEmailState(value);
  }
  function handlePwd(e) {
    const value = e.target.value;
    setPwdState(value);
  }
  const signIn = (
    <form onSubmit={handleSubmit} className="log-form">
      <h1>Sign in </h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="First Name"
          onChange={handleFirstName}
        />
        <br />
        <input type="text" placeholder="Last Name" onChange={handleLastName} />
        <br />
        <input type="text" placeholder="email" onChange={handleEmail} />
        <br />
        <input type="password" placeholder="password" onChange={handlePwd} />
      </div>
      <center>
        <button className="btn">Sign in</button>
      </center>
    </form>
  );
  return <div className="form-wrapper">{signIn}</div>;
}
export default Signin;
