import React, { useState } from 'react';
import styles from '../../routes/ReportPage/ReportPage.module.css';
import ProfilePic from '../../assets/ProfilePic.png'; // Import profile picture
import SessionTable from '../SessionsTable/SessionsTable';
import data from '../SessionsTable/SessionsTable.json';
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FavoriteBorderRounded, MonitorHeartRounded, FitnessCenterRounded, StackedLineChartRounded, BoltRounded, StairsRounded, DirectionsWalkRounded, AirlineSeatFlatAngledRounded } from '@mui/icons-material';

// Mock data
const mockData = {
	heartRate: 102,
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

	const [selectedRecord] = useState(records[0]);

	// Example of using the state
	console.log(selectedRecord);

	// Handle record selection

	const theme = createTheme({
		components: {
			MuiIconButton: {
				styleOverrides: {
					root: {
						color: 'black',
					},
				},
			},
		},
		typography: {
			fontFamily: '\'Roboto\', sans-serif',
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
								<Card sx={{ backgroundColor: '#e97462', color: 'black', textAlign: 'center' }}>
									<CardContent sx={{ position: 'relative', textAlign: 'center' }}>
										<Typography variant="h4">Heart Rate</Typography>
										<Box sx={{ position: 'relative', display: 'inline-flex' }}>
											<CircularProgress
												variant="determinate"
												value={(mockData.heartRate / 220) * 100}
												size={100}
												thickness={4}
												sx={{
													color:
														mockData.heartRate >= 150
															? 'red'
															: mockData.heartRate >= 100
																? 'yellow'
																: mockData.heartRate >= 60
																	? 'green'
																	: 'blue',
													margin: '12px'
												}}
											/>
											<Box
												sx={{
													position: 'absolute',
													top: '50%',
													left: '50%',
													transform: 'translate(-50%, -50%)',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<FavoriteBorderRounded sx={{
													color: mockData.heartRate >= 150 ? 'red'
														: mockData.heartRate >= 100 ? 'yellow'
															: mockData.heartRate >= 60 ? 'green'
																: 'blue',
													fontSize: 30
												}} />
											</Box>
										</Box>
										<Typography variant="h4" sx={{ marginTop: '10px' }}>
											{mockData.heartRate} bpm
										</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Card sx={{ backgroundColor: '#e97462', color: 'black', textAlign: 'center' }}>
									<CardContent>
										<Typography variant="h4">Zone Minutes</Typography>
										<Box sx={{ position: 'relative', display: 'inline-flex' }}>
											<CircularProgress
												variant="determinate"
												value={(mockData.heartRate / 150) * 100}
												size={100}
												thickness={4}
												sx={{
													color: 'black',
													margin: '12px'
												}}
											/>
											<Box
												sx={{
													position: 'absolute',
													top: '50%',
													left: '50%',
													transform: 'translate(-50%, -50%)',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<MonitorHeartRounded sx={{
													color: 'black',
													fontSize: 30
												}} />
											</Box>
										</Box>
										<Typography variant="h4" sx={{ marginTop: '10px' }}>
											{mockData.zoneMinutes} mins
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						{/* Exercise Days */}
						<Box sx={{ marginTop: '20px' }}>
							<Card sx={{ backgroundColor: '#e97462', color: 'black' }}>
								<CardContent>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<FitnessCenterRounded sx={{ fontSize: 30, marginRight: '12px', color: 'black' }} />
										<Box>
											<Typography variant="h5">Exercise Days</Typography>
											<Typography variant="body1">{mockData.exerciseDays} of 5 this week</Typography>
										</Box>
									</Box>
								</CardContent>
							</Card>
						</Box>

						{/* Stats (Distance, Calories, Floors) */}
						<Grid container spacing={2} sx={{ marginTop: '20px' }}>
							<Grid item xs={6}>
								<Card sx={{ backgroundColor: '#e97462', color: 'black' }}>
									<CardContent>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<StackedLineChartRounded sx={{ fontSize: 30, marginRight: '12px', color: 'black' }} />
											<Box>
												<Typography variant="h5">Distance</Typography>
												<Typography variant="h4">{mockData.distance} mi</Typography>
											</Box>
										</Box>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={6}>
								<Card sx={{ backgroundColor: '#e97462', color: 'black' }}>
									<CardContent>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<BoltRounded sx={{ fontSize: 30, marginRight: '12px', color: 'black' }} />
											<Box>
												<Typography variant="h5">Calories</Typography>
												<Typography variant="h4">{mockData.calories}</Typography>
											</Box>
										</Box>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						<Grid container spacing={2} sx={{ marginTop: '20px' }}>
							<Grid item xs={6}>
								<Card sx={{ backgroundColor: '#e97462', color: 'black' }}>
									<CardContent>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<DirectionsWalkRounded sx={{ fontSize: 30, marginRight: '12px', color: 'black' }} />
											<Box>
												<Typography variant="h5">Steps</Typography>
												<Typography variant="h4">{mockData.steps}</Typography>
											</Box>
										</Box>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={6}>
								<Card sx={{ backgroundColor: '#e97462', color: 'black' }}>
									<CardContent>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<StairsRounded sx={{ fontSize: 30, marginRight: '12px', color: 'black' }} />
											<Box>
												<Typography variant="h5">Floors</Typography>
												<Typography variant="h4">{mockData.floors}</Typography>
											</Box>
										</Box>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						{/* Sleep Duration */}
						<Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
							<Card sx={{ backgroundColor: '#e97462', color: 'black' }}>
								<CardContent>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<AirlineSeatFlatAngledRounded sx={{ fontSize: 30, marginRight: '12px', color: 'black' }} />
										<Box>
											<Typography variant="h5">Sleep Duration</Typography>
											<Typography variant="h4">{mockData.sleepDuration}</Typography>
										</Box>
									</Box>
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