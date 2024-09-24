import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import styles from '../../routes/HomePage/HomePage.module.css';

const Testimonial = () => {
	return (
		<div className={styles['work-section-wrapper']}>
			<div className={styles['work-section-top']}>
				<h1 className={styles['primary-heading']}>What They Are Saying</h1>
				<p className={styles['primary-text']}>
          Athletes’ Success Stories
				</p>
			</div>
			<div className={styles['testimonial-section-bottom']}>
				<h2>Ricky Carson</h2>
				<br />
				<img src="https://img.freepik.com/premium-photo/portrait-male-athlete-taking-selfie-mobile-phone-red-race-track_23-2148162215.jpg" alt="" className={styles['circular-image']}/>
				<p>
          This platform transformed my training. The personalized insights have been a game-changer. I’ve never felt more in control of my performance. The predictive tools are spot on.
				</p>
				<div className={styles['testimonials-stars-container']}>
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
				</div>
				<h2>Lara Johnson</h2>
				<br />
				<img src="https://www.massgeneralbrigham.org/content/mgb-global/global/en/about/newsroom/articles/iron-supplements-for-female-athletes/_jcr_content/root/container_1214295969/image.coreimg.jpeg/1687538330257/iron-deficiency-1070x700.jpeg" alt="" className={styles['circular-image']}/>
				<p>
          Using this platform has completely changed my approach to training. The customized recommendations have been a breakthrough, providing me with exceptional clarity and control over my progress.
				</p>
				<div className={styles['testimonials-stars-container']}>
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
				</div>
			</div>
		</div>
	);
};

export default Testimonial;