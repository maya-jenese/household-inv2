import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo_normal.png";
import axios from "axios";

function UpdateProperty() {
  const { state } = useLocation();
  const { description, cost, quantity } = state;

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/userprofile");
  };

  const navigateToProperty = () => {
    navigate("/property");
  };

  const navigateToAddProperty = () => {
    navigate("/add-property");
  };

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  const navigateHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const [propertyData, setPropertyData] = useState({
    property_description: "",
    property_cost: 0,
    property_quantity: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/users/getuserinfo", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

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

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <img id={styles.logo} src={logo} />
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
          <button
            hidden={!data.isAdmin}
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
      </nav>
      <div id={styles.profile_area}>
        <h1 id={styles.section_text}>Update Property</h1>
        <div className={styles.row}>
          <div className={styles.columns}>
            <form className={styles.form_container} onSubmit={updateDetails}>
              <h1>Edit Property</h1>
              <h3>Property Description</h3>
              <input
                type="text"
                placeholder="Description"
                name="property_description"
                onChange={handleChange}
                value={description}
                required
                className={styles.input}
              />
              <h3>Property Cost</h3>
              <input
                type="number"
                placeholder="Cost"
                name="property_cost"
                onChange={handleChange}
                value={cost}
                required
                className={styles.input}
              />
              <h3>Property Quantity</h3>
              <input
                type="number"
                placeholder="Quantity"
                name="property_quantity"
                onChange={handleChange}
                value={quantity}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.green_btn}>
                Update Property
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProperty;
