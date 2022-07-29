import {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {useNavigate} from "react-router-dom";
import logo from '../../logo_normal.png';
import axios from "axios";


const Admin = () => {
	const [data, setData] = useState("");
	//Storing User Data
	const [userData, setUserData] = useState([]);

	//Setting User Data and sending to Database
	const [newUserData, setNewUserData] = useState({
		old_email: ""
	});

	const handleNewUserData = ({ currentTarget: input }) => {
		newUserData.old_email = userData.email;
		setNewUserData({ ...newUserData, [input.name]: input.value });
	};

	//Getting User Data
	const [userEmailLookup, setUserEmailLookup] = useState({
		email: ""
	});

	//User Password Changes
	const [password_data, setPasswordData] = useState({
		email: "",
		new_password: "",
		new_password_confirm: ""
	});

	const handlePasswordChange = ({ currentTarget: input }) => {
		password_data.email = userData.email;
		setPasswordData({ ...password_data, [input.name]: input.value });
	};

	const handleEmailLookup = ({ currentTarget: input }) => {
		setUserEmailLookup({ ...userEmailLookup, [input.name]: input.value });
	};


	const [error, setError] = useState("");
	const [errorUser, setErrorUser] = useState("");

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

	const setNewUserDetails = async (e) => {
		e.preventDefault();
		try {
			console.log(newUserData);
			const url = "http://localhost:8080/admin/set-user-details";
			const { data: res } = await axios.post(url, newUserData);
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

	const getUserData = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/admin/get-user";
			const {userData: res} = axios.post(url, userEmailLookup).then(function (response)
			{
				setUserData(response.data);
				console.log(userData);
			});
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

	const updatePassword = async (e) => {
		e.preventDefault();
		try {
			console.log(password_data);
			const url = "http://localhost:8080/admin/set-user-password";
			const { data: res } = await axios.post(url, password_data);
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
				<h1 id={styles.section_text}>Lookup & Modify User's Account</h1>
				<div className={styles.row}>
					<div className={styles.columns}>
						<form className={styles.form_container} onSubmit={getUserData}>
							<h1 className={styles.form_section}>User's Current Email</h1>
							<input
								type="text"
								placeholder="User's Email"
								name="email"
								onChange={handleEmailLookup}
								required
								className={styles.input}
							/>
							<button type="submit" className={styles.green_btn}>
								Lookup Account
							</button>
						</form>
						<form className={styles.form_container} onSubmit={setNewUserDetails}>
							<h1 className={styles.form_section}>Modify User's Information</h1>
							<h3>User's First Name</h3>
							<input
								type="text"
								placeholder="User's First Name"
								name="firstName"
								onChange={handleNewUserData}
								defaultValue={userData.firstName}
								required
								className={styles.input}
							/>
							<h3>User's Last Name</h3>
							<input
								type="text"
								placeholder="User's Last Name"
								name="lastName"
								defaultValue={userData.lastName}
								onChange={handleNewUserData}
								required
								className={styles.input}
							/>
							<h3>User's Email</h3>
							<input
								type="email"
								placeholder="User's Email"
								name="email"
								defaultValue={userData.email}
								onChange={handleNewUserData}
								required
								className={styles.input}
							/>
							<button type="submit" className={styles.green_btn}>
								Update Profile
							</button>
							{error && <div className={styles.message}>{error}</div>}
						</form>
					</div>
					<form id={styles.below} className={styles.form_container} onSubmit={updatePassword}>
						<h1 className={styles.form_section}>Change User's Password</h1>
						<h3>New Password</h3>
						<input
							type="password"
							placeholder="New Password"
							name="new_password"
							onChange={handlePasswordChange}
							required
							className={styles.input}
						/>
						<h3>Confirm New Password</h3>
						<input
							type="password"
							placeholder="Confirm New Password"
							name="new_password_confirm"
							onChange={handlePasswordChange}
							required
							className={styles.input}
						/>
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
