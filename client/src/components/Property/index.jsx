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

  const goToUpdateProperty = () => {
    navigate("/update-property", {
      state: {
        description: getPropertyUserData.property_description,
        cost: getPropertyUserData.property_cost,
        quantity: getPropertyUserData.property_quantity,
      },
    });
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

  const deleteProperty = (id, email) => {
    axios.delete(`http://localhost:8080/api/property/delete-property/${id}`);
    window.location.reload(false);
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
        {/* {properties.map((property, key) => {
          return (
            <div id={styles.property_form} key={key}>
              <h4>Description: {property.property_description}</h4>
              <input
                className={styles.input}
                type="string"
                placeholder="Update description..."
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              />
              <button
                className={styles.green_btn}
                onClick={() => {
                  updateDescription(property._id);
                }}
              >
                Update
              </button>
              <h5>Cost: {property.property_cost}</h5>
              <input
                className={styles.input}
                type="number"
                placeholder="Update cost..."
                onChange={(e) => {
                  setNewCost(e.target.value);
                }}
              />
              <button
                className={styles.green_btn}
                onClick={() => {
                  updateCost(property._id);
                }}
              >
                Update
              </button>
              <h5>Qty: {property.property_quantity}</h5>
              <input
                className={styles.input}
                type="number"
                placeholder="Update quantity..."
                onChange={(e) => {
                  setNewQuantity(e.target.value);
                }}
              />
              <button
                className={styles.green_btn}
                onClick={() => {
                  updateQuantity(property._id);
                }}
              >
                Update
              </button>
              <button
                className={styles.green_btn}
                onClick={() => {
                  deleteProperty(property._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })} */}

        <div id={styles.property_table}>
          <table>
            <tbody>
              <tr>
                <th>Property Name</th>
                <th>Property Cost ($)</th>
                <th>Property Quantity</th>
              </tr>
              {getPropertyUserData.length ? (
                getPropertyUserData.map((getPropertyUserData) => (
                  <>
                    <tr>
                      <td>{getPropertyUserData.property_description}</td>
                      <td>{getPropertyUserData.property_cost}</td>
                      <td>{getPropertyUserData.property_quantity}</td>
                    </tr>
                    <button
                      className={styles.green_btn}
                      onClick={goToUpdateProperty}
                    >
                      Update
                    </button>
                    <button
                      className={styles.green_btn}
                      onClick={() => {
                        deleteProperty(
                          getPropertyUserData._id,
                          getPropertyUserData.email
                        );
                      }}
                    >
                      Delete
                    </button>
                  </>
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
