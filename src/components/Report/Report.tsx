import React, { useState } from 'react';
import styles from '../../routes/ReportPage/ReportPage.module.css';
import ProfilePic from '../../assets/ProfilePic.png'; // Import profile picture
import SessionTable from '../SessionsTable/SessionsTable';
import data from '../SessionsTable/SessionsTable.json';
import notificationsData from '../Notifications/DummyNotifications.json';
import { Card, CardContent, Typography, Grid, CircularProgress, Box, IconButton, Badge } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { NotificationsRounded, FavoriteBorderRounded, MonitorHeartRounded, FitnessCenterRounded, StackedLineChartRounded, BoltRounded, StairsRounded, DirectionsWalkRounded, AirlineSeatFlatAngledRounded } from '@mui/icons-material';

interface RecordType {
	id: number;
	coach: string;
	duration: string;
	date: string;
	typeOfTraining: string;
	heartRate: number;
	zoneMinutes: number;
	exerciseDays: number;
	distance: number;
	calories: number;
	floors: number;
	sleepDuration: string;
	steps: number;
	activeZoneMinutes: number;
}

const DashboardLanding: React.FC = () => {

	// Sample data for notifications
	const unreadCount = notificationsData.filter(n => n.status === 'unread').length;

	// State for selected session data
	const [selectedData, setSelectedData] = useState<RecordType>(data[0]);

	// Handle record selection from the table
	const handleRecordClick = (record: RecordType) => {
		setSelectedData(record);
	};

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
						padding: '20px',
						minHeight: '100vh',
						width: '100%'
					}}>

						<div className={styles.topBar}>
							<h1 className={styles.dashboardTitle}>Activity Tracker</h1>
							<Link to="/notifications" className={styles.link}>
								<IconButton>
									<Badge
										badgeContent={unreadCount}
										color="error"
										invisible={unreadCount === 0} >
										<NotificationsRounded sx={{ fontSize: 36 }} />
									</Badge>
								</IconButton>
							</Link>
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
												value={(selectedData.heartRate / 220) * 100}
												size={100}
												thickness={4}
												sx={{
													color:
														selectedData.heartRate >= 150
															? 'red'
															: selectedData.heartRate >= 100
																? 'yellow'
																: selectedData.heartRate >= 60
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
													color: selectedData.heartRate >= 150 ? 'red'
														: selectedData.heartRate >= 100 ? 'yellow'
															: selectedData.heartRate >= 60 ? 'green'
																: 'blue',
													fontSize: 30
												}} />
											</Box>
										</Box>
										<Typography variant="h4" sx={{ marginTop: '10px' }}>
											{selectedData.heartRate} bpm
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
												value={(selectedData.heartRate / 150) * 100}
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
											{selectedData.zoneMinutes} mins
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
											<Typography variant="body1">{selectedData.exerciseDays} of 5 this week</Typography>
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
												<Typography variant="h4">{selectedData.distance} mi</Typography>
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
												<Typography variant="h4">{selectedData.calories}</Typography>
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
												<Typography variant="h4">{selectedData.steps}</Typography>
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
												<Typography variant="h4">{selectedData.floors}</Typography>
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
											<Typography variant="h4">{selectedData.sleepDuration}</Typography>
										</Box>
									</Box>
								</CardContent>
							</Card>
						</Box>

						<div className={styles.heartRateCalSection}>
							<div className={styles.SessionsProfileWindow}>
								<h1>Your Sessions</h1>
								<SessionTable data={data} onRowClick={handleRecordClick} />
							</div>
						</div>
					</Box>
				</ThemeProvider>
			</div>
		</main>
	);
};

export default DashboardLanding;