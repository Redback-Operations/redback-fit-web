// File: src/components/SignIn/SignIn.tsx
import React, { Component, ChangeEvent, FormEvent, CSSProperties } from 'react'
import axios from '../../api/axiosClient'
import '../../styles/LoginPage.style.css'

interface SignInState {
  email: string
  password: string
  message: string
  messageStyle: CSSProperties
}

class SignIn extends Component<{}, SignInState> {
  state: SignInState = {
    email: '',
    password: '',
    message: '',
    messageStyle: {},
  }

  componentDidMount(): void {
    // Show success message if redirected after registration
    const params = new URLSearchParams(window.location.search)
    if (params.get('registered') === 'true') {
      this.setState({
        message: 'Registration successful! Please log in.',
        messageStyle: { color: 'green', fontWeight: 'bold' },
      })
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    this.setState({ [name]: value } as unknown as Pick<SignInState, keyof SignInState>)
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { email, password } = this.state

    if (!email || !password) {
      this.setState({
        message: 'Fill in all fields',
        messageStyle: { color: 'red', fontWeight: 'bold' },
      })
      return
    }

    axios
      .post('/auth/login', { email, password })
      .then(() => {
        window.location.href = '/dashboard'
      })
      .catch((err: any) => {
        this.setState({
          message: err.response?.data?.msg || 'Login failed',
          messageStyle: { color: 'red', fontWeight: 'bold' },
        })
      })
  }

  render() {
    const { email, password, message, messageStyle } = this.state
    return (
      <div className="form-container sign-in-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h1 className="form-title">Sign In</h1>
          {message && <p style={messageStyle}>{message}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <button className="form-button" type="submit">
            Sign In
          </button>
          <p className="footer-text">
            Don't have an account?{' '}
            <a href="/signup" className="link-button">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    )
  }
}

export default SignIn;
