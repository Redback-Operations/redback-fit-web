import React, { useState } from 'react';
import './LoginPage.style.css';
import Logo from '../../assets/Redback_logo.png';
// import SignUp from '../../components/SignUp/SignUp.tsx';
// import Signin from '../../components/SignIn/SignIn.tsx';
import Overlay from '../../components/SignInSlider/SignInSlider.tsx';
import { Link } from 'react-router-dom';
import axios from '../../api/axiosClient';


const LoginPage: React.FC = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Sign-up form state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleClickSignUpButton = () => setRightPanelActive(true);
  const handleClickSignInButton = () => setRightPanelActive(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await axios.post('/auth/login', { email: loginEmail, password: loginPassword });
      window.location.href = '/dashboard';
    } catch (err: any) {
      setLoginError(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    if (!fullName || !signupEmail || !signupPassword) {
      setSignupError('All fields are required');
      return;
    }
    try {
      await axios.post('/auth/register', {
        name : fullName,
        email: signupEmail,
        password: signupPassword,
      });
      // After registration, switch to sign-in pane with message
      setRightPanelActive(false);
      setLoginError('Registration successful! Please log in.');
    } catch (err: any) {
      setSignupError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="ReflexionPro" className="logo" />
        </Link>
        <h1 className="app-title">
          <Link to="/">ReflexionPro</Link>
        </h1>
      </div>

      <div className={`container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
        {/* Sign-up form */}
        <div className="form-container sign-up-container">
          <form className="form" onSubmit={handleSignUp}>
            <h2>Create Account</h2>
            {signupError && <p className="error">{signupError}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={e => setSignupEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={e => setSignupPassword(e.target.value)}
            />
            <button className="form-button" type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign-in form */}
        <div className="form-container sign-in-container">
          <form className="form" onSubmit={handleLogin}>
            <h2>Sign In</h2>
            {loginError && <p className="error">{loginError}</p>}
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
            />
            <button className="form-button" type="submit">Sign In</button>
            <button
              type="button"
              className="oauth-button"
              onClick={() => {
                const server = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, '');
                window.location.href = `${server}/api/auth/login`;
              }}
            >
              Sign in with Provider
            </button>
          </form>
        </div>

        {/* Overlay Panels */}
        <Overlay
          handleClickSignInButton={handleClickSignInButton}
          handleClickSignUpButton={handleClickSignUpButton}
        />
      </div>
    </div>
  );
};

export default LoginPage;
