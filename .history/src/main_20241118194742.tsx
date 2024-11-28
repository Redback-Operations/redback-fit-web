import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root/Root.tsx';
import LoginPage from './routes/LoginPage/LoginPage.tsx';
import Dashboard from './routes/Dashboard/Dashboard.tsx';
import HomePage from './routes/HomePage/HomePage.tsx';
import DataPredictions from './components/DashboardDataPredictions/DashboardDataPredictions.tsx';
import DashboardLanding from './components/DashboardLanding/DashboardLanding.tsx';
import Categories from './components/Categories/Categories.tsx';

const router = createBrowserRouter([
	{
		element: <Root />,
		errorElement: <Root />,
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'dashboard',
				element: <Dashboard />,
				children: [
					{
						path: '',
						element: <DashboardLanding />,
					},
					{
						path: 'data-predictions',
						element: <DataPredictions />,
					},
					{
						path: 'categories',
						element: <Categories />
					}
				]
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
