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
			
			
			
			
			<p style={{ color: 'white'}}>What I need to have - Bar w/ clickable audio assist, Different Sections describing different sport/fitness areas, badges incl. images icons w/ desc. underneath change with mouse overview</p>
			
			
			<p style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
    This is a test message.
</p>

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		</div>
	);
};

export default LoginPage;
