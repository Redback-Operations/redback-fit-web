import Logo from '../../assets/Redback_logo.png';
import { Link } from 'react-router-dom';
import styles from '../../routes/HomePage/HomePage.module.css';

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<div className={styles['nav-logo-container']}>
				<img src={Logo} alt="" />
			</div>
			<div style={{ fontWeight: 'bold', fontSize: '2rem', marginRight: '500px' }}>
				ReflexionPro
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
