import React, { useState } from "react";
import "../style sheets/loging.css";
import Loader from "./Loader";

function LoginPage() {
  const [formData, setFormData] = useState({});
  const [inputState, setInputStata] = useState("");
  const [pwdState, setPwdState] = useState("");
  const [loading, setLoading] = useState(false);
  const LOG_URL = "http://ecommerce.muersolutions.com/api/v1/user/login";
  function handleSubmit(e) {
    e.preventDefault();
    const LogData = {
      username: inputState,
      password: pwdState,
    };
    console.log("loading");
    setLoading(true);
    loginUser(LogData);
  }
  async function loginUser(LogData) {
    try {
      const response = await fetch(LOG_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LogData),
      });

      if (!response.ok) {
        alert("Failed to log in! Try again later");
        setLoading(false);
        throw new Error("Network response was not ok");
      } else if (response === 422) {
        /* alert(
          "Fetal you may have enterd invalid data! Try again with valid data"
        ); */
      } else if (response === 503) {
        alert("Sorry login service unavailable");
      }

      const data = await response.json();
      console.log(data);
      upDateUserInContext(data);
      return data;
    } catch (error) {
      alert("Failed to log in! Try again later");
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  function upDateUserInContext(data) {
    const name = data.first_name;
    vl.setUser(name);
  }
  function handleInput(e) {
    const value = e.target.value;
    setInputStata(value);
  }
  function handlePwd(e) {
    const value = e.target.value;
    setPwdState(value);
  }
  const login = (
    <form onSubmit={handleSubmit} className="log-form">
      <h1>Log in </h1>
      <div className="input-container">
        <input type="text" placeholder="email" onChange={handleInput} />
        <br />
        <input type="password" placeholder="password" onChange={handlePwd} />
      </div>
      <center>
        <button className="btn">Log in</button>
      </center>
    </form>
  );
  return <div className="form-wrapper">{loading ? <Loader /> : login}</div>;
}

export default LoginPage;
