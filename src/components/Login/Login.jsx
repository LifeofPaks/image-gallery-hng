import React, { useState } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsSignedIn, isSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [demoLogin, setDemoLogin] = useState(false);

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

  let isValid;
  let demoPassword = "1Password";
  let demoEmail = "user@example.com";

  const validateDemoEmail = () => {
    if (email !== demoEmail) {
      setEmailError(true);
      setEmailErrorMsg("Invalid user credential");
      setDemoLogin(false);
    } else {
      setEmailError(false);
      setEmailErrorMsg("");
      setDemoLogin(true);
    }
  };

  const validateDemoPassword = () => {
    if (password !== demoPassword) {
      setPasswordError(true);
      setPasswordErrMsg("Invalid user credential");
      setDemoLogin(false);
    } else {
      setPasswordError(false);
      setPasswordErrMsg("");
      setDemoLogin(true);
    }
  };

  const confirmEmail = () => {
    if (email === "") {
      setEmailError(true);
      setEmailErrorMsg("This field is required");
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
    validateDemoEmail();
    validateDemoPassword();
    if (isValid) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          setIsSignedIn(true);
          navigate("gallery");
        })
        .catch((error) => {
          console.log(error);
          setIsSignedIn(false);
        });
    }

    if (demoLogin) {
      setIsSignedIn(true);
      navigate("gallery");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={logIn}>
          <div className={`inputWrapper ${emailError ? "error" : ""}`}>
            <img
              width="16"
              src="https://img.icons8.com/ios-glyphs/90/ffd700/user--v1.png"
              alt="user--v1"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
            />
            {emailError && <p className="errorMsg">{emailErrorMsg}</p>}
          </div>

          <div className={`inputWrapper ${passwordError ? "error" : ""}`}>
            <img
              width="16"
              src="https://img.icons8.com/ios-glyphs/90/ffd700/private2.png"
              alt="private2"
            />
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
