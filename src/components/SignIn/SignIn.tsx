import { Component } from 'react';

class Signin extends Component {
	render() {
		return (
			<div className="form-container sign-in-container">
				<form className="form" action="#">
					<h1 className="form-title">Sign In</h1>

					<input type="email" placeholder="Email Address" />
					<input type="password" placeholder="Password" />

					<button className="form-button">sign in</button>
					<a className="find-password" href="#">Forgot Password?</a>
				</form>
			</div>
		);
	}
}

export default Signin;
