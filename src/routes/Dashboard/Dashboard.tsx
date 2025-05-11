import styles from './Dashboard.module.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
	return (
		<div className="page-container">
			<div className={styles.dashboardContainer}>
				<DashboardSidebar />
				<div className={styles.dashboardContent}>
					<DashboardHeader />
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
