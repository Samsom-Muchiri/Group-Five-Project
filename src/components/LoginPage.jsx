import React, { useState } from "react";

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