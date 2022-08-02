import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../logo_normal.png";
import axios from "axios";
import { Upload } from "upload-js";

const ViewImages = () => {
	const [userData, setUserData] = useState({});

	const {state} = useLocation();

	const upload = new Upload({apiKey: "public_12a1xnu4Vp3cu46nRxmH9jMGTdR8"});

	var UploadButton = () => {
		var uploadFile = upload.createFileInputHandler({
			onUploaded: ({fileUrl, fileId}) => {
				propertyData.image_id_to_add = fileId;
				addImageToProperty();
				alert("Image has been uploaded. Refresh to see.");
			}
		});

		return <input type="file" onChange={uploadFile}/>
	}

	const { property_id } = state;

	const [propertyData, setPropertyData] = useState({
		property_id_to_add: property_id,
		image_id_to_add: ""
	});

	const [imageData, getImageData] = useState({
		property_id_to_get: property_id,
	});

	const [imageIds, setImageIds] = useState({});

	const [error, setError] = useState("");

	const navigate = useNavigate();

	const navigateToProfile = () => {
		navigate("/userprofile");
	};

	const navigateToProperty = () => {
		navigate("/property");
	};

	const navigateToAdmin = () => {
		navigate("/admin");
	};

	const navigateHome = () => {
		navigate("/");
	};

	// Gets user data
	useEffect(() => {
		fetch("http://localhost:8080/api/users/getuserinfo", {
			headers: {"Content-Type": "application/json"},
			method: "POST",
			body: JSON.stringify({token: localStorage.getItem("token")}),
		})
			.then((response) => response.json())
			.then((userData) => setUserData(userData));
	}, []);

	let image_array_json = [];

	// Get images
	useEffect(async () => {
		if (imageData.property_id !== "") {
			try {
				console.log(imageData)
				const url = "http://localhost:8080/api/property/return-images";
				const {imagedata: res} = await axios.post(url, imageData)
					.then((response) => {
						image_array_json = response.data;
						console.log(image_array_json);
						setImageIds(response.data);
					})
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		}
	}, [imageData.property_id]);

	const addImageToProperty = async (e) => {
		try {
			console.log(propertyData);
			const url = "http://localhost:8080/api/property/add-a-image"; // api url that you're trying to access
			const {data: res} = await axios.post(url, propertyData); // 2nd param = info getting put into req.body
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
		document.title = "Property Images - West Boca Make-Believe Retirement Community"
	});


	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="container">
			<div className="row">
				<div className={styles.main_container}>
					<nav className={styles.navbar}>
						<img id={styles.logo} src={logo}/>
						<h1>West Boca Make-Believe Retirement Community</h1>
						<div className={styles.buttons}>
							<div className={styles.buttons}>
								<button className={styles.white_btn} onClick={navigateHome}>
									Home
								</button>
								<button
									className={styles.white_btn}
									onClick={navigateToProperty}
								>
									Property
								</button>
								<button
									className={styles.white_btn}
									onClick={navigateToProfile}
								>
									Profile
								</button>
								<button
									hidden={!userData.isAdmin}
									className={styles.white_btn}
									onClick={navigateToAdmin}
								>
									Admin
								</button>
								<button
									className={styles.white_btn}
									id={styles.red_hover}
									onClick={handleLogout}
								>
									Logout
								</button>
							</div>
						</div>
					</nav>
					<div id={styles.property}>
						{imageIds.length ? (
							imageIds.map((imageIds) => (
								<img src={upload.url(imageIds)} alt={"Image"}/>
							))
						) : (
							<h1 id={styles.no_images}> No images found. </h1>
						)}
						<div id={styles.section_text}>
							<div className="col-md-8 m-auto">
								<div id={styles.add_img}>
									<h3>Add Image:</h3>
									<UploadButton/>
								</div>
								<button
									className={styles.green_btn}
									onClick={navigateToProperty}>
									Return to Property
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer>
				<h1>
					All rights reserved © copyright 2022, West Boca Make-Believe
					Retirement Community
				</h1>
			</footer>
		</div>
	);
};

export default ViewImages;
