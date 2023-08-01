import React, { useState } from "react";
import "../style sheets/loging.css";

function LoginPage() {
  const [formData, setFormData] = useState({});
  const [inputState, setInputStata] = useState("");
  const [pwdState, setPwdState] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const LogData = {
      username: inputState,
      password: pwdState,
    };
  }
  function handleInput(e) {
    const value = e.target.value;
    setInputStata(value);
  }
  function handlePwd(e) {
    const value = e.target.value;
    setPwdState(value);
  }
  console.log(inputState);
  const login = (
    <form onSubmit={handleSubmit}>
      <h1>Login in to Green Space</h1>
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
