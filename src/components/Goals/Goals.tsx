import React, { useState } from 'react';

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
            return;
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
            return;
        }
        if (!formData.startDate || !formData.endDate) {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
        setIsFormSubmitted(true);
        setSubmittedData(formData);
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
                        {/* Date Section */}
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

                        {/* Goals */}
                        <div style={styles.goalsGrid}>
                            <div style={styles.goalCard}>
                                <div style={styles.goalHeader}>
                                    <span style={styles.goalIcon}>👟</span>
                                    <label style={styles.goalLabel}>DAILY STEPS</label>
                                </div>
                                <input
                                    type="number"
                                    name="steps"
                                    value={formData.steps}
                                    onChange={handleChange}
                                    style={styles.goalInput}
                                    placeholder="0"
                                />
                                <div style={styles.unit}>steps</div>
                            </div>

                            <div style={styles.goalCard}>
                                <div style={styles.goalHeader}>
                                    <span style={styles.goalIcon}>🏃</span>
                                    <label style={styles.goalLabel}>RUNNING</label>
                                </div>
                                <input
                                    type="number"
                                    name="minutes"
                                    value={formData.minutes}
                                    onChange={handleChange}
                                    style={styles.goalInput}
                                    placeholder="0"
                                />
                                <div style={styles.unit}>minutes</div>
                            </div>

                            <div style={styles.goalCard}>
                                <div style={styles.goalHeader}>
                                    <span style={styles.goalIcon}>🚴</span>
                                    <label style={styles.goalLabel}>CYCLING</label>
                                </div>
                                <input
                                    type="number"
                                    name="cyclingMinutes"
                                    value={formData.cyclingMinutes}
                                    onChange={handleChange}
                                    style={styles.goalInput}
                                    placeholder="0"
                                />
                                <div style={styles.unit}>minutes</div>
                            </div>

                            <div style={styles.goalCard}>
                                <div style={styles.goalHeader}>
                                    <span style={styles.goalIcon}>🏊</span>
                                    <label style={styles.goalLabel}>SWIMMING</label>
                                </div>
                                <input
                                    type="number"
                                    name="swimmingMinutes"
                                    value={formData.swimmingMinutes}
                                    onChange={handleChange}
                                    style={styles.goalInput}
                                    placeholder="0"
                                />
                                <div style={styles.unit}>minutes</div>
                            </div>

                            <div style={styles.goalCard}>
                                <div style={styles.goalHeader}>
                                    <span style={styles.goalIcon}>💪</span>
                                    <label style={styles.goalLabel}>EXERCISE</label>
                                </div>
                                <input
                                    type="number"
                                    name="exerciseMinutes"
                                    value={formData.exerciseMinutes}
                                    onChange={handleChange}
                                    style={styles.goalInput}
                                    placeholder="0"
                                />
                                <div style={styles.unit}>minutes</div>
                            </div>

                            <div style={styles.goalCard}>
                                <div style={styles.goalHeader}>
                                    <span style={styles.goalIcon}>🔥</span>
                                    <label style={styles.goalLabel}>CALORIES</label>
                                </div>
                                <input
                                    type="number"
                                    name="calories"
                                    value={formData.calories}
                                    onChange={handleChange}
                                    style={styles.goalInput}
                                    placeholder="0"
                                />
                                <div style={styles.unit}>kcal</div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" style={styles.button}>
                            <span style={styles.buttonText}>LOCK IN YOUR GOALS</span>
                            <span style={styles.buttonIcon}>🏆</span>
                        </button>
                    </form>
                )}

                {/* Display Submitted Data */}
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
                                {submittedData.steps && (
                                    <div style={styles.summaryCard}>
                                        <div style={styles.summaryHeader}>
                                            <span style={styles.summaryIcon}>👟</span>
                                            <div style={styles.summaryLabel}>STEPS</div>
                                        </div>
                                        <div style={styles.summaryValue}>{submittedData.steps}</div>
                                        <div style={styles.progressContainer}>
                                            <div style={styles.progressLabel}>50% Complete</div>
                                            <progress value={50} max={100} style={styles.progressBar} />
                                        </div>
                                    </div>
                                )}
                                {submittedData.minutes && (
                                    <div style={styles.summaryCard}>
                                        <div style={styles.summaryHeader}>
                                            <span style={styles.summaryIcon}>🏃</span>
                                            <div style={styles.summaryLabel}>RUNNING</div>
                                        </div>
                                        <div style={styles.summaryValue}>{submittedData.minutes} <span style={styles.unitSmall}>min</span></div>
                                        <div style={styles.progressContainer}>
                                            <div style={styles.progressLabel}>75% Complete</div>
                                            <progress value={75} max={100} style={styles.progressBar} />
                                        </div>
                                    </div>
                                )}
                                {submittedData.cyclingMinutes && (
                                    <div style={styles.summaryCard}>
                                        <div style={styles.summaryHeader}>
                                            <span style={styles.summaryIcon}>🚴</span>
                                            <div style={styles.summaryLabel}>CYCLING</div>
                                        </div>
                                        <div style={styles.summaryValue}>{submittedData.cyclingMinutes} <span style={styles.unitSmall}>min</span></div>
                                        <div style={styles.progressContainer}>
                                            <div style={styles.progressLabel}>30% Complete</div>
                                            <progress value={30} max={100} style={styles.progressBar} />
                                        </div>
                                    </div>
                                )}
                                {submittedData.swimmingMinutes && (
                                    <div style={styles.summaryCard}>
                                        <div style={styles.summaryHeader}>
                                            <span style={styles.summaryIcon}>🏊</span>
                                            <div style={styles.summaryLabel}>SWIMMING</div>
                                        </div>
                                        <div style={styles.summaryValue}>{submittedData.swimmingMinutes} <span style={styles.unitSmall}>min</span></div>
                                        <div style={styles.progressContainer}>
                                            <div style={styles.progressLabel}>10% Complete</div>
                                            <progress value={10} max={100} style={styles.progressBar} />
                                        </div>
                                    </div>
                                )}
                                {submittedData.exerciseMinutes && (
                                    <div style={styles.summaryCard}>
                                        <div style={styles.summaryHeader}>
                                            <span style={styles.summaryIcon}>💪</span>
                                            <div style={styles.summaryLabel}>EXERCISE</div>
                                        </div>
                                        <div style={styles.summaryValue}>{submittedData.exerciseMinutes} <span style={styles.unitSmall}>min</span></div>
                                        <div style={styles.progressContainer}>
                                            <div style={styles.progressLabel}>65% Complete</div>
                                            <progress value={65} max={100} style={styles.progressBar} />
                                        </div>
                                    </div>
                                )}
                                {submittedData.calories && (
                                    <div style={styles.summaryCard}>
                                        <div style={styles.summaryHeader}>
                                            <span style={styles.summaryIcon}>🔥</span>
                                            <div style={styles.summaryLabel}>CALORIES</div>
                                        </div>
                                        <div style={styles.summaryValue}>{submittedData.calories} <span style={styles.unitSmall}>kcal</span></div>
                                        <div style={styles.progressContainer}>
                                            <div style={styles.progressLabel}>45% Complete</div>
                                            <progress value={45} max={100} style={styles.progressBar} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
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

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
        position: 'relative' as const,
        overflow: 'hidden' as const,
    },
    sportyBackground: {
        position: 'absolute' as const,
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
        position: 'relative' as const,
        zIndex: 1,
        border: '1px solid rgba(0,0,0,0.05)',
    },
    header: {
        position: 'relative' as const,
        marginBottom: '25px',
    },
    heading: {
        fontSize: '32px',
        fontWeight: '700',
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
        fontWeight: '700',
        marginLeft: '15px',
    },
    sportStripes: {
        height: '4px',
        background: 'linear-gradient(90deg, #e97462 0%, #e97462 25%, #ffd700 25%, #ffd700 50%, #e97462 50%, #e97462 75%, #ffd700 75%, #ffd700 100%)',
        borderRadius: '2px',
        marginBottom: '20px',
        backgroundSize: '200% 100%',
        animation: 'slideStripes 3s linear infinite',
    },
    athleteIcon: {
        fontSize: '40px',
        float: 'left' as const,
        marginRight: '15px',
        marginTop: '-5px',
    },
    explanationSection: {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f1e9',
        borderRadius: '10px',
        borderLeft: '5px solid #e97462',
        overflow: 'hidden' as const,
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
        fontWeight: '600',
        color: '#555',
        textTransform: 'uppercase' as const,
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
        textAlign: 'center' as const,
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(233,116,98,0.1)',
        },
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
        fontWeight: '700',
        color: '#e97462',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px',
    },
    goalInput: {
        width: '100%',
        padding: '15px',
        fontSize: '24px',
        fontWeight: '700',
        borderRadius: '8px',
        border: '2px solid #e97462',
        backgroundColor: '#fff',
        textAlign: 'center' as const,
        color: '#333',
        fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
    },
    unit: {
        fontSize: '12px',
        color: '#888',
        marginTop: '5px',
        textTransform: 'uppercase' as const,
        fontWeight: '600',
    },
    button: {
        width: '100%',
        padding: '18px',
        backgroundColor: '#e97462',
        color: '#fff',
        fontSize: '18px',
        fontWeight: '700',
        borderRadius: '8px',
        cursor: 'pointer',
        border: 'none',
        textTransform: 'uppercase' as const,
        letterSpacing: '1.5px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(233, 116, 98, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ':hover': {
            backgroundColor: '#d86553',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 8px rgba(233, 116, 98, 0.4)',
        },
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
        fontWeight: '700',
        marginBottom: '15px',
        color: '#333',
        textTransform: 'uppercase' as const,
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
        textAlign: 'center' as const,
        minWidth: '300px',
    },
    dateLabel: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#e97462',
        marginBottom: '10px',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px',
    },
    dateRange: {
        fontSize: '18px',
        fontWeight: '700',
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
        fontWeight: '700',
        color: '#e97462',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px',
    },
    summaryValue: {
        fontSize: '28px',
        fontWeight: '700',
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
        fontWeight: '600',
    },
    progressBar: {
        width: '100%',
        height: '10px',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
        '::-webkit-progress-value': {
            backgroundColor: '#e97462',
            borderRadius: '5px',
        },
        '::-moz-progress-bar': {
            backgroundColor: '#e97462',
            borderRadius: '5px',
        },
    },
    errorMessage: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#ffebee',
        borderRadius: '8px',
        color: '#c62828',
        fontSize: '16px',
        textAlign: 'center' as const,
        borderLeft: '5px solid #c62828',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorIcon: {
        marginRight: '10px',
        fontSize: '20px',
    },
};

export default GoalsPage;