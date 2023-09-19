import React, { useState } from "react";
import "./Register.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErrorMsg("");
    setEmailError(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErrMsg("");
    setPasswordError(false);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };



  let isValid;
  const confirmEmail = () => {
    if (email === "") {
      setEmailError(true);
      setEmailErrorMsg("This field is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError(true);
      setEmailErrorMsg("Whoops, make sure its an email");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg("");
      isValid = true;
    }
  };

  const confirmPassword = () => {
    if (password === "") {
      setPasswordError(true);
      setPasswordErrMsg("This field is required");
      isValid = false;

    } else if(password === '1Password'){
      setPasswordError(false);
      setPasswordErrMsg("");
      isValid = true;
    }
  };



  const register = (e) => {
    e.preventDefault();
  
    confirmEmail();
    confirmPassword();
    if (isValid) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
      navigate("/login");
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={register}>
          <div className={`inputWrapper ${emailError ? "error" : ""}`}>
          <img width="16" src="https://img.icons8.com/ios-glyphs/90/ffd700/user--v1.png" alt="user--v1"/>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
            />
            {emailError && <p className="errorMsg">{emailErrorMsg}</p>}
          </div>
          <div className={`inputWrapper ${passwordError ? "error" : ""}`}>

          <img width="16" src="https://img.icons8.com/ios-glyphs/90/ffd700/private2.png" alt="private2"/>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
            />
            {passwordError && <p className="errorMsg">{passwordErrMsg}</p>}
          </div>

          <button>Register</button>
        </form>

        <p className="text">
          Log in
          <Link to="/login">Here</Link> if you have an account
        </p>
      </div>
    </div>
  );
};

export default Register;
