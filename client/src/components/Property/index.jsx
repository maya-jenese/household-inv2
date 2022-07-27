import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {useNavigate} from "react-router-dom";
import logo from "../../logo_normal.png";
import axios from "axios";



const Property = () => {
	const navigate = useNavigate();

	const [error, setError] = useState("");
	// const [data, setData] = useState("");
	const [userData, setUserData] = useState({});

	// tracks property state w/ 'properties'
	const [properties, setProperties] = useState([{
		user_id: '',
		property_description: '',
		property_cost: 0,
		property_quantity: 0
	}]);

	// useEffect(() => {
	// 	fetch("http://localhost:8080/api/property")
	// 		.then(res => res.json())
	// 		.then(jsonRes => setProperties(jsonRes));
	// 	console.log("HERE")
	// 	console.log(properties);
	// }, []);

	const navigateToProfile = () => {
		navigate('/userprofile');
	};

	const navigateToProperty = () => {
		navigate('/property');
	};

	const navigateToAddProperty = () => {
		navigate('/add-property');
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

	// useEffect(() => {
	// 	fetch("http://localhost:8080/api/users/getuserinfo", {
	// 		headers: {"Content-Type": "application/json"},
	// 		method: "POST",
	// 		body: JSON.stringify({token: localStorage.getItem("token")})
	// 	}).then(response => response.json()).then(data => setData(data));
	// }, []);


	// Gets user data
	useEffect(() => {
		fetch("http://localhost:8080/api/users/getuserinfo", {
			headers: {"Content-Type": "application/json"},
			method: "POST",
			body: JSON.stringify({token: localStorage.getItem("token")})
		}).then(response => response.json()).then(userData => setUserData(userData));
	}, []);

	useEffect(() => {
		// axios.get('http://localhost:8080/property').then(res => {
		// 	setProperties(res.data.data.properties);
		// })

		// axios.get('http://localhost:8080/property')
		// 	.then(res => res.json())
		// 	.then(jsonRes => setProperties(jsonRes));

		try {
			properties.user_id = userData._id;
			  console.log(properties);
			  const url = "http://localhost:8080/api/property"; // api url that you're trying to access
			  const { data: res } = axios.get(url, properties); // 2nd param = info getting put into req.body
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
	}, []);
	
	//Set the page tab title
	useEffect(() => {
		document.title = "Your Property - West Boca Make-Believe Retirement Community"
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
					<button hidden={!userData.isAdmin} className={styles.white_btn} onClick={navigateToAdmin}>
						Admin
					</button>
					<button className={styles.white_btn} id={styles.red_hover} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>
			<div className={styles.property_list}>
				<h2>My Properties</h2>
					{
						properties.map((property, key) => {
						<div key={key}>
						<h4>Description: {property.property_description}</h4>
						<p>Cost: {property.property_cost}</p>
						<p>Qty: {property.property_quantity}</p>
						</div>
						})
					}
					</div>
				<button onClick={navigateToAddProperty}>Add Property</button>
			<footer>
				<h1>All rights reserved © copyright 2022, West Boca Make-Believe Retirement Community</h1>
			</footer>
		</div>
	);
};

export default Property;