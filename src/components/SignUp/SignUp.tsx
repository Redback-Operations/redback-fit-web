import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState<React.CSSProperties>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'fullName') setFullName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setMessage('Fill in all fields');
      setMessageStyle({ color: 'red', fontWeight: 'bold' });
    } else {
      setMessage('Account created successfully (dummy logic)');
      setMessageStyle({ color: 'green', fontWeight: 'bold' });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create Account</h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={handleChange}
        />
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
          Sign Up
        </button>

        {message && <p style={{ ...messageStyle, margin: '20px 0' }}>{message}</p>}
      </form>
    </div>
  );
};

export default SignUp;
