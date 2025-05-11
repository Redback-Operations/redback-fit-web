import React, { useState } from 'react';
import styles from '../../routes/NotificationsPage/NotificationsPage.module.css';
import ProfilePic from '../../assets/ProfilePic.png'; // Import profile picture
import data from './DummyNotifications.json';
import { Card, CardContent, Typography, Box, Button, List, ListItem, ListItemText, Badge } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Notifications: React.FC = () => {
	const [notifications, setNotifications] = useState(data);

	// Mark a notification as read
	const markAsRead = (id: number) => {
		setNotifications((prev) =>
			prev.map((notification) =>
				notification.id === id ? { ...notification, status: 'read' } : notification
			)
		);
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
						width: '100%',
						boxSizing: 'border-box',
					}}>

						<div className={styles.topBar}>
							<h1 className={styles.dashboardTitle}>Notifications</h1>
							<div className={styles.profileIcon} style={{ backgroundImage: `url(${ProfilePic})` }}></div>
						</div>

						<div className={styles.mainList}>
							<List sx={{ width: '100%' }}>
								{notifications.map((notification) => (
									<ListItem key={notification.id}>
										<Card sx={{
											width: '100%',
											backgroundColor: notification.status === 'unread' ? '#e97462' : 'lightgray',
											color: 'black'
										}}>
											<CardContent>
												<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
													<ListItemText
														primary={notification.message}
														secondary={notification.timestamp}
														sx={{
															color: notification.status === 'unread' ? 'black' : 'gray',
														}}
													/>
													{notification.status === 'unread' && (
														<Badge color="primary" variant="dot" sx={{ marginRight: '10px' }} />
													)}
													<Button
														variant="contained"
														color="primary"
														size="small"
														onClick={() => markAsRead(notification.id)}
														disabled={notification.status === 'read'}
														sx={{ width: '30%' }}
													>
														Mark as Read
													</Button>
												</Box>
											</CardContent>
										</Card>
									</ListItem>
								))}
							</List>
						</div>
					</Box>
				</ThemeProvider>
			</div>
		</main>
	);
};

export default Notifications;