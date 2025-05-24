import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturesAudio from '../../assets/Audio_FeaturesPage.mp3';

interface Feature {
	title: string;
	description: string;
	icon: string;
}

const fallbackFeatures: Feature[] = [
	{
		title: 'Real-Time Data Tracking',
		description: 'Track your performance metrics like heart rate, speed, and distance in real-time. Our platform offers live feedback so you can adjust your training on the fly, making it easier to reach your fitness goals faster.',
		icon: 'https://cdn-icons-png.freepik.com/512/7407/7407594.png',
	},
	{
		title: 'Custom Training Plans',
		description: 'Create tailored training schedules that are personalized to your fitness objectives. Our platform generates adaptive plans based on your activity levels and goals.',
		icon: 'https://cdn-icons-png.flaticon.com/512/8306/8306965.png',
	},
	{
		title: 'Advanced Analytics',
		description: 'Dive deep into the data behind your performance with powerful analytics tools. Track trends in your workouts, recovery, and progress over time.',
		icon: 'https://cdn-icons-png.flaticon.com/512/6114/6114221.png',
	},
	{
		title: 'Cross-Sport Insights',
		description: 'Seamlessly manage training for a variety of sports including cycling, running, swimming, and more. Gain cross-sport insights to optimize your entire fitness routine.',
		icon: 'https://www.freepnglogos.com/uploads/sport-png/sport-steadman-philippon-institute-official-site-16.png',
	},
	{
		title: 'Recovery Recommendations',
		description: 'Recovery is key to improving your performance. Our platform provides personalized recovery advice based on your past activities and health data.',
		icon: 'https://images.vexels.com/content/144204/preview/hospital-building-icon-eab445.png',
	},
];

const Features: React.FC = () => {
	const [features, setFeatures] = useState<Feature[]>([]);
	const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const playAudio = () => {
		if (!hasPlayedAudio && !isPlaying) {
			const audio = new Audio(FeaturesAudio);
			setIsPlaying(true);
			audio.play();
			audio.onended = () => setIsPlaying(false);
			setHasPlayedAudio(true);
		}
	};

	useEffect(() => {
		fetch('http://localhost:5000/api/dashboard/features')
			.then((res) => res.json())
			.then((json) => {
				if (Array.isArray(json)) {
					setFeatures(json);
				}
				else {
					throw new Error('Invalid format');
				}
			})
			.catch((err) => {
				console.warn('Using fallback features:', err.message);
				setFeatures(fallbackFeatures);
			});
	}, []);

	return (
		<div>
			<div
				style={{
					padding: '10px',
					backgroundColor: '#e97462',
					color: 'white',
					textAlign: 'center',
					cursor: 'pointer',
				}}
				onClick={playAudio}
			>
				<p style={{ margin: 0, fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>
					Discover Our Features! Click to explore what we offer
				</p>
			</div>

			<div style={{ padding: '60px 20px' }}>
				<h1 style={{ textAlign: 'center', fontSize: '2rem', color: 'black', marginBottom: '40px', marginLeft: '90px' }}>
					Reach New Heights with Cutting-Edge Features
				</h1>

				<p style={{ textAlign: 'center', fontSize: '1rem', color: 'black', maxWidth: '700px', margin: '0 auto 60px' }}>
					Explore the powerful features that will elevate your fitness journey. From real-time tracking to personalized recovery, we’ve built a platform that adapts to your needs.
				</p>

				<div>
					{features.map((feature) => (
						<div
							key={feature.title}
							style={{
								display: 'flex',
								alignItems: 'center',
								padding: '60px 90px',
								backgroundColor: '#e97462',
								marginBottom: '40px',
								marginLeft: '360px',
								marginRight: '250px',
								borderRadius: '15px',
								boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
							}}
						>
							<div style={{ flex: 1, textAlign: 'center' }}>
								<img
									src={feature.icon}
									alt={`${feature.title} icon`}
									style={{
										width: '200px',
										height: '120px',
										marginBottom: '30px',
										objectFit: 'contain',
									}}
								/>
							</div>
							<div style={{ flex: 2 }}>
								<h2
									style={{
										fontSize: '1rem',
										color: 'black',
										marginBottom: '15px',
										textTransform: 'uppercase',
										fontWeight: 'bold',
										letterSpacing: '1.5px',
									}}
								>
									{feature.title}
								</h2>
								<p style={{ fontSize: '1rem', color: 'black', lineHeight: '1.8' }}>
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>

				<div style={{ textAlign: 'center', marginTop: '60px', marginLeft: '400px', marginRight: '250px' }}>
					<div
						style={{
							backgroundColor: '#e97462',
							color: '#ffffff',
							padding: '40px',
							borderRadius: '10px',
							boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
							maxWidth: '80%',
							margin: '0 auto',
						}}
					>
						<blockquote style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '20px' }}>
							“Take the first step in faith. You don’t have to see the whole staircase, just take the first step.”<br />
							<span style={{ fontSize: '0.8rem', fontWeight: 'bold', marginTop: '10px', display: 'block' }}>
								– Martin Luther King Jr.
							</span>
						</blockquote>
					</div>

					<p style={{ fontSize: '1rem', color: 'black', marginTop: '40px', marginBottom: '30px' }}>
						Ready to take your fitness to the next level? Sign up today and unlock these incredible features.
					</p>
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<button
							style={{
								padding: '14px 35px',
								fontSize: '0.8rem',
								backgroundColor: '#e97462',
								color: '#ffffff',
								border: 'none',
								borderRadius: '30px',
								cursor: 'pointer',
							}}
						>
							Join Now and Transform Your Fitness
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Features;
