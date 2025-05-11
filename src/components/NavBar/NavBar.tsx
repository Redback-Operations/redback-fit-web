import React from 'react';
import Logo from '../../assets/Redback_logo.png';
import { Link } from 'react-router-dom';
import styles from '../../routes/HomePage/HomePage.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles['nav-logo-container']}>
        <img src={Logo} alt="Redback Logo" />
      </div>

      <div style={{ fontWeight: 'bold', fontSize: '2rem', marginRight: 'auto' }}>
        ReflexionPro
      </div>

      <div className={styles['navbar-links-container']}>
        <a href="/" className={styles.link}>
          Home
        </a>
        <Link to="/dashboard" className={styles.link}>
          Dashboard
        </Link>
        <Link to="/login" className={styles['primary-button']}>
          Sign In
        </Link>
      </div>

      <div style={{ marginLeft: '1rem' }}>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
