import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState<React.CSSProperties>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Fill in all fields");
      setMessageStyle({ color: "red", fontWeight: "bold" });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Sign in successful!");
      setMessageStyle({ color: "green", fontWeight: "bold" });
    } catch (err: any) {
      setMessage(err.message || "Invalid email or password.");
      setMessageStyle({ color: "red", fontWeight: "bold" });
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setMessage("Signed in with Google!");
      setMessageStyle({ color: "green", fontWeight: "bold" });
    } catch (err: any) {
      setMessage(err.message || "Google sign-in failed.");
      setMessageStyle({ color: "red", fontWeight: "bold" });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign In</h1>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />

        <button className="form-button" type="submit">
          Sign In
        </button>

        {/* Google Sign In Button */}
        <button
          type="button"
          className="form-button"
          style={{ backgroundColor: "#DB4437", marginTop: "15px" }}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>

        <p style={messageStyle}>{message}</p>
        <a className="find-password" href="#">
          Forgot Password?
        </a>
      </form>
    </div>
  );
};

export default Signin;
