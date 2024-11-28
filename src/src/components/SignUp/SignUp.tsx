import { Component } from 'react';

class SignUp extends Component {
	render() {
		return (
			<div className="form-container sign-up-container">
				<form className="form" action="#">
					<h1 className="form-title">Create Account</h1>

					<input type="text" placeholder="Full Name" />
					<input type="email" placeholder="Email Address" />
					<input type="password" placeholder="Password" />
					<button className="form-button">sign up</button>
				</form>
			</div>
		);
	}
}

export default SignUp;
