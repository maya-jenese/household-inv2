import { useEffect, useState } from "react";
import styles from "./styles.module.css";


const UserProfile = () => {
    const [data, setData] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    
    useEffect(() => {
        fetch("http://localhost:8080/api/users/getuserinfo", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({token: localStorage.getItem("token")})
        }).then(response => response.json()).then(data => setData(data.message));
    }, []);

    return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Household Inventory System</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
	  <h2> Hi, there!</h2>
      <ul>{data}</ul>
    </div>
    );
};

export default UserProfile;