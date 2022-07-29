import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../logo_normal.png";
import axios from "axios";

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

  // tracks property state w/ 'properties'
  const [properties, setProperties] = useState([
    {
      user_id: "",
      property_description: "",
      property_cost: 0,
      property_quantity: 0,
    },
  ]);

  const [newDescription, setNewDescription] = useState("");
  const [newCost, setNewCost] = useState(0);
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/getuserinfo", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((response) => response.json())
      .then((userData) => setUserData(userData));
  }, []);

  //properties.user_id = userData._id;
  //   console.log("User ID");
  //   console.log(properties.user_id);

  useEffect(() => {
    properties.user_id = userData._id;
    axios
      .get("http://localhost:8080/api/property/get-properties/")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Update property description
  const updateDescription = (id) => {
    axios.put("http://localhost:8080/api/property/update-property", {
      id,
      newDescription,
    });
  };

  // Update property cost
  const updateCost = (id) => {
    axios.put("http://localhost:8080/api/property/update-property", {
      id,
      newCost,
    });
  };

  const updateQuantity = (id) => {
    axios.put("http://localhost:8080/api/property/update-property", {
      id,
      newQuantity,
    });
  };

  const deleteProperty = (id) => {
    axios.delete(`http://localhost:8080/api/property/delete-property/${id}`);
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
        <h2>My Properties</h2>
        <button onClick={navigateToAddProperty}>Add Property</button>
        {properties.map((property, key) => {
          return (
            <div key={key}>
              <h4>Description: {property.property_description}</h4>
              <input
                type="string"
                placeholder="Update description..."
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateDescription(property._id);
                }}
              >
                Update
              </button>
              <h5>Cost: {property.property_cost}</h5>
              <input
                type="number"
                placeholder="Update cost..."
                onChange={(e) => {
                  setNewCost(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateCost(property._id);
                }}
              >
                Update
              </button>
              <h5>Qty: {property.property_quantity}</h5>
              <input
                type="number"
                placeholder="Update quantity..."
                onChange={(e) => {
                  setNewQuantity(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateQuantity(property._id);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  deleteProperty(property._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
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