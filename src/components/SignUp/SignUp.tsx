import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase";

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setMsg("Fill in all fields");
      setStyle({ color: "crimson" });
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });
      setMsg("Account created successfully!");
      setStyle({ color: "green" });
    } catch (err: any) {
      setMsg(err.message || "Sign up failed");
      setStyle({ color: "crimson" });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create Account</h1>
        <input name="fullName" placeholder="Full Name" value={fullName}
               onChange={(e) => setFullName(e.target.value)} />
        <input type="email" name="email" placeholder="Email Address" value={email}
               onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} />
        <button className="form-button" type="submit">Sign Up</button>
        {msg && <p style={{ ...style, margin: "20px 0" }}>{msg}</p>}
      </form>
    </div>
  );
};

export default SignUp;
