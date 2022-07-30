import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../logo_normal.png";
import axios from "axios";
import UpdateProperty from "../UpdateProperty";

const Property = () => {
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

  const [userData, setUserData] = useState({});

  const [getPropertyUserData, setPropertyUserData] = useState({});

  const [error, setError] = useState("");

  // tracks property state w/ 'properties'
  const [properties, setProperties] = useState([
    {
      user_id: "",
      property_description: "",
      property_cost: 0,
      property_quantity: 0,
    },
  ]);

  const goToUpdateProperty = () => {
    navigate("/update-property", {
      state: {
        description: getPropertyUserData.property_description,
        cost: getPropertyUserData.property_cost,
        quantity: getPropertyUserData.property_quantity,
      },
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/users/getuserinfo", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((response) => response.json())
      .then((userData) => setUserData(userData));
  }, []);

  let UsersProperty = [];

  useEffect(async () => {
    if (userData.email !== undefined) {
      getPropertyUserData.email = userData.email;
      try {
        console.log(userData.email);
        const url = "http://localhost:8080/api/property/get-properties/";
        const { userProperties: res } = await axios
          .post(url, getPropertyUserData)
          .then((response) => {
            UsersProperty = response.data;
            console.log(UsersProperty);
            setPropertyUserData(response.data);
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
    }
  }, [userData.email]);

  const deleteProperty = (id) => {
    //axios.delete(`http://localhost:8080/api/property/delete-property/${id}`);
  };

  //Set the page tab title
  useEffect(() => {
    document.title =
      "Your Property - West Boca Make-Believe Retirement Community";
  });

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
      </nav>
      <div className={styles.property_list}>
        <div id={styles.add_property_header}>
          <h2>My Properties</h2>
          <button className={styles.green_btn} onClick={navigateToAddProperty}>
            Add Property
          </button>
        </div>
        <div id={styles.property_table}>
          <table>
            <tbody>
              <tr>
                <th>Property Name</th>
                <th>Property Cost</th>
                <th>Property Quantity</th>
              </tr>
              {getPropertyUserData.length ? (
                getPropertyUserData.map((getPropertyUserData) => (
                  <tr>
                    <td>{getPropertyUserData.property_description}</td>
                    <td>{getPropertyUserData.property_cost}</td>
                    <td>
                      {getPropertyUserData.property_quantity}
                      <button
                        className={styles.delete_btn}
                        onClick={deleteProperty(getPropertyUserData.id)}
                      >
                        Delete
                      </button>
                      <button
                        className={styles.update_btn}
                        onClick={goToUpdateProperty}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </table>
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

export default Property;
