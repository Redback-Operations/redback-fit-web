import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { HiBell } from 'react-icons/hi';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from '../../routes/Dashboard/Dashboard.module.css';
import SessionTable from '../SessionsTable/SessionsTable';
import data from '../SessionsTable/SessionsTable.json';
import { Gauge } from '@mui/x-charts-pro';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

// Sample data for Heart Rate Graph
const heartRateData = [
	{ time: 1, heartRate: 60 },
	{ time: 2, heartRate: 65 },
	{ time: 3, heartRate: 70 },
	{ time: 4, heartRate: 75 },
	{ time: 5, heartRate: 80 },
	{ time: 6, heartRate: 85 },
];

const DashboardLanding: React.FC = () => {


	return (
		<main className={styles.mainContainerLanding}>
			<div className={styles.topBar}>
				<h1 className={styles.dashboardTitle}>Welcome, Austin!</h1>
				<div className={styles.searchAndIcons}>
					<div className={styles.searchContainer}>
						<FaMagnifyingGlass className={styles.searchIcon} />
						<input type="search" className={styles.searchInput} placeholder="Search" />
					</div>
					<HiBell className={styles.bellIcon} />
					{/*<div className={styles.profileIcon} style={{ backgroundImage: `url(${ProfilePic})` }}></div>  */}
					{/*<NotificationBell/>*/}
					<ProfileAvatar />
				</div>
			</div>
			<div className={styles.heartRateCalSection}>
				<div className={styles.heartRateWindow}>
					<h3 className={styles.componentText}>Heart Rate</h3>
					<div
						style={{ position: 'relative', width: '100%', height: '300px' }}
						onClick={(event) => {
							const container = event.currentTarget;
							const rect = container.getBoundingClientRect();
							const x = event.clientX - rect.left; // X position relative to the chart
							//const y = event.clientY - rect.top; // Y position relative to the chart

							// Example interaction: Calculate approximate clicked point
							const clickedIndex = Math.floor((x / rect.width) * heartRateData.length);
							if (clickedIndex >= 0 && clickedIndex < heartRateData.length) {
								const pointData = heartRateData[clickedIndex];
								alert(`Time(s) ${pointData.time}: ${pointData.heartRate} bpm`);
							}
						}}
					>
						<LineChart
							xAxis={[{ data: heartRateData.map((entry) => entry.time), label: 'Time (s)' }]}
							series={[
								{
									data: heartRateData.map((entry) => entry.heartRate),
									label: 'Heart Rate (bpm)',
								},
							]}
						/>
					</div>

				</div>
				<div className={styles.sideBySideComponents}>
					<div className={styles.SessionsProfileWindow}>
						<h1>Your Sessions</h1>
						<SessionTable data={data}>
						</SessionTable>
					</div>
					<div className={styles.calV02Box}>
						<div className={styles.calendarWindow}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar />
							</LocalizationProvider>	
						</div>
						<div className={styles.VO2Window}>
							<h3 className={styles.componentTextVO2}>V02 Max</h3>
							<Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
								<Gauge width={200} height={200} value={80} />
							</Stack>
						</div>
						{/* <div className={styles.radarChart}>
					<RadarChart  />
				</div> */}
					
					</div>
				</div>
				<div className={styles.PerformanceTipsWindow}>
					<h1>Performance Tips</h1>

					<ul>
						<li>
							<h3>Hydrate</h3>
							<p>
								Staying hydrated is essential for mental and physical performance. Dehydration can lead to fatigue, lack of concentration, and decreased cognitive function.
							</p>
							<p><strong>Tip:</strong> Aim to drink water regularly throughout the day, especially if you're doing mentally intensive work or exercise.</p>
						</li>

						<li>
							<h3>Be Consistent</h3>
							<p>
								Consistency is key to long-term performance. Whether it's in your work, study, or fitness routines, small, consistent efforts over time lead to bigger results.
							</p>
							<p><strong>Tip:</strong> Create habits that you can stick with daily, such as setting aside specific time blocks for focused work or regular exercise.</p>
						</li>

						<li>
							<h3>Set Goals</h3>
							<p>
								Clear, measurable goals give you direction and motivation. When you have something concrete to work toward, it’s easier to stay focused and track progress.
							</p>
							<p><strong>Tip:</strong> Break larger goals into smaller, manageable tasks and set deadlines to keep yourself on track.</p>
						</li>

						<li>
							<h3>Have a Motive</h3>
							<p>
								Understanding your "why" behind tasks or challenges enhances motivation and commitment. Having a personal reason or goal to reach gives you the energy to push through obstacles.
							</p>
							<p><strong>Tip:</strong> Write down your personal motivations and refer to them when you feel unmotivated or distracted.</p>
						</li>

						<li>
							<h3>Prioritize Sleep</h3>
							<p>
								Sleep is essential for cognitive function, memory consolidation, and emotional regulation. A lack of sleep can impair your ability to think clearly, problem-solve, and stay productive.
							</p>
							<p><strong>Tip:</strong> Aim for 7-9 hours of sleep per night and establish a bedtime routine to improve sleep quality, such as limiting screen time before bed and avoiding caffeine in the afternoon.</p>
						</li>
					</ul>
				</div>
				{/* <div className={styles.radarChart}>
					<RadarChart  />
				</div> */}
			</div>
		</main>
	);
};

export default DashboardLanding;
