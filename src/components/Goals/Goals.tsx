import React, { useMemo, useState } from 'react';
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


// --- Similar Users types ---
interface SimilarUser {
 id: string;
 name: string;
 avatarUrl: string;
 matchScore: number; // 0 - 100
 highlights: string[];
 goals: Partial<
   Pick<
     FormData,
     | 'steps'
     | 'minutes'
     | 'cyclingMinutes'
     | 'swimmingMinutes'
     | 'exerciseMinutes'
     | 'calories'
   >
 >;
}


// --- helpers ---
const clampTo6Digits = (val: string) => (val.length > 6 ? val.slice(0, 6) : val);
const safeInt = (v: string) => {
 const n = Number.parseInt(String(v), 10);
 return Number.isFinite(n) ? n : 0;
};
const toISO = (d: Date) => d.toISOString().slice(0, 10);


const GoalsPage = () => {
 // sensible defaults for a nicer first-run UX
 const todayISO = useMemo(() => toISO(new Date()), []);
 const twoWeeksISO = useMemo(() => {
   const d = new Date();
   d.setDate(d.getDate() + 14);
   return toISO(d);
 }, []);


 const [formData, setFormData] = useState<FormData>({
   startDate: todayISO,
   endDate: twoWeeksISO,
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
 const [validationDetail, setValidationDetail] = useState<string | null>(null);


 // Similar Users state
 const [similarUsers, setSimilarUsers] = useState<SimilarUser[]>([]);
 const [isSimilarLoading, setIsSimilarLoading] = useState(false);
 const [similarError, setSimilarError] = useState<string | null>(null);


 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value, type } = event.target;
   // keep number-like fields at <= 6 chars even while typing
   const next =
     type === 'number' ? clampTo6Digits(value.replace(/[^0-9]/g, '')) : value;
   setFormData((prev) => ({
     ...prev,
     [name]: next,
   }));
 };


 // mock API call to fetch similar users based on submitted goals
 const fetchSimilarUsersMock = async (data: FormData): Promise<SimilarUser[]> => {
   const n = (v: string) => (v ? Number(v) : 0);
   const base = {
     steps: n(data.steps) || 8000,
     minutes: n(data.minutes) || 120,
     cyclingMinutes: n(data.cyclingMinutes) || 60,
     swimmingMinutes: n(data.swimmingMinutes) || 30,
     exerciseMinutes: n(data.exerciseMinutes) || 150,
     calories: n(data.calories) || 2200,
   };


   const pct = (actual: number, target: number) => {
     if (!target) return 50;
     const ratio = Math.min(actual, target) / Math.max(actual, target);
     return Math.round(ratio * 100);
   };


   const candidates: SimilarUser[] = [
     {
       id: 'u1',
       name: 'Taylor R.',
       avatarUrl: 'https://i.pravatar.cc/120?img=12',
       matchScore: 0,
       highlights: ['Morning runner', 'Weekend long rides'],
       goals: {
         steps: String(Math.round(base.steps * 0.95)),
         minutes: String(Math.round(base.minutes * 1.0)),
         cyclingMinutes: String(Math.round(base.cyclingMinutes * 1.2)),
         calories: String(Math.round(base.calories * 0.95)),
       },
     },
     {
       id: 'u2',
       name: 'Jordan K.',
       avatarUrl: 'https://i.pravatar.cc/120?img=32',
       matchScore: 0,
       highlights: ['Swims twice a week', 'Focus on active recovery'],
       goals: {
         steps: String(Math.round(base.steps * 0.9)),
         minutes: String(Math.round(base.minutes * 0.85)),
         swimmingMinutes: String(Math.round(base.swimmingMinutes * 1.5)),
         exerciseMinutes: String(Math.round(base.exerciseMinutes * 0.9)),
         calories: String(Math.round(base.calories * 1.05)),
       },
     },
     {
       id: 'u3',
       name: 'Avery M.',
       avatarUrl: 'https://i.pravatar.cc/120?img=56',
       matchScore: 0,
       highlights: ['Loves HIIT circuits', 'Evening walker'],
       goals: {
         steps: String(Math.round(base.steps * 1.1)),
         minutes: String(Math.round(base.minutes * 1.1)),
         exerciseMinutes: String(Math.round(base.exerciseMinutes * 1.2)),
       },
     },
     {
       id: 'u4',
       name: 'Sam P.',
       avatarUrl: 'https://i.pravatar.cc/120?img=47',
       matchScore: 0,
       highlights: ['Balanced routine', 'Weekend hikes'],
       goals: {
         steps: String(Math.round(base.steps * 1.0)),
         minutes: String(Math.round(base.minutes * 0.9)),
         cyclingMinutes: String(Math.round(base.cyclingMinutes * 0.8)),
         swimmingMinutes: String(Math.round(base.swimmingMinutes * 1.1)),
         calories: String(Math.round(base.calories * 1.0)),
       },
     },
   ];


   const computeMatch = (g: SimilarUser['goals']) => {
     const keys: (keyof SimilarUser['goals'])[] = [
       'steps',
       'minutes',
       'cyclingMinutes',
       'swimmingMinutes',
       'exerciseMinutes',
       'calories',
     ];
     const scores: number[] = keys
       .filter((k) => g[k])
       .map((k) => pct(Number(g[k] as string), Number((base as any)[k])));
     const avg = scores.length
       ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
       : 50;
     return avg;
   };


   const withScores = candidates.map((c) => ({
     ...c,
     matchScore: computeMatch(c.goals),
   }));


   await new Promise((r) => setTimeout(r, 650));
   return withScores.sort((a, b) => b.matchScore - a.matchScore);
 };


 const handleSubmit = async (event: React.FormEvent) => {
   event.preventDefault();


   // date logic
   if (new Date(formData.endDate) < new Date(formData.startDate)) {
     setIsFormValid(false);
     setValidationDetail('End date must be on or after the start date.');
     return;
   }


   // length logic
   const offenders: string[] = [];
   (['steps','minutes','cyclingMinutes','swimmingMinutes','exerciseMinutes','calories'] as const)
     .forEach((k) => { if ((formData[k] || '').length > 6) offenders.push(k); });


   if (offenders.length > 0 || !formData.startDate || !formData.endDate) {
     setIsFormValid(false);
     setValidationDetail(
       offenders.length
         ? `These fields exceed 6 digits: ${offenders.join(', ')}`
         : 'Please provide both start and end dates.'
     );
     return;
   }


   setIsFormValid(true);
   setIsFormSubmitted(true);
   setSubmittedData(formData);


   // trigger mock similar users fetch after successful submit
   try {
     setSimilarError(null);
     setIsSimilarLoading(true);
     const results = await fetchSimilarUsersMock(formData);
     setSimilarUsers(results);
   } catch (err) {
     setSimilarError('Could not load similar users. Please try again.');
   } finally {
     setIsSimilarLoading(false);
   }
 };


 const handleReset = () => {
   setIsFormSubmitted(false);
   setSubmittedData(null);
   setSimilarUsers([]);
   setSimilarError(null);
   setIsSimilarLoading(false);
 };


 return (
   <div style={styles.container}>
     {/* one-time keyframes for shimmer */}
     <style>
       {`@keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }`}
     </style>


     <div style={styles.formContainer}>
       <LastSynced />


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
           <div style={styles.dateSection}>
             <div style={styles.field}>
               <label htmlFor="startDate" style={styles.label}>Start Date:</label>
               <input
                 id="startDate"
                 type="date"
                 name="startDate"
                 value={formData.startDate}
                 onChange={handleChange}
                 style={styles.input}
               />
             </div>
             <div style={styles.field}>
               <label htmlFor="endDate" style={styles.label}>End Date:</label>
               <input
                 id="endDate"
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
               <label htmlFor={field.name} style={styles.label}>{field.label}:</label>
               <div style={styles.inputWrapper}>
                 <input
                   id={field.name}
                   type="number"
                   name={field.name}
                   value={formData[field.name as keyof FormData]}
                   onChange={handleChange}
                   style={styles.input}
                   placeholder={`Enter ${field.label.toLowerCase()} goal`}
                   min={0}
                   step={1}
                   inputMode="numeric"
                 />
               </div>
             </div>
           ))}


           <button
             type="submit"
             style={styles.button}
             onMouseEnter={(e) => {
               e.currentTarget.style.backgroundColor = '#b3a7b7';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.backgroundColor = '#e97462';
             }}
           >
             Submit Goals
           </button>
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
               if (['startDate', 'endDate'].includes(key)) return null;
               const label = key
                 .replace(/([A-Z])/g, ' $1')
                 .replace(/^./, (s) => s.toUpperCase());
               return (
                 <div style={styles.goalItem} key={key}>
                   <p>
                     <strong>{label}:</strong> {value}
                   </p>
                   <progress
                     value={safeInt(value as string)}
                     max={500}
                     style={styles.progressBar}
                   />
                 </div>
               );
             })}
           </div>


           {/* Similar Users Panel */}
           <div style={styles.similarUsersOuter}>
             <h3 style={styles.similarHeading}>People with Similar Goals</h3>
             <p style={styles.similarSub}>
               Based on your targets, here are a few training buddies you might vibe with.
             </p>


             {isSimilarLoading && (
               <div style={styles.similarSkeletonRow}>
                 {[1, 2, 3].map((i) => (
                   <div key={i} style={styles.skeletonCard} />
                 ))}
               </div>
             )}


             {similarError && (
               <div style={styles.similarError}>{similarError}</div>
             )}


             {!isSimilarLoading && !similarError && similarUsers.length > 0 && (
               <div style={styles.similarGrid}>
                 {similarUsers.map((u) => (
                   <div key={u.id} style={styles.userCard}>
                     <div style={styles.userHeader}>
                       <img src={u.avatarUrl} alt={u.name} style={styles.avatar} />
                       <div>
                         <div style={styles.userName}>{u.name}</div>
                         <div style={styles.matchRow}>
                           <div style={styles.matchBadge}>{u.matchScore}% match</div>
                         </div>
                       </div>
                     </div>
                     <ul style={styles.highlights}>
                       {u.highlights.map((h, idx) => (
                         <li key={idx}>{h}</li>
                       ))}
                     </ul>
                     <div style={styles.userGoalsWrap}>
                       {Object.entries(u.goals).map(([k, v]) => (
                         <div key={k} style={styles.userGoalItem}>
                           <span style={styles.userGoalLabel}>
                             {k.replace(/([A-Z])/g, ' $1')}
                           </span>
                           <span style={styles.userGoalValue}>{v}</span>
                         </div>
                       ))}
                     </div>
                     <button
                       style={styles.ghostButton}
                       onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                       onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                     >
                       View Plan
                     </button>
                   </div>
                 ))}
               </div>
             )}


             <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
               <button
                 type="button"
                 onClick={handleReset}
                 style={{
                   ...styles.ghostButton,
                   borderColor: '#bbb',
                   color: '#555',
                 }}
               >
                 Reset & Edit Goals
               </button>
             </div>
           </div>
         </div>
       )}


       {!isFormValid && (
         <div style={styles.errorMessage}>
           <p>
             {validationDetail ||
               'Please select proper start and end dates and ensure no field exceeds 6 digits.'}
           </p>
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
   textAlign: 'left' as const,
 },
 heading: {
   fontSize: '28px',
   fontWeight: '600',
   color: '#333',
   marginBottom: '20px',
   textAlign: 'left' as const,
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
 } as React.CSSProperties,
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
   transition: 'background-color 0.2s ease-in-out',
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
   textAlign: 'center' as const,
 },


 // Similar Users panel
 similarUsersOuter: {
   marginTop: '28px',
   padding: '18px',
   background: 'linear-gradient(180deg, #ffffff 0%, #fff7f5 100%)',
   borderRadius: '10px',
   border: '1px solid #ffe2db',
 },
 similarHeading: {
   fontSize: '28px',
   fontWeight: 700,
   color: '#333',
   margin: '0 0 6px 0',
 },
 similarSub: {
   fontSize: '14px',
   color: '#6b6b6b',
   marginBottom: '14px',
 },
 similarSkeletonRow: {
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
   gap: '14px',
 },
 skeletonCard: {
   height: '160px',
   borderRadius: '10px',
   background: 'linear-gradient(90deg, #f2f2f2 25%, #e9e9e9 37%, #f2f2f2 63%)',
   backgroundSize: '400% 100%',
   animation: 'shimmer 1.2s ease-in-out infinite',
 } as React.CSSProperties,
 similarGrid: {
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
   gap: '16px',
 },
 userCard: {
   background: '#ffffff',
   border: '1px solid #f3d0c9',
   borderRadius: '12px',
   padding: '14px',
   boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
   transition: 'transform 0.2s ease, box-shadow 0.2s ease',
 } as React.CSSProperties,
 userHeader: {
   display: 'flex',
   alignItems: 'center',
   gap: '12px',
   marginBottom: '10px',
 },
 avatar: {
   width: '48px',
   height: '48px',
   borderRadius: '50%',
   objectFit: 'cover' as const,
   border: '2px solid #ffe1db',
 },
 userName: {
   fontWeight: 700,
   fontSize: '16px',
   color: '#333',
 },
 matchRow: {
   marginTop: '4px',
 },
 matchBadge: {
   display: 'inline-block',
   padding: '4px 8px',
   fontSize: '12px',
   borderRadius: '999px',
   backgroundColor: '#ffe6e0',
   color: '#a65041',
   fontWeight: 700,
 },
 highlights: {
   listStyle: 'disc',
   paddingLeft: '18px',
   margin: '8px 0 10px 0',
   color: '#666',
   fontSize: '14px',
 } as React.CSSProperties,
 userGoalsWrap: {
   display: 'grid',
   gridTemplateColumns: '1fr 1fr',
   gap: '8px',
   marginBottom: '12px',
 },
 userGoalItem: {
   background: '#fff7f5',
   border: '1px solid #ffe1db',
   borderRadius: '8px',
   padding: '8px',
   display: 'flex',
   justifyContent: 'space-between',
   fontSize: '13px',
 },
 userGoalLabel: {
	color: '#666',

 },
 userGoalValue: {
   color: '#333',
   fontWeight: 700,
 },
 ghostButton: {
   width: '100%',
   border: '1px solid #e97462',
   background: 'transparent',
   color: '#e97462',
   padding: '10px',
   borderRadius: '8px',
   cursor: 'pointer',
   fontWeight: 700,
   transition: 'opacity 0.2s ease',
 },
 similarError: {
   background: '#fff1f3',
   border: '1px solid #ffd6dc',
   color: '#a33341',
   padding: '10px 12px',
   borderRadius: '8px',
   fontSize: '14px',
 },
} as const;


export default GoalsPage;




