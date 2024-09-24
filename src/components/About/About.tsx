import AboutBackground from '../../assets/about-background.png';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import styles from '../../routes/HomePage/HomePage.module.css';

const About = () => {
	return (
		<div className={styles['about-section-container']}>
			<div className={styles['about-background-image-container']}>
				<img src={AboutBackground} alt="" />
			</div>
			<div className={styles['about-section-image-container']}>
				<img src="https://media.gq.com/photos/59e76aaaf964810d9a9b8d2f/16:9/w_2560%2Cc_limit/GQ_50Greatest_final_v2.jpg" alt="" />
			</div>
			<div className={styles['about-section-text-container']}>
				<h1 className={styles['primary-heading']}>
          What We Do
				</h1>
				<p className={styles['primary-text']}>
          We combine the power of wearable technology and advanced analytics to offer athletes personalized insights and predictive tools.
				</p>
				<p className={styles['primary-text']}>
          Whether you’re a runner, cyclist, or swimmer, our platform provides the data you need to optimize your training and performance.
				</p>
				<div className={styles['about-buttons-container']}>
					<button className={styles['secondary-button']}>Learn More</button>
					<button className={styles['watch-video-button']}>
						<BsFillPlayCircleFill /> Watch Video
					</button>
				</div>
			</div>
		</div>
	);
};

export default About;