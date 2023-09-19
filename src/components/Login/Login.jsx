import React, { useState } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = ({setIsSignedIn}) => {
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

//   const isValidPassword = (password) => {
//     return /^[@#](?=.{7,13}$)(?=\w{7,13})(?=[^aeiou_]{7,13})(?=.*[A-Z])(?=.*\d)/.test(password)
//   };

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
    } else {
      setPasswordError(false);
      setPasswordErrMsg("");
      isValid = true;
    }
  };

  const logIn = (e) => {
      e.preventDefault();
    confirmEmail();
    confirmPassword();
    if (isValid) {
      navigate("/");
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          setIsSignedIn(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <div className="login">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={logIn}>
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

          <button>Log in</button>
        </form>
        <p className="text">
          Register
          <Link to="/register">Here</Link> if you don't have an account
        </p>
      </div>
    </div>
  );
};

export default Login;
