import React, { useState } from 'react';

//Sign-in component
const Signin: React.FC = () => {
  //Form input states
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageStyle, setMessageStyle] = useState<React.CSSProperties>({});

  //Load credentials from environment variables
  const credentials = {
    email: import.meta.env.VITE_SIGNIN_EMAIL,
    password: import.meta.env.VITE_SIGNIN_PASSWORD,
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are filled
    if (!email || !password) {
      setMessage('Fill in all fields');
      setMessageStyle({ color: 'red', fontWeight: 'bold' });
      return;
    }

    // Check credentials
    if (email === credentials.email && password === credentials.password) {
      setMessage('Sign in successful!');
      setMessageStyle({ color: 'green', fontWeight: 'bold' });
    } else {
      setMessage('Invalid email or password.');
      setMessageStyle({ color: 'red', fontWeight: 'bold' });
    }
  };

  // Render form
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

        <button className="form-button">Sign In</button>
        <p style={messageStyle}>{message}</p>
        <a className="find-password" href="#">Forgot Password?</a>
      </form>
    </div>
  );
};

export default Signin;
