import {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {useNavigate} from "react-router-dom";
import logo from '../../logo_normal.png';
import axios from "axios";


const Admin = () => {
	const [data, setData] = useState({
		email: "",
		firstName: "",
		lastName: ""
	});


	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const navigate = useNavigate()

	const navigateToProfile = () => {
		navigate('/userprofile');
	};

	const navigateToProperty = () => {
		navigate('/property');
	};

	const navigateToAdmin = () => {
		navigate('/admin');
	};

	const navigateHome = () => {
		navigate('/');
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	useEffect(() => {
		fetch("http://localhost:8080/api/users/getuserinfo", {
			headers: {"Content-Type": "application/json"},
			method: "POST",
			body: JSON.stringify({token: localStorage.getItem("token")})
		}).then(response => response.json()).then(data => setData(data));
	}, []);

	const updateDetails = async (e) => {
		e.preventDefault();
		try {
			console.log(data);
			const url = "http://localhost:8080/api/updateprofile";
			const { data: res } = await axios.post(url, data);
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	//Set the page tab title
	useEffect(() => {
		document.title = "Profile - West Boca Make-Believe Retirement Community"
	});

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<img id={styles.logo} src={logo}/>
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
					<button hidden={!data.isAdmin} className={styles.white_btn} onClick={navigateToAdmin}>
						Admin
					</button>
					<button className={styles.white_btn} id={styles.red_hover} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>
			<div id={styles.profile_area}>
				<h1 id={styles.header}>Admin Control Panel</h1>
				<h1 id={styles.section_text}>Modify User Account</h1>
				<div className={styles.row}>
					<div className={styles.columns}>
						<form className={styles.form_container} onSubmit={updateDetails}>
							<h1>User's Current Email</h1>
							<input
								type="text"
								placeholder="First Name"
								name="firstName"
								value={data.email}
								required
								className={styles.input}
							/>
							<button type="submit" className={styles.green_btn}>
								Lookup Account
							</button>
							<h1>Modify User's Information</h1>
							<h3>First Name</h3>
							<input
								type="text"
								placeholder="First Name"
								name="firstName"
								onChange={handleChange}
								value={data.firstName}
								required
								className={styles.input}
							/>
							<h3>Last Name</h3>
							<input
								type="text"
								placeholder="Last Name"
								name="lastName"
								onChange={handleChange}
								value={data.lastName}
								required
								className={styles.input}
							/>
							<h3>Email</h3>
							<input
								type="email"
								placeholder="Email"
								name="email"
								onChange={handleChange}
								value={data.email}
								required
								className={styles.input}
							/>
							<button type="submit" className={styles.green_btn}>
								Update Profile
							</button>
						</form>
					</div>
					<form id={styles.below} className={styles.form_container}>
						<h1>Change User's Password</h1>
						<h3>New Password</h3>
						<input
							type="password"
							placeholder="New Password"
							name="new_password"
							required
							className={styles.input}
						/>
						<h3>Confirm New Password</h3>
						<input
							type="password"
							placeholder="Confirm New Password"
							name="new_password_confirm"
							required
							className={styles.input}
						/>
						{error && <div className={styles.message}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Update Password
						</button>
					</form>
				</div>
			</div>
			<footer>
				<h1>All rights reserved © copyright 2022, West Boca Make-Believe Retirement Community</h1>
			</footer>
		</div>
	);
};

export default Admin;
