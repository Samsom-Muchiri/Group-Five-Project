import React, { useState } from "react";
<<<<<<< HEAD
import "../style sheets/loging.css";

function LoginPage() {
  const [formData, setFormData] = useState({});
  const [inputState, setInputStata] = useState("");
  const [pwdState, setPwdState] = useState("");
  const LOG_URL = "http://ecommerce.muersolutions.com/api/v1/user/login";
  function handleSubmit(e) {
    e.preventDefault();
    const LogData = {
      email_address: inputState,
      password: pwdState,
    };
    console.log(LogData);
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      alert("Failed to log in! Try again later");
      console.error("Error fetching data:", error);
      throw error;
    }
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
  return <div className="form-wrapper">{login}</div>;
}

export default LoginPage;
=======

function LoginPage(){
    const[formData, setFormData] = useState({});
    const[inputState, setInputState] = useState("");
    const[pwdState, setPwdState] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const LogData = {
            username:inputState,
            password: pwdState,
        }

    }
    function handleInput(e) {
        const value = e.target.value;
        setInputState(value);
    }    
    function handlePwd(e) {
        const value = e.target.value;
        setPwdState(value);
    }

    const login = (
        <form onSubmit={{handleSubmit}}>
            <h1>Log in to Green Space</h1>
            <div className="input-container">
                <input type="text" placeholder="email" onChange={handleInput}/>
                <br/>
                <input type="password" placeholder="password" onChange={handlePwd}/>
            </div>
            <center>
            <button className="btn">LOG IN</button>
            </center>
        </form>

    );
    return
    <div className="form-wrapper">{login}</div>
}

export default LoginPage;
>>>>>>> 6057b40 (Login Page)
