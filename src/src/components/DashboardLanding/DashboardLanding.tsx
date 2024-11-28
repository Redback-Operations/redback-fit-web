import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { HiBell } from 'react-icons/hi';  
import { FaMagnifyingGlass } from 'react-icons/fa6'; 
import styles from '../../routes/Dashboard/Dashboard.module.css';
import ProfilePic from '../../assets/ProfilePic.png'; // Import profile picture
import SessionTable from '../SessionsTable/SessionsTable';
import data from '../SessionsTable/sessionData.json';
import { Gauge } from '@mui/x-charts-pro';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import RadarChart from '../RadarChart/RadarChart';  // Adjust the path as needed
import { createTheme, ThemeProvider } from '@mui/material/styles';



const DashboardLanding: React.FC = () => {

	const theme = createTheme({
		components: {
			MuiIconButton: {
				styleOverrides: {
					root: {
						color: 'white', 
					},
				},
			},
		},
	});

      
   
	return (
		<main className={styles.mainContainerLanding}>
			<div className={styles.topBar}>
				<h1 className={styles.dashboardTitle}>Welcome Athlete!</h1>
				<div className={styles.searchAndIcons}>
					<div className={styles.searchContainer}>
						<FaMagnifyingGlass className={styles.searchIcon} />
						<input type="search" className={styles.searchInput} placeholder="Search" />
					</div>
					<HiBell className={styles.bellIcon} />
					<div className={styles.profileIcon} style={{ backgroundImage: `url(${ProfilePic})` }}></div>  
				</div>
			</div>
			<div className={styles.heartRateCalSection}>
				<div className={styles.heartRateWindow}>
					<h3 className={styles.componentText}>Heart Rate</h3>
					<p className={styles.componentText}>Graph and test data representing Heart Rate</p>
					<LineChart
						xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}  
						series={[{
							data: [0, 1, 3, 5.5, 7, 10]  
						}]}
					/>
				</div>
				<div className={styles.calV02Box}>
					<div className={styles.calendarWindow}>
						<ThemeProvider theme={theme}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar />
							</LocalizationProvider>
						</ThemeProvider>
					</div>
					<div className={styles.VO2Window}>
						<h3 className={styles.componentTextVO2}>V02 Max</h3>
						<Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
							<Gauge width={100} height={100} value={70} />
						</Stack>
					</div>
				</div>
			</div>
			<div className={styles.sideBySideComponents}>
				<div className={styles.SessionsProfileWindow}>
					<h1>Your Sessions</h1>
					<SessionTable data ={data}>
					</SessionTable>
				</div>
				<div className={styles.PerformanceTipsWindow}>
					<h3 className={styles.componentText}>Performance Tips</h3>
					<ul>
						<li>Hydrate</li>
						<li>Be Consistent</li>
						<li>Set Goals</li>
						<li>Have a Motive</li>
						<li>Prioritise Sleep</li>
					</ul>
				</div>
				<div className={styles.radarChart}>
					<RadarChart  />
				</div>
			</div>
		</main>
	);
};

export default DashboardLanding;
