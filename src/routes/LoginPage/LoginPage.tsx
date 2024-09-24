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
            @keyframes gradientAnimation {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }

            body {
                animation: gradientAnimation 20s ease infinite;
                background: linear-gradient(to right, #212A31, #2e3944);
                background-size: 200% 200%;
            }

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
