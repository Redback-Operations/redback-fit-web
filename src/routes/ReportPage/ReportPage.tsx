import { useContext } from 'react';
import styles from './ReportPage.module.css';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const ReportPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.dashboardContainer} ${theme}`}>
      <DashboardSidebar />
      {/* include a literal "dashboardContent" so global.css dark rules definitely hit */}
      <div className={`${styles.dashboardContent} dashboardContent`}>
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default ReportPage;
