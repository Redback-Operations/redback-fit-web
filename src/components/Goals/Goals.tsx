import React, { useState } from 'react';

// Define the type for the form data
interface FormData {
    startDate: string;
    endDate: string;
    steps: string;
    minutes: string;
    cyclingMinutes: string;
    swimmingMinutes: string;
    exerciseMinutes: string;
    calories: string;
}

const GoalsPage = () => {
	const [formData, setFormData] = useState<FormData>({
		startDate: '',
		endDate: '',
		steps: '',
		minutes: '',
		cyclingMinutes: '',
		swimmingMinutes: '',
		exerciseMinutes: '',
		calories: '',
	});

	const [submittedData, setSubmittedData] = useState<FormData | null>(null);
	const [isFormValid, setIsFormValid] = useState(true);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (new Date(formData.endDate) < new Date(formData.startDate)) {
			setIsFormValid(false);
			return; // Prevent form submission if endDate is before startDate
		}
		const fieldsExceedMaxLength =
            formData.steps.length > 6 ||
            formData.minutes.length > 6 ||
            formData.cyclingMinutes.length > 6 ||
            formData.swimmingMinutes.length > 6 ||
            formData.exerciseMinutes.length > 6 ||
            formData.calories.length > 6;

		if (fieldsExceedMaxLength) {
			setIsFormValid(false);
			return; // Prevent form submission if any field exceeds maxLength
		}
		if (!formData.startDate || !formData.endDate) {
			setIsFormValid(false);
			return;
		}
		setIsFormValid(true);
		setIsFormSubmitted(true);
		setSubmittedData(formData);
		console.log('Submitted Goals:', formData);
	};

	return (
		<div style={styles.container}>
			<div style={styles.formContainer}>
				{!isFormSubmitted && (
					<>
						<h1 style={styles.heading}>Set Your Goals</h1>
						<div style={styles.explanationSection}>
							<p style={styles.explanationText}>
                                Welcome to your fitness goals tracker! This page allows you to set personalized fitness goals for a specific date range. Start by selecting your start and end dates. Once you've chosen your timeframe, fill in your targets for various physical activities. If this is your first time setting goals, aim high but remain realistic. Once you've entered your targets, click the 'Submit Goals' button to save them. After submission, you'll be able to view a summary of your goals.
							</p>
						</div>
					</>
				)}


				{!isFormSubmitted && (
					<form onSubmit={handleSubmit}>
						{/* Date Section */}
						<div style={styles.dateSection}>
							<div style={styles.field}>
								<label style={styles.label}>Start Date:</label>
								<input
									type="date"
									name="startDate"
									value={formData.startDate}
									onChange={handleChange}
									style={styles.input}
								/>
							</div>
							<div style={styles.field}>
								<label style={styles.label}>End Date:</label>
								<input
									type="date"
									name="endDate"
									value={formData.endDate}
									onChange={handleChange}
									style={styles.input}
								/>
							</div>
						</div>

						{/* Goals */}
						<div style={styles.field}>
							<label style={styles.label}>Steps:</label>
							<div style={styles.inputWrapper}>
								<input
									type="number"
									name="steps"
									value={formData.steps}
									onChange={handleChange}
									style={styles.input}
									placeholder="Enter steps goal"
								/>
							</div>
						</div>

						<div style={styles.field}>
							<label style={styles.label}>Minutes (Running):</label>
							<div style={styles.inputWrapper}>
								<input
									type="number"
									name="minutes"
									value={formData.minutes}
									onChange={handleChange}
									style={styles.input}
									placeholder="Enter running minutes goal"
								/>
							</div>
						</div>

						<div style={styles.field}>
							<label style={styles.label}>Minutes (Cycling):</label>
							<div style={styles.inputWrapper}>
								<input
									type="number"
									name="cyclingMinutes"
									value={formData.cyclingMinutes}
									onChange={handleChange}
									style={styles.input}
									placeholder="Enter cycling minutes goal"
								/>
							</div>
						</div>

						<div style={styles.field}>
							<label style={styles.label}>Minutes (Swimming):</label>
							<div style={styles.inputWrapper}>
								<input
									type="number"
									name="swimmingMinutes"
									value={formData.swimmingMinutes}
									onChange={handleChange}
									style={styles.input}
									placeholder="Enter swimming minutes goal"
								/>
							</div>
						</div>

						<div style={styles.field}>
							<label style={styles.label}>Minutes (Exercise):</label>
							<div style={styles.inputWrapper}>
								<input
									type="number"
									name="exerciseMinutes"
									value={formData.exerciseMinutes}
									onChange={handleChange}
									style={styles.input}
									placeholder="Enter exercise minutes goal"
								/>
							</div>
						</div>

						<div style={styles.field}>
							<label style={styles.label}>Calories:</label>
							<div style={styles.inputWrapper}>
								<input
									type="number"
									name="calories"
									value={formData.calories}
									onChange={handleChange}
									style={styles.input}
									placeholder="Enter calories goal"
								/>
							</div>
						</div>


						{/* Submit Button */}
						<button type="submit" style={styles.button}>
                            Submit Goals
						</button>
					</form>
				)}

				{/* Display Submitted Data */}
				{submittedData && (
					<div style={styles.summaryContainer}>
						<h2 style={styles.summaryHeading}>Goals Summary</h2>
						<div style={styles.summaryContent}>
							{submittedData.startDate && (
								<p>
									<strong>Start Date:</strong>
									{new Date(submittedData.startDate).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							)}

							{submittedData.startDate && (
								<p>
									<strong>End Date:</strong>
									{new Date(submittedData.endDate).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							)}


							{/* Render Goals with Progress Bars */}
							{submittedData.steps && (
								<div style={styles.goalItem}>
									<p>
										<strong>Steps:</strong> {submittedData.steps}
									</p>
									<progress value={50} max={500} style={styles.progressBar} />
								</div>
							)}
							{submittedData.minutes && (
								<div style={styles.goalItem}>
									<p>
										<strong>Running Minutes:</strong> {submittedData.minutes}
									</p>
									<progress value={75} max={500} style={styles.progressBar} />
								</div>
							)}
							{submittedData.cyclingMinutes && (
								<div style={styles.goalItem}>
									<p>
										<strong>Cycling Minutes:</strong> {submittedData.cyclingMinutes}
									</p>
									<progress value={150} max={500} style={styles.progressBar} />
								</div>
							)}
							{submittedData.swimmingMinutes && (
								<div style={styles.goalItem}>
									<p>
										<strong>Swimming Minutes:</strong> {submittedData.swimmingMinutes}
									</p>
									<progress value={0} max={500} style={styles.progressBar} />
								</div>
							)}
							{submittedData.exerciseMinutes && (
								<div style={styles.goalItem}>
									<p>
										<strong>Exercise Minutes:</strong> {submittedData.exerciseMinutes}
									</p>
									<progress value={100} max={500} style={styles.progressBar} />
								</div>
							)}
							{submittedData.calories && (
								<div style={styles.goalItem}>
									<p>
										<strong>Calories:</strong> {submittedData.cyclingMinutes}
									</p>
									<progress value={120} max={500} style={styles.progressBar} />
								</div>
							)}
						</div>
					</div>
				)}


				{!isFormValid && (
					<div style={styles.errorMessage}>
						<p>Please select proper start and end dates before submitting the form. Please ensure that no field exceeds 6 characters</p>
					</div>
				)}
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
		backgroundColor: '#f5f5f5',
		padding: '20px',
	},
	formContainer: {
		backgroundColor: '#fff',
		borderRadius: '10px',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
		padding: '30px',
		width: '100%',
		maxWidth: '900px',
		textAlign: 'left' as const, // "left" as "left" is necessary to solve problem
	},
	heading: {
		fontSize: '28px',
		fontWeight: '600',
		color: '#333',
		marginBottom: '20px',
		textAlign: 'left' as const, // "left" as "left" is necessary to solve problem
	},
	explanationSection: {
		marginBottom: '20px',
		padding: '10px',
		backgroundColor: '#e97462',
		borderRadius: '5px',
		fontSize: '16px',
		color: 'black',
	},
	explanationText: {
		margin: '0',
	},
	dateSection: {
		display: 'flex',
		justifyContent: 'center',
		gap: '20px',
		marginBottom: '20px',
	},
	field: {
		marginBottom: '15px',
	},
	label: {
		fontSize: '16px',
		fontWeight: '500',
		color: '#555',
		marginBottom: '5px',
		display: 'block',
	},
	inputWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		width: '100%',
		padding: '10px',
		fontSize: '16px',
		borderRadius: '5px',
		border: '1px solid #ddd',
	},
	button: {
		width: '100%',
		padding: '14px',
		backgroundColor: '#e97462',
		color: '#fff',
		fontSize: '18px',
		fontWeight: '600',
		borderRadius: '5px',
		cursor: 'pointer',
		border: 'none',
	},
	summaryContainer: {
		marginTop: '20px',
		padding: '20px',
		backgroundColor: '#f9f9f9',
		borderRadius: '8px',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
	},
	summaryHeading: {
		fontSize: '34px',
		fontWeight: '600',
		marginBottom: '15px',
		color: '#333',
	},
	summaryContent: {
		fontSize: '26px',
		color: '#555',
	},
	goalItem: {
		backgroundColor: '#e97462',
		padding: '10px',
		borderRadius: '5px',
		margin: '10px 0',
	},
	progressBar: {
		width: '100%',
		height: '10px',
		borderRadius: '5px',
		backgroundColor: '#e0e0e0',
		overflow: 'hidden',
	},
	errorMessage: {
		marginTop: '20px',
		padding: '10px',
		backgroundColor: '#f8d7da',
		borderRadius: '5px',
		color: '#721c24',
		fontSize: '16px',
		textAlign: 'center' as const, // "center" as "center" is necessary to solve problem

	},
};

export default GoalsPage;