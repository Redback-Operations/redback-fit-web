import Logo from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';
import styles from '../../routes/HomePage/HomePage.module.css';

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<div className={styles['nav-logo-container']}>
				<img
					src={Logo}
					alt="Logo"
					className={styles['nav-logo']}
				/>
			</div>
			<div className={styles['navbar-links-container']}>
				<a href="/" className={styles.link}>Home</a>
				<Link to="/dashboard" className={styles.link}>Dashboard</Link>
				<Link to="/login" className={styles['primary-button']}>Sign In</Link>
			</div>
		</nav>
	);
};

export default Navbar;

