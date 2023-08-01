import React, { useContext, useState } from "react";
import "../style sheets/loging.css";
import { Appcontext } from "../context/Contexts";

function Signin() {
    const [FirstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pwdState, setPwdState] = useState("");
    const [emailState, setEmailState] = useState("");
    const vl = useContext(Appcontext);

    function handleSubmit(e) {
        e.preventDefault();

        const signData = {
        first_name: FirstName,
        last_name: lastName,
        email: emailState,
        password: pwdState,
        };

        localStorage.setItem("user", JSON.stringify(signData));
        vl.formFunction(signData);
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
        <form onSubmit={handleSubmit}>
        <h1>Sign in to Green Space</h1>

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
