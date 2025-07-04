import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/Root/Root.tsx';
import LoginPage from './routes/LoginPage/LoginPage.tsx';
import Dashboard from './routes/Dashboard/Dashboard.tsx';
import ReportPage from './routes/ReportPage/ReportPage.tsx';
import NotificationsPage from './routes/NotificationsPage/NotificationsPage.tsx';
import HomePage from './routes/HomePage/HomePage.tsx';

import DataPredictions from './components/DashboardDataPredictions/DashboardDataPredictions.tsx';
import DashboardLanding from './components/DashboardLanding/DashboardLanding.tsx';
import ProfilePage from './routes/ProfilePage/ProfilePage';
import Categories from './components/Categories/Categories.tsx';
import ReportPageContent from './components/Report/Report.tsx';
import NotificationsPageContent from './components/Notifications/Notifications.tsx';
import Features from './components/Features/Features.tsx';
import SettingsPage from './components/Settings/Settings.tsx';
import Goals from './components/Goals/Goals.tsx';

import CustomNotification from './components/CustomNotification/CustomNotification.tsx';
import WeeklySummary from './components/WeeklySummary/WeeklySummary.tsx';
import MyFriendsPage from './components/FriendRequest/MyFriendsPage'; 
import RecoveryTracker from './components/RecoveryTracker/RecoveryTracker.tsx';

const router = createBrowserRouter([
	{
		element: <Root />,
		errorElement: <Root />,
		children: [
			{ path: '/', element: <HomePage /> },
			{ path: 'login', element: <LoginPage /> },
			{ path: 'profile', element: <ProfilePage /> },
			{
				path: 'dashboard',
				element: <Dashboard />,
				children: [
					{ path: '', element: <DashboardLanding /> },
					{ path: 'data-predictions', element: <DataPredictions /> },
					{ path: 'categories', element: <Categories /> },
					{ path: 'features', element: <Features /> },
					{ path: 'goals', element: <Goals /> },
					{ path: 'custom-notification', element: <CustomNotification /> },
					{ path: 'settings', element: <SettingsPage /> },
					{ path: 'recovery-tracker', element: <RecoveryTracker /> },
					{ path: 'weekly-summary', element: <WeeklySummary /> },
					{ path: 'my-friends', element: <MyFriendsPage /> },
				],
			},
			{
				path: 'reports',
				element: <ReportPage />,
				children: [
					{ path: '', element: <ReportPageContent /> },
					{ path: 'data-predictions', element: <DataPredictions /> },
				],
			},
			{
				path: 'notifications',
				element: <NotificationsPage />,
				children: [
					{ path: '', element: <NotificationsPageContent /> },
				],
			},
		],
	},
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
