import React, { useState } from 'react';
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

	return (
		<div className="page-container">
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
						color: 'var(--text-color)', // ✅ updated for theme
					}}
				>
					<Link
						to="/"
						style={{ textDecorationLine: 'none', color: 'var(--text-color)' }}
					>
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
