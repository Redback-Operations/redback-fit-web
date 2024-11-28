import { BsTwitter } from 'react-icons/bs';
import { SiLinkedin } from 'react-icons/si';
import { BsYoutube } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import styles from '../../routes/HomePage/HomePage.module.css';

const Footer = () => {
	return (
		<div className={styles['footer-wrapper']}>
			<div className={styles['footer-section-one']}>
				<div className={styles['footer-logo-container']}>
					<p className={styles['primary-subheading']}>Athlete Wearable Technology</p>
				</div>
				<div className={styles['footer-icons']}>
					<BsTwitter />
					<SiLinkedin />
					<BsYoutube />
					<FaFacebookF />
				</div>
			</div>
			<div className={styles['footer-section-two']}>
				<div className={styles['footer-section-columns']}>
					<span>244-5333-7783</span>
					<span>info@athletewearabletech.com</span>
					<span>support@athletewearabletech.com</span>
					<span>© Athlete Wearable Technology</span>
				</div>
				<div className={styles['footer-section-columns']}>
					<span>Terms & Conditions</span>
					<span>Privacy Policy</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;