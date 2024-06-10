import React, { useState, useCallback, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import styles from '../../routes/Dashboard/Dashboard.module.css';
import { FaFileAlt } from 'react-icons/fa';


type DataType = { [key: string]: ReactNode };

const DashboardDataPredictions: React.FC = () => {
	const [data, setData] = useState<DataType[]>([]);
	const [fileLoaded, setFileLoaded] = useState<boolean>(false);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader();
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onload = (e) => {
				const { result } = e.target!;
				const workbook = XLSX.read(result, { type: 'binary' });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = XLSX.utils.sheet_to_json(worksheet) as DataType[]; // Explicitly cast to DataType[]
				setData(json);
				setFileLoaded(true); // Set the file loaded state to true
			};
			reader.readAsBinaryString(file);
		});
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'text/csv': ['.csv'],
			'application/vnd.ms-excel': ['.xls'],
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
		}
	});

	const resetInput = () => {
		setFileLoaded(false); // Allow users to drop a new file
		setData([]); // Clear the existing data
	};

	const renderTable = () => (
		<div className={styles.filePreview}>
			<table>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							{Object.keys(row).map((cell, idx) => (
								<td key={idx}>{row[cell]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	return (
		<div className={styles.mainContainer}>
			<h1 className={styles.chartTitle}>Data & Predictions</h1>
			<div className={styles.topSection}>
				<p>Power Curve Data</p>
				<div className={styles.chartPlaceholder}>Interactive chart / Ojasvi's Power Curve Data will go here</div>
			</div>
			<div className={styles.bottomSection}>
				{!fileLoaded ? (
					<div {...getRootProps()} className={styles.dragDropArea}>
						<input {...getInputProps()} />
						<p>Drag or click to select files:</p>
						<p>(.csv, .xls, .xlsx)</p>
						<FaFileAlt size={50} color="#FF3465" style={{ marginTop: '20px' }} />
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
