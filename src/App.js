import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Gallery from "./components/Gallery/Gallery";
import { useState } from "react";

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)

  const  signedIn = () =>{
    setIsSignedIn(true)
  }

  return (
    <main className="App">
    
      <Routes>
        <Route path="/" element={<Gallery
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />} />
         <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> 
      </Routes>
    </main>
  );
}

export default App;
