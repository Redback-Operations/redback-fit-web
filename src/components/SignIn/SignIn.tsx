import { Component } from 'react';

class Signin extends Component {
	state = {
		email: '',
		password: '',
		message: '',
		messageStyle: {},
	};

	// Hardcoded credentials
	credentials = {
		email: 'redback.operations@deakin.edu.au',
		password: 'project3',
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const { email, password } = this.state;

		// Check if fields are empty
		if (!email || !password) {
			this.setState({ 
				message: 'Fill in all fields', 
				messageStyle: { color: 'red', fontWeight: 'bold' }
			});
			return;
		}

		// Check credentials
		if (email === this.credentials.email && password === this.credentials.password) {
			this.setState({ 
				message: 'Sign in successful!', 
				messageStyle: { color: 'green', fontWeight: 'bold' }
			});
		}
		else {
			this.setState({ 
				message: 'Invalid email or password.', 
				messageStyle: { color: 'red', fontWeight: 'bold' }
			});
		}
	};

	render() {
		const { messageStyle } = this.state;
		return (
			<div className="form-container sign-in-container">
				<form className="form" onSubmit={this.handleSubmit}>
					<h1 className="form-title">Sign In</h1>

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

					<button className="form-button">Sign In</button>
					<p style={messageStyle}>{this.state.message}</p>
					<a className="find-password" href="#">Forgot Password?</a>
				</form>
			</div>
		);
	}
}

export default Signin;
