import React, { useState, useEffect } from 'react';

const quotes = [
	'Push yourself, because no one else is going to do it for you.',
	'Fitness is not about being better than someone else. It\'s about being better than you used to be.',
	'The only bad workout is the one that didn\'t happen.',
	'Take care of your body. It’s the only place you have to live.',
	'You don’t have to be extreme, just consistent.'
];

const DailyQuote: React.FC = () => {
	const [quote, setQuote] = useState('');

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		setQuote(quotes[randomIndex]);
	}, []);

	return (
		<div style={{
			backgroundColor: '#F2786D',
			padding: '1rem',
			borderRadius: '10px',
			marginTop: '1rem',
			color: '#fff',
			textAlign: 'center',
			fontStyle: 'italic',
			boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
		}}>
			{quote}
		</div>
	);
};

export default DailyQuote;
