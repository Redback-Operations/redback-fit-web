import styles from './HomePage.module.css';
import Home from '../../components/Home/Home.tsx';
import About from '../../components/About/About.tsx';
import Work from '../../components/Work/Work.tsx';
import Testimonial from '../../components/Testimonial/Testimonial.tsx';
import Contact from '../../components/Contact/Contact.tsx';
import Footer from '../../components/Footer/Footer.tsx';

function HomePage() {
	return (
		<div className="page-container">
			<div className={styles.App}>
				<Home />
				<About />
				<Work />
				<Testimonial />
				<Contact />
				<Footer />
			</div>
		</div>
	);
}

export default HomePage;
