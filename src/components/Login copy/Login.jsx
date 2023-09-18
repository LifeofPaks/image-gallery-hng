import React, { useState } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../config/Firebase'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const logIn = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            console.log(userCredential)
        }).catch(error =>{
            console.log(error)
        }) 
    }

  return (
    <div className="login">
      <form onSubmit={logIn}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
