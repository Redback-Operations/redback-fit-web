import { useState } from 'react';
import { BsTwitter } from 'react-icons/bs';
import { SiLinkedin } from 'react-icons/si';
import { BsYoutube } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import styles from '../../routes/HomePage/HomePage.module.css';

const Footer = () => {
	const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
	const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

	const toggleTermsModal = () => {
		setIsTermsModalOpen(!isTermsModalOpen);
	};

	const togglePrivacyModal = () => {
		setIsPrivacyModalOpen(!isPrivacyModalOpen);
	};

	return (
		<div className={styles['footer-wrapper']}>
			<div className={styles['footer-section-one']}>
				<div className={styles['footer-logo-container']}>
					<p className={styles['primary-subheading']}>ReflexionPro</p>
				</div>
				<div className={styles['footer-icons']}>
					<BsTwitter />
					<a 
						href="https://www.linkedin.com/company/redback-ops/" 
						target="_blank" 
						rel="noopener noreferrer"
					>
						<SiLinkedin />
					</a>
					<a 
						href="https://www.youtube.com/watch?v=KPmSsFT3p2w" 
						target="_blank" 
						rel="noopener noreferrer"
					>
						<BsYoutube />
					</a>
					<FaFacebookF />
				</div>
			</div>
			<div className={styles['footer-section-two']}>
				<div className={styles['footer-section-columns']}>
					<span>244-5333-7783</span>
					<span>contact@reflexionpro.com</span>
					<span>support@reflexionpro.com</span>
					<span>© Athlete Wearable Technology</span>
				</div>
				<div className={styles['footer-section-columns']}>
					<span onClick={toggleTermsModal} className={styles['clickable-text']}>Terms & Conditions</span>
					<span onClick={togglePrivacyModal} className={styles['clickable-text']}>Privacy Policy</span>
				</div>
			</div>
	
			{isTermsModalOpen && (
				<div className={styles['modal-overlay']}>
					<div className={styles['modal-container']}>
						<h2>Terms and Conditions</h2>
						<p>
							Welcome to ReflexionPro!
						</p>
						<p>
							-
						</p>
						<p>
							By accessing our platform, you agree to abide by
							our terms and conditions. Unauthorized use of the website, including but not limited to
							data scraping or content reproduction, is strictly prohibited.
						</p>
						<p>
							-
						</p>
						<p>
							If you have any questions or concerns, please contact support at support@reflexionpro.com
						</p>
						<button onClick={toggleTermsModal} className={styles['close-button']}>
							Close
						</button>
					</div>
				</div>
			)}

			{isPrivacyModalOpen && (
				<div className={styles['modal-overlay']}>
					<div className={styles['modal-container']}>
						<h2>Privacy Policy</h2>
						<p>
							Your privacy is important to us.
						</p>
						<p>
							-
						</p>
						<p>
							ReflexionPro collects and processes your data
							in accordance with applicable privacy laws. We ensure your data is used solely for providing 
							the best experience on our platform.
						</p>
						<p>
							-
						</p>
						<p>
							For detailed information, please contact us at privacy@reflexionpro.com
						</p>
						<button onClick={togglePrivacyModal} className={styles['close-button']}>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Footer;
