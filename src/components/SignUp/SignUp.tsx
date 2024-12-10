import { Component } from 'react';

class SignUp extends Component {
	state = {
		fullName: '',
		email: '',
		password: '',
		message: '',
		messageStyle: {}, // Object to hold dynamic inline styles
	};

	handleChange = (e: { target: { name: string; value: string; }; }) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		const { fullName, email, password } = this.state;

		if (!fullName || !email || !password) {
			this.setState({ 
				message: 'Fill in all fields', 
				messageStyle: { color: 'red', fontWeight: 'bold' }
			});
		}
		else {
			this.setState({ 
				message: 'Account created successfully (dummy logic)', 
				messageStyle: { color: 'green', fontWeight: 'bold' }
			});
		}
	};

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
