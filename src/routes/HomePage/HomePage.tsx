import { useEffect } from 'react';
import styles from './HomePage.module.css';
import Home from '../../components/Home/Home.tsx';
import About from '../../components/About/About.tsx';
import Work from '../../components/Work/Work.tsx';
import Testimonial from '../../components/Testimonial/Testimonial.tsx';
import Contact from '../../components/Contact/Contact.tsx';
import Footer from '../../components/Footer/Footer.tsx';

function HomePage() {
	useEffect(() => {
		// Set the body background color when the HomePage mounts
		document.body.style.backgroundColor = '#f8f9fa';

		// Reset the background color when the HomePage unmounts
		return () => {
			document.body.style.backgroundColor = '';  // Reset to default or a specific color
		};
	}, []);

	return (
		<div className={styles.App}>
			<Home />
			<About />
			<Work />
			<Testimonial />
			<Contact />
			<Footer />
		</div>
	);
}

export default HomePage;
