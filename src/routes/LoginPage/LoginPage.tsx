import React, { useState, useEffect } from 'react';
import './LoginPage.style.css';
import Logo from '../../assets/Redback_logo.png';
import SignUp from '../../components/SignUp/SignUp.tsx';
import Signin from '../../components/SignIn/SignIn.tsx';
import Overlay from '../../components/SignInSlider/SignInSlider.tsx';
import { Link } from 'react-router-dom';

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
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Link to="/" style={{ maxWidth: '90px', marginRight: '20px' }}>
					<img src={Logo} alt="" style={{ width: '100%' }} />
				</Link>
				<div
					style={{
						fontWeight: 'bold',
						fontSize: '2rem',
					}}
				>
					<Link to="/"  style = {{ textDecorationLine: 'none', color: 'black' }}>
					ReflexionPro
					</Link>
				</div>
			</div>

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
