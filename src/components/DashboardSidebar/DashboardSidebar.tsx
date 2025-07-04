import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
	BsGrid1X2Fill,
	BsFillArchiveFill,
	BsFillGrid3X3GapFill,
	BsMenuButtonWideFill,
	BsFillGearFill,
	BsTable,
	BsPersonPlusFill,
	BsBellFill,
	BsBarChartFill,
} from 'react-icons/bs';

import styles from '../../routes/Dashboard/Dashboard.module.css';
import Logo from '../../assets/Redback_logo.png';

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
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard"><BsGrid1X2Fill /> Dashboard</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard/features"><BsFillArchiveFill /> Features</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard/categories"><BsFillGrid3X3GapFill /> Categories</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard/goals"><BsBarChartFill /> Goals</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/reports"><BsMenuButtonWideFill /> Reports</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard/recovery-tracker"><BsBellFill /> Recovery Tracker</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard/data-predictions"><BsTable /> Data & Predictions</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard/custom-notification"><BsGrid1X2Fill /> Custom Notification</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard/weekly-summary"><BsGrid1X2Fill /> Weekly Summary</NavLink>
				</li>
				<li className={styles.sidebarListItem}>
					<NavLink to="/dashboard/my-friends"><BsPersonPlusFill /> My Friends</NavLink>
				</li>
			</ul>

			<div className={styles.sidebarSettings}>
				<NavLink to="/dashboard/settings" className={styles.sidebarBottomLink}>
					<BsFillGearFill /> Settings
				</NavLink>
			</div>
		</aside>
	);
};

export default Sidebar;
