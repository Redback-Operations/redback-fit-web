import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { HiBell } from 'react-icons/hi';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from '../../routes/Report/Report.module.css';
import ProfilePic from '../../assets/ProfilePic.png'; // Import profile picture
import SessionTable from '../SessionsTable/SessionsTable';
import data from '../SessionsTable/sessionData.json';
import { Gauge } from '@mui/x-charts-pro';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import RadarChart from '../RadarChart/RadarChart';  // Adjust the path as needed
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


interface RecordType {
	id: number;
	heartRate: number;
	zoneMin: number;
	exerciseDays: number;
	sleepDuration: string;
	steps: number;
	distance: string;
	energyBurned: string;
}

// Mock data
const mockData = {
	heartRate: 79,
	zoneMinutes: 122,
	exerciseDays: 2,
	distance: 1.91,
	calories: 1653,
	floors: 0,
	sleepDuration: '6h 58m',
	steps: 4770,
	activeZoneMinutes: 122,
};

const records = [
	{
		id: 1,
		heartRate: 79,
		zoneMin: 122,
		exerciseDays: 2,
		sleepDuration: '6h 58m',
		steps: 4770,
		distance: '1.91 mi',
		energyBurned: '1653 cal',
	},
	{
		id: 2,
		heartRate: 85,
		zoneMin: 140,
		exerciseDays: 3,
		sleepDuration: '7h 10m',
		steps: 5250,
		distance: '2.5 mi',
		energyBurned: '1800 cal',
	},
	{
		id: 3,
		heartRate: 70,
		zoneMin: 100,
		exerciseDays: 1,
		sleepDuration: '5h 45m',
		steps: 4000,
		distance: '1.2 mi',
		energyBurned: '1500 cal',
	},
];

const DashboardLanding: React.FC = () => {
	// State for selected data
	const [selectedData, setSelectedData] = useState(records[0]);

	// Handle record selection
	const handleRecordClick = (record: RecordType) => {
		setSelectedData(record);
	};

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
		typography: {
			fontFamily: "'Roboto', sans-serif",
		},
		palette: {
			primary: {
				main: '#4caf50',
			},
			secondary: {
				main: '#03a9f4',
			},
		},
	});

	return (
		<main className={styles.mainContainerLanding}>
			<div>
				<ThemeProvider theme={theme}>
					<Box sx={{
						height: '100vh', // Full viewport height
						overflowY: 'auto', // Enable vertical scrolling 
						padding: '20px',
						minHeight: '100vh',
						width: '100%'
					}}>

						<div className={styles.topBar}>
							<h1 className={styles.dashboardTitle}>Activity Tracker</h1>
							<div className={styles.profileIcon} style={{ backgroundImage: `url(${ProfilePic})` }}></div>
						</div>

						{/* Heart Rate and Zone Minutes */}
						<Grid container spacing={2} alignItems="center" justifyContent="center">
							<Grid item xs={12} sm={6}>
								<Card sx={{ backgroundColor: '#2E3944', color: 'white', textAlign: 'center' }}>
									<CardContent>
										<Typography variant="h6">Heart Rate</Typography>
										<CircularProgress
											variant="determinate"
											value={mockData.heartRate}
											size={100}
											thickness={4}
											color="secondary"
										/>
										<Typography variant="h4" sx={{ marginTop: '10px' }}>
											{mockData.heartRate} bpm
										</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Card sx={{ backgroundColor: '#2E3944', color: 'white', textAlign: 'center' }}>
									<CardContent>
										<Typography variant="h6">Zone Minutes</Typography>
										<CircularProgress
											variant="determinate"
											value={(mockData.zoneMinutes / 150) * 100}
											size={100}
											thickness={4}
											color="primary"
										/>
										<Typography variant="h4" sx={{ marginTop: '10px' }}>
											{mockData.zoneMinutes} mins
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						{/* Exercise Days */}
						<Box sx={{ marginTop: '20px' }}>
							<Card sx={{ backgroundColor: '#2E3944', color: 'white' }}>
								<CardContent>
									<Typography variant="h6">Exercise Days</Typography>
									<Typography variant="body1">{mockData.exerciseDays} of 5 this week</Typography>
								</CardContent>
							</Card>
						</Box>

						{/* Stats (Distance, Calories, Floors) */}
						<Grid container spacing={2} sx={{ marginTop: '20px' }}>
							<Grid item xs={6}>
								<Card sx={{ backgroundColor: '#2E3944', color: 'white' }}>
									<CardContent>
										<Typography variant="h6">Distance</Typography>
										<Typography variant="h4">{mockData.distance} mi</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={6}>
								<Card sx={{ backgroundColor: '#2E3944', color: 'white' }}>
									<CardContent>
										<Typography variant="h6">Calories</Typography>
										<Typography variant="h4">{mockData.calories}</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						<Grid container spacing={2} sx={{ marginTop: '20px' }}>
							<Grid item xs={6}>
								<Card sx={{ backgroundColor: '#2E3944', color: 'white' }}>
									<CardContent>
										<Typography variant="h6">Steps</Typography>
										<Typography variant="h4">{mockData.steps}</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={6}>
								<Card sx={{ backgroundColor: '#2E3944', color: 'white' }}>
									<CardContent>
										<Typography variant="h6">Floors</Typography>
										<Typography variant="h4">{mockData.floors}</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						{/* Sleep Duration */}
						<Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
							<Card sx={{ backgroundColor: '#2E3944', color: 'white' }}>
								<CardContent>
									<Typography variant="h6">Sleep Duration</Typography>
									<Typography variant="h4">{mockData.sleepDuration}</Typography>
								</CardContent>
							</Card>
						</Box>

						<div className={styles.heartRateCalSection}>
							<div className={styles.SessionsProfileWindow}>
								<h1>Your Sessions</h1>
								<SessionTable data={data}>
								</SessionTable>
							</div>
						</div>
					</Box>
				</ThemeProvider>
			</div>
		</main>
	);
};

export default DashboardLanding;