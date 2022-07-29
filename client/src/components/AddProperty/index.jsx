import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import logo from '../../logo_normal.png';
import axios from 'axios';

const AddProperty = () => {
  const [userData, setUserData] = useState({});

  const [propertyData, setPropertyData] = useState({
    user_id: '',
    property_description: '',
    property_cost: 0,
    property_quantity: 0,
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/userprofile');
  };


  const navigateHome = () => {
    navigate('/');
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPropertyData({
      ...propertyData,
      [name]: value
    })
  };

// Gets user data
  useEffect(() => {
    fetch("http://localhost:8080/api/users/getuserinfo", {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({token: localStorage.getItem("token")})
    }).then(response => response.json()).then(userData => setUserData(userData));
  }, []);

  const addPropertyToList = async (e) => {
    e.preventDefault();
    try {
      propertyData.user_id = userData._id;
      console.log(propertyData);
      const url = "http://localhost:8080/api/property"; // api url that you're trying to access
      const { data: res } = await axios.post(url, propertyData); // 2nd param = info getting put into req.body
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


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
      <>
        <div className="CreateBook">
          <div className="container">
            <div className="row">
              <div className={styles.main_container}>
                <nav className={styles.navbar}>
                  <img id={styles.logo} src={logo}/>
                  <h1>West Boca Make-Believe Retirement Community</h1>
                  <div className={styles.buttons}>
                    <button className={styles.white_btn} onClick={navigateHome}>
                      Home
                    </button>
                    <button className={styles.white_btn} onClick={navigateToProfile}>
                      Profile
                    </button>
                    <button className={styles.white_btn} id={styles.red_hover} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </nav>
              </div>
              <div className="col-md-8 m-auto">
                <br />
                <Link to="/property" className="btn btn-outline-warning float-left">
                  Show Property List
                </Link>
              </div>
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Property</h1>
                <p className="lead text-center">
                  Create new property
                </p>
                <div className={styles.property_list}>
                  <form noValidate onSubmit={addPropertyToList}>
                    <div className='form-group'>
                      <input
                          type='text'
                          placeholder='Property Description'
                          name='property_description'
                          className='form-control'
                          value={propertyData.property_description}
                          onChange={onChange}
                      />
                    </div>
                    <br />

                    <div className='form-group'>
                      <input
                          type='number'
                          placeholder='Property Cost'
                          name='property_cost'
                          className='form-control'
                          value={propertyData.property_cost}
                          onChange={onChange}
                      />
                    </div>

                    <div className='form-group'>
                      <input
                          type='number'
                          placeholder='Property Quantity'
                          name='property_quantity'
                          className='form-control'
                          value={propertyData.property_quantity}
                          onChange={onChange}
                      />
                    </div>

                    <input
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <h1>All rights reserved © copyright 2022, West Boca Make-Believe Retirement Community</h1>
        </footer>
      </>
  );
};

export default AddProperty;