import {useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import {useEffect} from "react";
import * as url from "url";

const Main = () => {
	const navigate = useNavigate();

	const navigateToProfile = () => {
		navigate('/userprofile');
	};

	const navigateToProperty = () => {
		navigate('/property');
	};

	const navigateHome = () => {
		navigate('/');
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	//Set the page tab title
	useEffect(() => {
		document.title = "West Boca Make-Believe Retirement Community Property System"
	});

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>West Boca Make-Believe Retirement Community</h1>
				<div className={styles.buttons}>
					<button className={styles.white_btn} onClick={navigateHome}>
						Home
					</button>
					<button className={styles.white_btn} onClick={navigateToProperty}>
						Property
					</button>
					<button className={styles.white_btn} onClick={navigateToProfile}>
						Profile
					</button>
					<button className={styles.white_btn} id={styles.red_hover} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>
			<div className={styles.intro_section}>
				<div id={styles.intro_textbox}>
					<h2>Come Home To Exceptional Senior Living.</h2>
					<p>Providing a safe and secure property system while you enjoy your stay at West Boca Make-Believe
						Retirement Community!</p>
				</div>
			</div>
			<div className={styles.about_us_row}>
				<div className={styles.about_us}>
					<h1>Welcome to West Boca Make-Believe Retirement Community</h1>
					<h2>A place for everyone!</h2>
					<p>
						Serving West Boca and surrounding communities,
						West Boca Make-Believe Retirement Community enhances the well-being of
						South Florida seniors by educating and advocating
						on their behalf, and by providing health care and supportive
						services that meet their physical, emotional, social and
						psychological needs. We are everything you love about your
						neighbors and community wrapped up in one great,
						easy-to-get-to center.
					</p>
				</div>
				<div className={styles.about_us}>
					<h1>Safe property management for all members of our community</h1>
					<h2>A secure and safe system.</h2>
					<p>
						Here at the West Boca Make-Believe Retirement Community
						we offer a state-of-the-art property management system
						to ensure all your belongings and personal items are kept
						safe and are properly tracked while you enjoy your stay
						at our community. If you feel like you want to add
						family or friends to view your property you can!
						Enjoy your stay at the West Boca Make-Believe Retirement
						Community.
					</p>
				</div>
			</div>
			<footer>
				<h1>All rights reserved © copyright 2022, West Boca Make-Believe Retirement Community</h1>
			</footer>
		</div>
	);
};

export default Main;
