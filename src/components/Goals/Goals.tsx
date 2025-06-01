import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

interface SimilarGoal {
    user_id: number;
    steps: number;
    minutes_running: number;
    minutes_cycling: number;
    minutes_swimming: number;
    minutes_exercise: number;
    calories: number;
    start_date: string;
    end_date: string;
}

type Styles = {
    [key: string]: React.CSSProperties;
};

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
    const [similarGoals, setSimilarGoals] = useState<SimilarGoal[]>([]);
    const [showSimilarGoals, setShowSimilarGoals] = useState(false);
    const [isLoadingSimilarGoals, setIsLoadingSimilarGoals] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [progressValues] = useState({
        steps: 50,
        minutes: 75,
        cyclingMinutes: 30,
        swimmingMinutes: 10,
        exerciseMinutes: 65,
        calories: 45
    });

   useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('/api/profile/current');
                setCurrentUserId(response.data.user_id);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };
        fetchCurrentUser();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Add error message state at the top with other states
const [errorMessage, setErrorMessage] = useState('');

// Fix the mock data implementation (remove duplicate)
const mockSimilarGoals: SimilarGoal[] = [
    {
        user_id: 102,
        steps: 10000,
        minutes_running: 30,
        minutes_cycling: 20,
        minutes_swimming: 15,
        minutes_exercise: 45,
        calories: 500,
        start_date: '2025-05-01',
        end_date: '2025-06-01',
    },
    {
        user_id: 215,
        steps: 8500,
        minutes_running: 20,
        minutes_cycling: 30,
        minutes_swimming: 10,
        minutes_exercise: 50,
        calories: 450,
        start_date: '2025-05-10',
        end_date: '2025-06-10',
    },
];

const useMockData = true; // Set to false to use real API

// Update fetchSimilarGoals implementation
const fetchSimilarGoals = async (formData: FormData) => {
    setIsLoadingSimilarGoals(true);
    try {
        let data: SimilarGoal[];
        
        if (useMockData) {
            // Use mock data with delay to simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = mockSimilarGoals;
        } else {
            const response = await axios.post('/api/goals/similar', {
                steps: parseInt(formData.steps) || 0,
                minutes_running: parseInt(formData.minutes) || 0,
                minutes_cycling: parseInt(formData.cyclingMinutes) || 0,
                minutes_swimming: parseInt(formData.swimmingMinutes) || 0,
                minutes_exercise: parseInt(formData.exerciseMinutes) || 0,
                calories: parseInt(formData.calories) || 0,
                user_id: currentUserId
            });
            data = response.data;
        }
        
        setSimilarGoals(data);
        setShowSimilarGoals(true);
    } catch (error) {
        console.error('Error fetching similar goals:', error);
        setErrorMessage('Failed to load similar goals');
    } finally {
        setIsLoadingSimilarGoals(false);
    }
};

// Update handleSubmit with better validation
const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(''); // Reset error message

    // Validate dates
    if (!formData.startDate || !formData.endDate) {
        setIsFormValid(false);
        setErrorMessage('Please select both start and end dates');
        return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
        setIsFormValid(false);
        setErrorMessage('End date cannot be before start date');
        return;
    }

    // Validate numeric fields
    const numericFields = ['steps', 'minutes', 'cyclingMinutes', 
                          'swimmingMinutes', 'exerciseMinutes', 'calories'];
    const invalidFields = numericFields.filter(field => 
        formData[field as keyof FormData].length > 6
    );

    if (invalidFields.length > 0) {
        setIsFormValid(false);
        setErrorMessage('Please ensure no number field exceeds 6 digits');
        return;
    }

    setIsFormValid(true);
    setIsFormSubmitted(true);
    setSubmittedData(formData);
    await fetchSimilarGoals(formData);
};

    const styles: Styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
            position: 'relative',
            overflow: 'hidden',
        },
        sportyBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(233,116,98,0.1) 0%, rgba(255,255,255,0.8) 50%, rgba(233,116,98,0.1) 100%)',
            zIndex: 0,
        },
        formContainer: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            width: '100%',
            maxWidth: '900px',
            position: 'relative',
            zIndex: 1,
            border: '1px solid rgba(0,0,0,0.05)',
        },
        header: {
            position: 'relative',
            marginBottom: '25px',
        },
        heading: {
            fontSize: '32px',
            fontWeight: 700,
            color: '#333',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headingText: {
            flex: 1,
        },
        sportBadge: {
            backgroundColor: '#e97462',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 700,
            marginLeft: '15px',
        },
        sportStripes: {
            height: '4px',
            background: 'linear-gradient(90deg, #e97462 0%, #e97462 25%, #ffd700 25%, #ffd700 50%, #e97462 50%, #e97462 75%, #ffd700 75%, #ffd700 100%)',
            borderRadius: '2px',
            marginBottom: '20px',
            backgroundSize: '200% 100%',
        },
        athleteIcon: {
            fontSize: '40px',
            float: 'left',
            marginRight: '15px',
            marginTop: '-5px',
        },
        explanationSection: {
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: '#f8f1e9',
            borderRadius: '10px',
            borderLeft: '5px solid #e97462',
            overflow: 'hidden',
        },
        explanationText: {
            margin: '0',
            color: '#555',
            lineHeight: '1.6',
            fontSize: '16px',
        },
        form: {
            marginTop: '20px',
        },
        dateSection: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '30px',
        },
        field: {
            flex: 1,
        },
        labelContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
        },
        sportIcon: {
            marginRight: '10px',
            fontSize: '20px',
        },
        label: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #ddd',
            backgroundColor: '#f9f9f9',
            transition: 'all 0.3s ease',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        goalsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
        },
        goalCard: {
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            border: '1px solid rgba(233,116,98,0.2)',
            textAlign: 'center',
        },
        goalHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '15px',
        },
        goalIcon: {
            fontSize: '24px',
            marginRight: '10px',
        },
        goalLabel: {
            fontSize: '14px',
            fontWeight: 700,
            color: '#e97462',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        goalInput: {
            width: '100%',
            padding: '15px',
            fontSize: '24px',
            fontWeight: 700,
            borderRadius: '8px',
            border: '2px solid #e97462',
            backgroundColor: '#fff',
            textAlign: 'center',
            color: '#333',
            fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
        },
        unit: {
            fontSize: '12px',
            color: '#888',
            marginTop: '5px',
            textTransform: 'uppercase',
            fontWeight: 600,
        },
        button: {
            width: '100%',
            padding: '18px',
            backgroundColor: '#e97462',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 700,
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(233, 116, 98, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            marginRight: '10px',
        },
        buttonIcon: {
            fontSize: '20px',
        },
        summaryContainer: {
            marginTop: '20px',
            padding: '25px',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0,0,0,0.05)',
        },
        summaryHeading: {
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '15px',
            color: '#333',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        summaryContent: {
            marginTop: '20px',
        },
        summaryDates: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
        },
        dateCard: {
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            textAlign: 'center',
            minWidth: '300px',
        },
        dateLabel: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#e97462',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        dateRange: {
            fontSize: '18px',
            fontWeight: 700,
            color: '#333',
        },
        dateSeparator: {
            margin: '0 10px',
            color: '#e97462',
        },
        summaryGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
        },
        summaryCard: {
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            borderTop: '4px solid #e97462',
        },
        summaryHeader: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
        },
        summaryIcon: {
            fontSize: '24px',
            marginRight: '10px',
        },
        summaryLabel: {
            fontSize: '14px',
            fontWeight: 700,
            color: '#e97462',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        summaryValue: {
            fontSize: '28px',
            fontWeight: 700,
            color: '#333',
            marginBottom: '15px',
            fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
        },
        unitSmall: {
            fontSize: '16px',
            color: '#888',
            fontWeight: 'normal',
        },
        progressContainer: {
            marginTop: '10px',
        },
        progressLabel: {
            fontSize: '12px',
            color: '#888',
            marginBottom: '5px',
            fontWeight: 600,
        },
        progressBar: {
            width: '100%',
            height: '10px',
            borderRadius: '5px',
            backgroundColor: '#f0f0f0',
            overflow: 'hidden',
        },
        errorMessage: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#ffebee',
            borderRadius: '8px',
            color: '#c62828',
            fontSize: '16px',
            textAlign: 'center',
            borderLeft: '5px solid #c62828',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        errorIcon: {
            marginRight: '10px',
            fontSize: '20px',
        },
        similarGoalsContainer: {
            marginTop: '40px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
        similarGoalsHeading: {
            fontSize: '20px',
            fontWeight: 700,
            color: '#333',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        similarGoalsIcon: {
            marginRight: '10px',
            fontSize: '24px',
        },
        similarGoalsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
        },
        similarGoalCard: {
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            borderLeft: '4px solid #e97462',
        },
        similarGoalHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
            paddingBottom: '10px',
            borderBottom: '1px solid #eee',
        },
        similarGoalUser: {
            fontWeight: 700,
            color: '#e97462',
        },
        similarGoalDates: {
            fontSize: '12px',
            color: '#888',
        },
        similarGoalStats: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
        },
        similarGoalStat: {
            fontSize: '14px',
            color: '#555',
            display: 'flex',
            alignItems: 'center',
        },
        similarGoalStatIcon: {
            marginRight: '8px',
            fontSize: '16px',
        },
        loadingMessage: {
            textAlign: 'center',
            padding: '20px',
            color: '#666',
        },
        noSimilarGoalsMessage: {
            textAlign: 'center',
            padding: '20px',
            color: '#666',
            fontStyle: 'italic',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.sportyBackground}></div>
            <div style={styles.formContainer}>
                {!isFormSubmitted && (
                    <>
                        <div style={styles.header}>
                            <h1 style={styles.heading}>
                                <span style={styles.headingText}>SET YOUR FITNESS GOALS</span>
                                <span style={styles.sportBadge}>GOAL TRACKER</span>
                            </h1>
                            <div style={styles.sportStripes}></div>
                        </div>
                        <div style={styles.explanationSection}>
                            <div style={styles.athleteIcon}>🏋️</div>
                            <p style={styles.explanationText}>
                                Welcome to your fitness goals tracker! Set your targets and crush them like a pro. 
                                Choose your timeframe and enter your athletic goals below.
                            </p>
                        </div>
                    </>
                )}

                {!isFormSubmitted && (
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.dateSection}>
                            <div style={styles.field}>
                                <div style={styles.labelContainer}>
                                    <span style={styles.sportIcon}>📅</span>
                                    <label style={styles.label}>START DATE</label>
                                </div>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <div style={styles.labelContainer}>
                                    <span style={styles.sportIcon}>🏁</span>
                                    <label style={styles.label}>END DATE</label>
                                </div>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        <div style={styles.goalsGrid}>
                            {[
                                { icon: '👟', label: 'DAILY STEPS', name: 'steps', unit: 'steps' },
                                { icon: '🏃', label: 'RUNNING', name: 'minutes', unit: 'minutes' },
                                { icon: '🚴', label: 'CYCLING', name: 'cyclingMinutes', unit: 'minutes' },
                                { icon: '🏊', label: 'SWIMMING', name: 'swimmingMinutes', unit: 'minutes' },
                                { icon: '💪', label: 'EXERCISE', name: 'exerciseMinutes', unit: 'minutes' },
                                { icon: '🔥', label: 'CALORIES', name: 'calories', unit: 'kcal' },
                            ].map((goal) => (
                                <div key={goal.name} style={styles.goalCard}>
                                    <div style={styles.goalHeader}>
                                        <span style={styles.goalIcon}>{goal.icon}</span>
                                        <label style={styles.goalLabel}>{goal.label}</label>
                                    </div>
                                    <input
                                        type="number"
                                        name={goal.name}
                                        value={formData[goal.name as keyof FormData] || ''}
                                        onChange={handleChange}
                                        style={styles.goalInput}
                                        placeholder="0"
                                    />
                                    <div style={styles.unit}>{goal.unit}</div>
                                </div>
                            ))}
                        </div>

                        <button type="submit" style={styles.button}>
                            <span style={styles.buttonText}>LOCK IN YOUR GOALS</span>
                            <span style={styles.buttonIcon}>🏆</span>
                        </button>
                    </form>
                )}

                {submittedData && (
                    <div style={styles.summaryContainer}>
                        <div style={styles.header}>
                            <h2 style={styles.summaryHeading}>
                                <span style={styles.headingText}>YOUR GAME PLAN</span>
                                <span style={styles.sportBadge}>PROGRESS</span>
                            </h2>
                            <div style={styles.sportStripes}></div>
                        </div>
                        <div style={styles.summaryContent}>
                            <div style={styles.summaryDates}>
                                <div style={styles.dateCard}>
                                    <div style={styles.dateLabel}>TRAINING PERIOD</div>
                                    <div style={styles.dateRange}>
                                        {new Date(submittedData.startDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                        <span style={styles.dateSeparator}>→</span>
                                        {new Date(submittedData.endDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div style={styles.summaryGrid}>
                                {Object.entries(submittedData)
                                    .filter(([key]) => key !== 'startDate' && key !== 'endDate')
                                    .map(([key, value]) => value && (
                                        <div key={key} style={styles.summaryCard}>
                                            <div style={styles.summaryHeader}>
                                                <span style={styles.summaryIcon}>
                                                    {{
                                                        steps: '👟',
                                                        minutes: '🏃',
                                                        cyclingMinutes: '🚴',
                                                        swimmingMinutes: '🏊',
                                                        exerciseMinutes: '💪',
                                                        calories: '🔥',
                                                    }[key]}
                                                </span>
                                                <div style={styles.summaryLabel}>
                                                    {{
                                                        steps: 'STEPS',
                                                        minutes: 'RUNNING',
                                                        cyclingMinutes: 'CYCLING',
                                                        swimmingMinutes: 'SWIMMING',
                                                        exerciseMinutes: 'EXERCISE',
                                                        calories: 'CALORIES',
                                                    }[key]}
                                                </div>
                                            </div>
                                            <div style={styles.summaryValue}>
                                                {value}
                                                <span style={styles.unitSmall}>
                                                    {{
                                                        steps: '',
                                                        minutes: ' min',
                                                        cyclingMinutes: ' min',
                                                        swimmingMinutes: ' min',
                                                        exerciseMinutes: ' min',
                                                        calories: ' kcal',
                                                    }[key]}
                                                </span>
                                            </div>
                                            <div style={styles.progressContainer}>
                                                <div style={styles.progressLabel}>
                                                    {progressValues[key as keyof typeof progressValues]}% Complete
                                                </div>
                                                <progress 
                                                    value={progressValues[key as keyof typeof progressValues]} 
                                                    max={100} 
                                                    style={styles.progressBar} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {showSimilarGoals && (
                    <div style={styles.similarGoalsContainer}>
                        <h3 style={styles.similarGoalsHeading}>
                            <span style={styles.similarGoalsIcon}>👥</span>
                            PEOPLE WITH SIMILAR GOALS
                        </h3>
                        
                        {isLoadingSimilarGoals ? (
                            <div style={styles.loadingMessage}>Loading similar goals...</div>
                        ) : similarGoals.length > 0 ? (
                            <div style={styles.similarGoalsGrid}>
                                {similarGoals.map((goal, index) => (
                                    <div key={index} style={styles.similarGoalCard}>
                                        <div style={styles.similarGoalHeader}>
                                            <span style={styles.similarGoalUser}>User #{goal.user_id}</span>
                                            <div style={styles.similarGoalDates}>
                                                {new Date(goal.start_date).toLocaleDateString()} - {new Date(goal.end_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={styles.similarGoalStats}>
                                            {[
                                                { icon: '👟', value: goal.steps, label: 'steps' },
                                                { icon: '🏃', value: goal.minutes_running, label: 'min run' },
                                                { icon: '🚴', value: goal.minutes_cycling, label: 'min cycle' },
                                                { icon: '🏊', value: goal.minutes_swimming, label: 'min swim' },
                                                { icon: '💪', value: goal.minutes_exercise, label: 'min exercise' },
                                                { icon: '🔥', value: goal.calories, label: 'kcal' },
                                            ].map((stat) => (
                                                <div key={stat.label} style={styles.similarGoalStat}>
                                                    <span style={styles.similarGoalStatIcon}>{stat.icon}</span>
                                                    {stat.value} {stat.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={styles.noSimilarGoalsMessage}>
                                No similar goals found. You're setting the trend!
                            </div>
                        )}
                    </div>
                )}

                {!isFormValid && (
                    <div style={styles.errorMessage}>
                        <span style={styles.errorIcon}>⚠️</span>
                        <p>Please check your dates and ensure no field exceeds 6 characters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoalsPage;