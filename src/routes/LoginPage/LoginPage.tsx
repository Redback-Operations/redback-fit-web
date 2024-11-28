import React, { useState, useEffect } from 'react';
import './Login.style.css';
import SignUp from '../../components/SignUp/SignUp.tsx';
import Signin from '../../components/SignIn/SignIn.tsx';
import Overlay from '../../components/SignInSlider/SignInSlider.tsx';

const LoginPage: React.FC = () => {
	const [rightPanelActive, setRightPanelActive] = useState<boolean>(false);

	const handleClickSignUpButton = () => setRightPanelActive(true);
	const handleClickSignInButton = () => setRightPanelActive(false);

	useEffect(() => {
		const style = document.createElement('style');
		style.innerHTML = `
			body {
				background: #f8f9fa;
			}
		`;
		document.head.appendChild(style);
	
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<div className="Login">
			<div
				className={`container ${rightPanelActive ? 'right-panel-active' : ''}`}
				id="container"
			>
				<SignUp />
				<Signin />
				<Overlay
					handleClickSignInButton={handleClickSignInButton}
					handleClickSignUpButton={handleClickSignUpButton}
				/>
			</div>
		</div>
	);
};

export default LoginPage;
