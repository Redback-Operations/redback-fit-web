import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import styles from '../../routes/Dashboard/Dashboard.module.css';

interface DataItem {
  name: string;
  test1: number;
  test2: number;
  amt: number;
}

// Random data

const DashboardLanding: React.FC = () => {
	const data: DataItem[] = [
		{ name: 'Test 1', test1: 4000, test2: 2400, amt: 2400 },
		{ name: 'Test 2', test1: 3000, test2: 1398, amt: 2210 },
		{ name: 'Test 3', test1: 2000, test2: 9800, amt: 2290 },
		{ name: 'Test 4', test1: 2780, test2: 3908, amt: 2000 },
		{ name: 'Test 5', test1: 1890, test2: 4800, amt: 2181 },
		{ name: 'Test 6', test1: 2390, test2: 3800, amt: 2500 },
		{ name: 'Test 7', test1: 3490, test2: 4300, amt: 2100 }
	];

	const powerCurveData = [
		{ name: 'Point 1', value: 300 },
		{ name: 'Point 2', value: 600 },
		{ name: 'Point 3', value: 800 },
		{ name: 'Point 4', value: 1500 },
		{ name: 'Point 5', value: 1200 },
		{ name: 'Point 6', value: 1600 }
	];

	return (
		<main className={styles.mainContainer}>
			<div className={styles.chartTitle}>
				<h3>POWER CURVE (Dummy data, can ignore)</h3>
				<ResponsiveContainer width="80%" height={300} aspect={2}>
					<LineChart data={powerCurveData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="value" stroke="#ffffff" />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className={styles.chartTitle}>
				<h3>DASHBOARD</h3>
			</div>
			<div className={styles.charts}>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="test1" fill="#FF3465" />
						<Bar dataKey="test2" fill="#ffffff" />
					</BarChart>
				</ResponsiveContainer>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="test1" stroke="#FF3465" activeDot={{ r: 8 }} />
						<Line type="monotone" dataKey="test2" stroke="#ffffff" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</main>
	);
};

export default DashboardLanding;
