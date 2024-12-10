import { useEffect } from 'react';
import styles from './Dashboard.module.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
	useEffect(() => {
		// Set the body background color when the Dashboard mounts
		document.body.style.backgroundColor = '#f8f9fa' ;

		// Reset the background color when the Dashboard unmounts
		return () => {
			document.body.style.backgroundColor = '';  // Reset to default or a specific color
		};
	}, []);

	return (
		<div className={styles.dashboardContainer}>
			<DashboardSidebar />
			<div className={styles.dashboardContent}>
				<DashboardHeader />
				<Outlet/>
			</div>
		</div>
	);
};

export default Dashboard;
