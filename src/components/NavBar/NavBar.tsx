import { useEffect, useState } from 'react';
import Logo from '../../assets/Redback_logo.png';
import { Link } from 'react-router-dom';
import styles from '../../routes/HomePage/HomePage.module.css';

const Navbar = () => {
	const [lastSynced, setLastSynced] = useState<Date | null>(null);

	useEffect(() => {
		const syncData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			setLastSynced(new Date());
		};

		syncData();
		const interval = setInterval(syncData, 60000);
		return () => clearInterval(interval);
	}, []);

	return (
		<nav className={styles.nav}>
			<div className={styles['nav-logo-container']}>
				<img src={Logo} alt="Redback Logo" />
			</div>

			<div style={{ fontWeight: 'bold', fontSize: '2rem', marginRight: '500px' }}>
				ReflexionPro
			</div>

			<div
				className={styles['navbar-links-container']}
				style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
			>
				<div style={{ fontSize: '0.85rem', color: '#666' }}>
					{lastSynced ? `Last Synced: ${lastSynced.toLocaleTimeString()}` : 'Syncing...'}
				</div>
				<a href="/" className={styles.link}>Home</a>
				<Link to="/dashboard" className={styles.link}>Dashboard</Link>
				<Link to="/login" className={styles['primary-button']}>Sign In</Link>
			</div>
		</nav>
	);
};

export default Navbar;
