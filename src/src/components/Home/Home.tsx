import BannerBackground from '../../assets/home-banner-background.png';
import Navbar from '.././NavBar/NavBar';
import { FiArrowRight } from 'react-icons/fi';
import styles from '../../routes/HomePage/HomePage.module.css';

const Home = () => {
	return (
		<div className={styles['home-container']}>
			<Navbar />
			<div className={styles['home-banner-container']}>
				<div className={styles['home-bannerImage-container']}>
					<img src={BannerBackground} alt="" />
				</div>
				<div className={styles['home-text-section']}>
					<h1 className={styles['primary-heading']}>
            Elevate Your Game with Advanced Wearable Tech
					</h1>
					<p className={styles['primary-text']}>
            Harness advanced data analytics and predictive models to reach your athletic potential across multiple sports disciplines.
					</p>
					<button className={styles['secondary-button']}>
            Start Your Journey <FiArrowRight />
					</button>
				</div>
				<div className={styles['home-image-section']}>
					<img src="https://honehealth.com/wp-content/uploads/2023/04/Muscles_Worked-Running-1.webp" alt="" />
				</div>
			</div>
		</div>
	);
};

export default Home;