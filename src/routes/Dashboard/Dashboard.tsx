import './Dashboard.module.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.tsx';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar.tsx';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<DashboardSidebar />
			<div className="dashboard-content">
				<DashboardHeader />
				<Outlet/>
			</div>
		</div>
	);
};

export default Dashboard;
