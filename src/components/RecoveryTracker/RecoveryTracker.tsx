import React, { useState, useEffect } from 'react';
import styles from './RecoveryTracker.module.css';

type RecoveryData = {
  day: string;
  sleepHours: number;
  restDay: boolean;
  fatigueLevel: number;
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const initialData: RecoveryData[] = days.map((day) => ({
  day,
  sleepHours: 0,
  restDay: false,
  fatigueLevel: 0,
}));

const getRecommendation = (fatigue: number, sleep: number) => {
  if (fatigue >= 7 || sleep < 6) return '⚠️ Prioritize recovery!';
  if (fatigue <= 3 && sleep >= 8) return '✅ Excellent recovery!';
  return '🟡 Keep monitoring.';
};

const recoveryTips = [
  '🧘‍♀️ Try guided meditation or breathing exercises.',
  '💧 Stay hydrated throughout the day.',
  '🌿 Take a walk outdoors to refresh mentally.',
  '🛌 Avoid screens before bedtime for better sleep.',
  '🍎 Eat nutritious meals rich in protein and antioxidants.',
];

const RecoveryTracker: React.FC = () => {
  const [data, setData] = useState<RecoveryData[]>(initialData);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    let fatigueStreak = 0;
    let sleepStreak = 0;

    for (let i = 0; i < data.length; i++) {
      sleepStreak = data[i].sleepHours < 6 ? sleepStreak + 1 : 0;
      fatigueStreak = data[i].fatigueLevel > 7 ? fatigueStreak + 1 : 0;

      if (sleepStreak >= 2 || fatigueStreak >= 2) {
        setAlert('⚠️ You’ve had 2+ rough recovery days. Consider resting and using recovery tips below.');
        return;
      }
    }
    setAlert(null);
  }, [data]);

  const handleChange = (
    index: number,
    key: keyof RecoveryData,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...data];

    if (key === 'restDay') {
      updated[index] = { ...updated[index], restDay: event.target.checked };
    } else if (key === 'sleepHours') {
      updated[index] = { ...updated[index], sleepHours: parseFloat(event.target.value) };
    } else if (key === 'fatigueLevel') {
      updated[index] = { ...updated[index], fatigueLevel: parseFloat(event.target.value) };
    }

    setData(updated);
  };

  return (
    <div className={`dashboardContent ${styles.container}`}>
      <h2 className={styles.heading}>Recovery Tracker</h2>

      {alert && (
        <div className={styles.alert}>
          {alert}
          <div className={styles.tipsContainer}>
            {recoveryTips.map((tip, i) => (
              <div key={i} className={styles.tipCard}>
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Sleep (hrs)</th>
            <th>Rest Day</th>
            <th>Fatigue (1-10)</th>
            <th>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.day}</td>
              <td>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={entry.sleepHours}
                  onChange={(e) => handleChange(index, 'sleepHours', e)}
                />{' '}
                {entry.sleepHours}h
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={entry.restDay}
                  onChange={(e) => handleChange(index, 'restDay', e)}
                />
              </td>
              <td>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={entry.fatigueLevel}
                  onChange={(e) => handleChange(index, 'fatigueLevel', e)}
                />{' '}
                {entry.fatigueLevel}
              </td>
              <td>{getRecommendation(entry.fatigueLevel, entry.sleepHours)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecoveryTracker;
