import React, { useState } from 'react';
import styles from './WeeklySummary.module.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type DayData = {
	day: string;
	time: number;
	distance: number;
	speed: number;
};

type WeekData = {
	thisWeek: DayData[];
	lastWeek: DayData[];
};

const weekData: WeekData = {
	thisWeek: [
		{ day: 'Mon', time: 40, distance: 6, speed: 9 },
		{ day: 'Tue', time: 30, distance: 5, speed: 10 },
		{ day: 'Wed', time: 35, distance: 6.5, speed: 9.5 },
		{ day: 'Thu', time: 25, distance: 4.2, speed: 8.2 },
		{ day: 'Fri', time: 45, distance: 7.1, speed: 10.5 },
		{ day: 'Sat', time: 50, distance: 8.3, speed: 11 },
		{ day: 'Sun', time: 20, distance: 3.3, speed: 7.5 },
	],
	lastWeek: [
		{ day: 'Mon', time: 30, distance: 4, speed: 8 },
		{ day: 'Tue', time: 20, distance: 3, speed: 7.5 },
		{ day: 'Wed', time: 25, distance: 4.5, speed: 8.5 },
		{ day: 'Thu', time: 35, distance: 6, speed: 9 },
		{ day: 'Fri', time: 40, distance: 6.5, speed: 9.2 },
		{ day: 'Sat', time: 30, distance: 5, speed: 9 },
		{ day: 'Sun', time: 15, distance: 2, speed: 6.5 },
	],
};

const WeeklySummary = () => {
	const [selectedWeek, setSelectedWeek] = useState<keyof WeekData>('thisWeek');

	const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedWeek(event.target.value as keyof WeekData);
	};

	const totalTrainingTime = weekData[selectedWeek].reduce((sum, day) => sum + day.time, 0);
	const totalDistance = weekData[selectedWeek].reduce((sum, day) => sum + day.distance, 0);
	const averageSpeed = (
		weekData[selectedWeek].reduce((sum, day) => sum + day.speed, 0) /
		weekData[selectedWeek].length
	).toFixed(2);
	const bestSpeed = Math.max(...weekData[selectedWeek].map((d) => d.speed));

	const lastWeekKey = selectedWeek === 'thisWeek' ? 'lastWeek' : 'thisWeek';
	const lastWeekTime = weekData[lastWeekKey].reduce((sum, d) => sum + d.time, 0);
	const timeDifference = totalTrainingTime - lastWeekTime;
	const timePercentageChange = ((timeDifference / lastWeekTime) * 100).toFixed(1);

	const chartData = {
		labels: weekData[selectedWeek].map((entry) => entry.day),
		datasets: [
			{
				label: 'Training Time (minutes)',
				data: weekData[selectedWeek].map((entry) => entry.time),
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				fill: true,
				tension: 0.4,
			},
			{
				label: 'Distance (km)',
				data: weekData[selectedWeek].map((entry) => entry.distance),
				borderColor: 'rgba(153, 102, 255, 1)',
				backgroundColor: 'rgba(153, 102, 255, 0.2)',
				fill: true,
				tension: 0.4,
			},
		],
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Weekly Summary</h2>

			<div className={styles.weekSelector}>
				<label>Select Week: </label>
				<select onChange={handleWeekChange} value={selectedWeek} className={styles.weekSelectorSelect}>
					<option value="thisWeek">This Week</option>
					<option value="lastWeek">Last Week</option>
				</select>
			</div>

			<div className={styles.cards}>
				<div className={styles.card}>
					<h3>Total Training Time</h3>
					<p>{totalTrainingTime} minutes</p>
				</div>
				<div className={styles.card}>
					<h3>Total Distance</h3>
					<p>{totalDistance} km</p>
				</div>
				<div className={styles.card}>
					<h3>Average Speed</h3>
					<p>{averageSpeed} km/h</p>
				</div>
				<div className={styles.card}>
					<h3>Best Speed</h3>
					<p>{bestSpeed} km/h</p>
				</div>
			</div>

			<div className={styles.comparison}>
				{timeDifference >= 0 ? (
					<p>📈 You trained {Math.abs(parseFloat(timePercentageChange))}% more than last week. Keep it up! 🎉</p>
				) : (
					<p>📉 You trained {Math.abs(parseFloat(timePercentageChange))}% less than last week. Let’s get back on track! 💪</p>
				)}
			</div>

			<div className={styles.chartSection}>
				<h3>Training Progress</h3>
				<Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
			</div>

			<div className={styles.tableSection}>
				<h3>Daily Breakdown</h3>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Day</th>
							<th>Time (min)</th>
							<th>Distance (km)</th>
							<th>Speed (km/h)</th>
						</tr>
					</thead>
					<tbody>
						{weekData[selectedWeek].map((entry, index) => (
							<tr key={index}>
								<td>{entry.day}</td>
								<td>{entry.time}</td>
								<td>{entry.distance}</td>
								<td>{entry.speed}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default WeeklySummary;
