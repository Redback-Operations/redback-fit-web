import { useContext } from 'react';
import styles from './Dashboard.module.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const Dashboard = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className={`${styles.dashboardContainer} ${theme}`}>
			<DashboardSidebar />
			<div className={styles.dashboardContent}>
				<DashboardHeader />
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
