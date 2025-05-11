import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../routes/Dashboard/Dashboard.module.css';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsMenuButtonWideFill, BsFillGearFill, BsTable } from 'react-icons/bs';
import Logo from '../../assets/Redback_logo.png'; // Ensure the path is correct
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
	return (
		<aside className={styles.sidebar}>
			<Link to="/" className={styles.logo}>
				<img src={Logo} alt="Logo" className={styles.logoImage} />
			</Link>
			<div className={styles.title}>
                ReflexionPro
			</div>
			<ul className={styles.sidebarList}>
				<li className={styles.sidebarListItem}><NavLink to="/"><BsGrid1X2Fill /> Home</NavLink></li>
				<li className={styles.sidebarListItem}><NavLink to="/dashboard"><BsGrid1X2Fill /> Dashboard</NavLink></li>
				<li className={styles.sidebarListItem}><NavLink to="/dashboard/features"><BsFillArchiveFill /> Features</NavLink></li>
				<li className={styles.sidebarListItem}><NavLink to="/dashboard/categories"><BsFillGrid3X3GapFill /> Categories</NavLink></li>
				<li className={styles.sidebarListItem}><NavLink to="/dashboard/goals"><BsFillGrid3X3GapFill /> Goals</NavLink></li>
				<li className={styles.sidebarListItem}><NavLink to="/reports"><BsMenuButtonWideFill /> Reports</NavLink></li>
				<li className={styles.sidebarListItem}><NavLink to='/dashboard/data-predictions'><BsTable /> Data & Predictions</NavLink></li>
			</ul>
			<div className={styles.sidebarSettings}>
				<NavLink to="/dashboard/settings" className={styles.sidebarBottomLink}><BsFillGearFill /> Settings</NavLink>
			</div>
		</aside>
	);
};

export default Sidebar;
