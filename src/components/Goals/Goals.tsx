import React, { useState, CSSProperties } from 'react';
import LastSynced from '../LastSynced/LastSynced';

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setIsFormValid(false);
      return;
    }

    const fieldsExceedMaxLength =
      formData.steps.length > 6 ||
      formData.minutes.length > 6 ||
      formData.cyclingMinutes.length > 6 ||
      formData.swimmingMinutes.length > 6 ||
      formData.exerciseMinutes.length > 6 ||
      formData.calories.length > 6;

    if (fieldsExceedMaxLength || !formData.startDate || !formData.endDate) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
    setIsFormSubmitted(true);
    setSubmittedData(formData);
  };

  return (
    <div className="dashboardContent" style={styles.container}>
      <div style={styles.formContainer}>
        <LastSynced />

        {!isFormSubmitted && (
          <>
            <h1 style={styles.heading}>Set Your Goals</h1>

            {/* Coral info block: keep coral bg, force dark text for contrast */}
            <div style={styles.explanationSection}>
              <p style={styles.explanationText}>
                Welcome to your fitness goals tracker! This page allows you to set personalized fitness goals for a specific date range. Start by selecting your start and end dates. Once you've chosen your timeframe, fill in your targets for various physical activities. If this is your first time setting goals, aim high but remain realistic. Once you've entered your targets, click the 'Submit Goals' button to save them. After submission, you'll be able to view a summary of your goals.
              </p>
            </div>
          </>
        )}

        {!isFormSubmitted && (
          <form onSubmit={handleSubmit}>
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

            {[
              { name: 'steps', label: 'Steps' },
              { name: 'minutes', label: 'Minutes (Running)' },
              { name: 'cyclingMinutes', label: 'Minutes (Cycling)' },
              { name: 'swimmingMinutes', label: 'Minutes (Swimming)' },
              { name: 'exerciseMinutes', label: 'Minutes (Exercise)' },
              { name: 'calories', label: 'Calories' },
            ].map((field) => (
              <div style={styles.field} key={field.name}>
                <label style={styles.label}>{field.label}:</label>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder={`Enter ${field.label.toLowerCase()} goal`}
                  />
                </div>
              </div>
            ))}

            <button type="submit" style={styles.button}>Submit Goals</button>
          </form>
        )}

        {submittedData && (
          <div style={styles.summaryContainer}>
            <h2 style={styles.summaryHeading}>Goals Summary</h2>
            <div style={styles.summaryContent}>
              <p>
                <strong>Start Date:</strong>{' '}
                {new Date(submittedData.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {new Date(submittedData.endDate).toLocaleDateString()}
              </p>

              {Object.entries(submittedData).map(([key, value]) => {
                if (key === 'startDate' || key === 'endDate') return null;
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
                return (
                  <div style={styles.goalItem} key={key}>
                    <p><strong>{label}:</strong> {value}</p>
                    <progress value={parseInt(value)} max={500} style={styles.progressBar} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!isFormValid && (
          <div style={styles.errorMessage}>
            <p>Please select proper start and end dates and ensure no field exceeds 6 digits.</p>
          </div>
        )}
      </div>
    </div>
  );
};

type StyleMap = Record<string, CSSProperties>;

const styles: StyleMap = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'transparent', // let global theme control bg
    padding: '20px',
  },
  formContainer: {
    backgroundColor: 'transparent', // inherit themed surface
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '900px',
    textAlign: 'left',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 600,
    color: 'inherit',
    marginBottom: '20px',
    textAlign: 'left',
  },
  explanationSection: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#e97462', // brand coral
    borderRadius: '5px',
    fontSize: '16px',
    color: '#111', // readable on coral in dark
  },
  explanationText: { margin: 0 },
  dateSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  field: { marginBottom: '15px' },
  label: {
    fontSize: '16px',
    fontWeight: 500,
    color: 'inherit',
    marginBottom: '5px',
    display: 'block',
  },
  inputWrapper: { display: 'flex', alignItems: 'center' },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid', // color set by global theme
    backgroundColor: 'inherit',
    color: 'inherit',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#e97462',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 600,
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
  summaryContainer: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  summaryHeading: {
    fontSize: '34px',
    fontWeight: 600,
    marginBottom: '15px',
    color: 'inherit',
  },
  summaryContent: {
    fontSize: '26px',
    color: 'inherit',
  },
  goalItem: {
    backgroundColor: '#e97462',
    color: '#111',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0',
  },
  progressBar: {
    width: '100%',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: 'rgba(0,0,0,0.15)',
    overflow: 'hidden',
  },
  errorMessage: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: 'rgba(233, 116, 98, 0.15)',
    borderRadius: '5px',
    color: 'inherit',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default GoalsPage;
