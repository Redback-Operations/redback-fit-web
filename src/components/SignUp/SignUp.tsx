import React, { Component, ChangeEvent, FormEvent, CSSProperties } from 'react'
import axios from '../../api/axiosClient';

// Define the state interface
interface SignUpState {
  fullName: string
  email: string
  password: string
  message: string
  messageStyle: CSSProperties
}

class SignUp extends Component<{}, SignUpState> {
  state: SignUpState = {
    fullName: '',
    email: '',
    password: '',
    message: '',
    messageStyle: {},
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    this.setState({ [name]: value } as unknown as Pick<SignUpState, keyof SignUpState>)
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { fullName, email, password } = this.state

    if (!fullName || !email || !password) {
      this.setState({
        message: 'Full name, email, and password are required',
        messageStyle: { color: 'red', fontWeight: 'bold' },
      })
      return
    }

    axios
      .post('/auth/register', {
        name: fullName,
        email,
        password,
      })
      .then(() => {
        // Redirect to login page with a "registered" flag
        window.location.href = '/login?registered=true'
      })
      .catch((err: any) => {
        this.setState({
          message: err.response?.data?.msg || 'Registration failed',
          messageStyle: { color: 'red', fontWeight: 'bold' },
        })
      })
  }

	

	render() {
		const { message, messageStyle } = this.state;

		return (
			<div className="form-container sign-up-container">
				<form className="form" onSubmit={this.handleSubmit}>
					<h1 className="form-title">Create Account</h1>

					<input
						type="text"
						name="fullName"
						placeholder="Full Name"
						onChange={this.handleChange}
					/>
					<input
						type="email"
						name="email"
						placeholder="Email Address"
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						onChange={this.handleChange}
					/>
					<button className="form-button" type="submit">
						Sign Up
					</button>
					
					{/* Inline styles applied dynamically */}
					{message && <p style={messageStyle}>{message}</p>}
				</form>
			</div>
		);
	}
}

export default SignUp;
