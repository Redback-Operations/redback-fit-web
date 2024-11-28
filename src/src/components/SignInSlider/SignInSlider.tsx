import { Component } from 'react';

interface Props {
    handleClickSignUpButton(event: React.MouseEvent<HTMLButtonElement>): void;
    handleClickSignInButton(event: React.MouseEvent<HTMLButtonElement>): void;
}

class Overlay extends Component<Props> {
	render() {
		const { handleClickSignUpButton, handleClickSignInButton } = this.props;
		return (
			<div className="overlay-container">
				<div className="overlay">
					<div className="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p className="overlay-description">
                        Enter your Redback login details to access all of our features<br/>

						</p>
						<button
							className="ghost form-button"
							id="signIn"
							onClick={handleClickSignInButton}
						>Sign In</button>
					</div>
					<div className="overlay-panel overlay-right">
						<h1>Register Now</h1>
						<p className="overlay-description">
                        Register with your personal details to access all of Redback Operation's features<br/>

						</p>
						<button
							className="ghost form-button"
							id="signUp"
							onClick={handleClickSignUpButton}
						>Sign Up</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Overlay;
