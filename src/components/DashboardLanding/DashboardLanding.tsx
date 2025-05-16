import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { HiBell } from 'react-icons/hi';
import { IconButton, Badge } from '@mui/material';
import { NotificationsRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from '../../routes/Dashboard/Dashboard.module.css';
import SessionTable from '../SessionsTable/SessionsTable';
import data from '../SessionsTable/SessionsTable.json';
import notificationsData from '../Notifications/DummyNotifications.json';
import { Gauge } from '@mui/x-charts-pro';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import LastSynced from '../LastSynced/LastSynced';

const heartRateData = [
	{ time: 1, heartRate: 60 },
	{ time: 2, heartRate: 65 },
	{ time: 3, heartRate: 70 },
	{ time: 4, heartRate: 75 },
	{ time: 5, heartRate: 80 },
	{ time: 6, heartRate: 85 },
];

const DashboardLanding: React.FC = () => {
	const unreadCount = notificationsData.filter(n => n.status === 'unread').length;

	return (
		<main className={styles.mainContainerLanding}>
			<div className={styles.topBar}>
				<div>
					<h1 className={styles.dashboardTitle}>Welcome, Austin!</h1>
					<LastSynced />
				</div>

				<div className={styles.searchAndIcons}>
					<div className={styles.searchContainer}>
						<FaMagnifyingGlass className={styles.searchIcon} />
						<input type="search" className={styles.searchInput} placeholder="Search" />
					</div>

					<Link to="/notifications" className={styles.link}>
						<IconButton>
							<Badge
								badgeContent={unreadCount}
								color="error"
								invisible={unreadCount === 0}>
								<NotificationsRounded sx={{ fontSize: 36 }} />
							</Badge>
						</IconButton>
					</Link>

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
							const x = event.clientX - rect.left;
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
						<SessionTable data={data} />
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
					</div>
				</div>

				<div className={styles.PerformanceTipsWindow}>
					<h1>Performance Tips</h1>
					<ul>
						<li>
							<h3>Hydrate</h3>
							<p>Staying hydrated is essential for mental and physical performance.</p>
							<p><strong>Tip:</strong> Aim to drink water regularly throughout the day.</p>
						</li>
						<li>
							<h3>Be Consistent</h3>
							<p>Consistency is key to long-term performance.</p>
							<p><strong>Tip:</strong> Create habits you can stick to daily.</p>
						</li>
						<li>
							<h3>Set Goals</h3>
							<p>Clear goals give direction and motivation.</p>
							<p><strong>Tip:</strong> Break larger goals into smaller tasks.</p>
						</li>
						<li>
							<h3>Have a Motive</h3>
							<p>Understanding your "why" enhances commitment.</p>
							<p><strong>Tip:</strong> Write down personal motivations for reference.</p>
						</li>
						<li>
							<h3>Prioritize Sleep</h3>
							<p>Sleep is essential for cognitive function and productivity.</p>
							<p><strong>Tip:</strong> Aim for 7–9 hours of sleep and a good bedtime routine.</p>
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
};

export default DashboardLanding;
