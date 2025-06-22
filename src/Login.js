// Login.js
import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        login({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert("Oops! Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://t4.ftcdn.net/jpg/11/75/80/57/360_F_1175805796_Oer2fJ1Q0fHRDV7kEfAgMF5EJOA0tKEw.jpg"
          alt="Login Illustration"
        />
        <h1>Sign in to Gmail</h1>
        <p>Access your Mail Dashboard</p>
        <Button variant="contained" color="primary" onClick={signIn}>
          Login with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;