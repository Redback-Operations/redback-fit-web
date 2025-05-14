import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import styles from '../../routes/Dashboard/Dashboard.module.css';
import { FaFileAlt } from 'react-icons/fa';
import { useUserSettings } from "../../context/UserSettingsContext.tsx";
import UnitSettingsPanel from "../UnitSettingsPanel/UnitSettingsPanel.tsx";


// Please note this is simply a testing page.


// Define DataType as an object with string keys and unknown values
type DataType = { [key: string]: unknown };

const DashboardDataPredictions: React.FC = () => {
	const [data, setData] = useState<DataType[]>([]);
	const [fileLoaded, setFileLoaded] = useState<boolean>(false);
	const [powerCurveData, setPowerCurveData] = useState<string | null>(null); // Use string | null instead of any
	const [activityType, setActivityType] = useState<string>('Ride');
	const [date, setDate] = useState<string>('2022-01-01');
	const [numDays, setNumDays] = useState<number>(5);
	const [testedFTP, setTestedFTP] = useState<number>(0);
	const { settings } = useUserSettings();


	// Handle file drop
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onload = (e) => {
				const result = e.target?.result;
				if (typeof result === 'string') {
					const workbook = XLSX.read(result, { type: 'binary' });
					const sheetName = workbook.SheetNames[0];
					const worksheet = workbook.Sheets[sheetName];
					const json = XLSX.utils.sheet_to_json(worksheet) as DataType[]; // Explicitly cast to DataType[]
					setData(json);
					setFileLoaded(true); // Set the file loaded state to true
				}
			};
			reader.readAsBinaryString(file);
		});
	}, []);

	// Configure file drop zone
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'text/csv': ['.csv'],
			'application/vnd.ms-excel': ['.xls'],
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
		},
	});

	// Reset file input and data
	const resetInput = () => {
		setFileLoaded(false);
		setData([]);
	};

	// Fetch power curve data
	const fetchPowerCurveData = () => {
		fetch('http://localhost:5000/calculate-power-curve', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				activityType,
				date,
				numDays,
				testedFTP,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.imageUrl) {
					setPowerCurveData(data.imageUrl);
				}
				else {
					console.error('Error fetching power curve data:', data);
				}
			})
			.catch((error) => console.error('Error fetching power curve data:', error));
	};

	// Render table for file data
	const renderTable = () => (
		<div className={styles.filePreview}>
			<table>
				<thead>
					<tr>
						{data.length > 0 &&
							Object.keys(data[0]).map((key, idx) => (
								<th key={idx}>{key}</th>
							))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							{Object.keys(row).map((cell, idx) => (
								<td key={idx}>
								{(() => {
								  const value = row[cell];
							  
								  if (typeof value === "number") {
									const lowerCell = cell.toLowerCase();
							  
									// Convert distance
									if (
										lowerCell.includes("distance") ||
										lowerCell.includes("km") ||
										lowerCell.includes("kilometer") ||
										lowerCell.includes("meters") ||
										lowerCell.includes("meter") 
									) {
										
										let distance = value;

										if (lowerCell.includes("meter") && value < 10000) {
											distance = value / 1000;
										}

										if (settings.distanceUnit === "m") {
											return `${(distance * 1000).toFixed(0)} m`; 
										}

									  	if (settings.distanceUnit === "mi") {
											return `${(distance * 0.621371).toFixed(2)} mi`;
										}

										return `${distance.toFixed(2)} km`;
									}
							  
									// Convert time
									if (lowerCell.includes("duration") || lowerCell.includes("time")) {
									  if (settings.timeUnit === "hr:min") {
										const hours = Math.floor(value / 60);
										const minutes = Math.round(value % 60);
										return `${hours}h ${minutes}m`;
									  } else {
										return `${value} min`;
									  }
									}
								  }
							  
								  // Default (no conversion)
								  return String(value);
								})()}
							  </td>
							  
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	return (
		<div className={styles.mainContainerDataPred}>

			<h1 className={styles.chartTitle}>Data & Predictions</h1>
			<div className={styles.topSection}>
				<p>Power Curve Data (Test Component for Old Backend)</p>
				{powerCurveData ? (
					<div className={styles.chartPlaceholder}>
						<img src={powerCurveData} alt="Power Curve Data" />
					</div>
				) : (
					<div className={styles.formContainer}>
						<label className={styles.formLabel}>
							Activity Type:
							<select
								value={activityType}
								onChange={(e) => setActivityType(e.target.value)}
								className={styles.formSelect}
							>
								<option value="Ride">Ride</option>
								<option value="Run">Run</option>
							</select>
						</label>
						<label className={styles.formLabel}>
							Start Date:
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className={styles.formInput}
							/>
						</label>
						<label className={styles.formLabel}>
							Number of Days:
							<input
								type="number"
								value={numDays}
								onChange={(e) => setNumDays(Number(e.target.value))}
								className={styles.formInput}
							/>
						</label>
						<label className={styles.formLabel}>
							Tested FTP:
							<input
								type="number"
								value={testedFTP}
								onChange={(e) => setTestedFTP(Number(e.target.value))}
								className={styles.formInput}
							/>
						</label>
						<button onClick={fetchPowerCurveData} className={styles.formButton}>
							Fetch Data
						</button>
					</div>
				)}
			</div>

			<UnitSettingsPanel />

			<div className={styles.bottomSection}>
				{!fileLoaded ? (
					<div {...getRootProps()} className={styles.dragDropArea}>
						<input {...getInputProps()} />
						<p>Drag or click to select files:</p>
						<p>(.csv, .xls, .xlsx)</p>
						<FaFileAlt size={50} color="#e97462" style={{ marginTop: '20px' }} />
					</div>
				) : (
					<div>
						<button onClick={resetInput} className={styles.resetButton}>
							Replace File
						</button>
						{renderTable()}
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardDataPredictions;