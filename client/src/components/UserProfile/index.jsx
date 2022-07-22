import {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {useNavigate} from "react-router-dom";
import logo from '../../logo_normal.png';


const UserProfile = () => {
    const navigate = useNavigate()

    const [data, setData] = useState("");

    const navigateToProfile = () => {
        navigate('/userprofile');
    };

    const navigateToProperty = () => {
        navigate('/property');
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
        }).then(response => response.json()).then(data => setData(data.message));
    }, []);

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
                    <button className={styles.white_btn} id={styles.red_hover} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div id={styles.profile_area}>
                <h1 id={styles.section_text}>My Profile</h1>
                <div className={styles.row}>
                    <div className={styles.columns}>
                        <h1>Edit Details</h1>
                        <h3>First Name</h3>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="fname"
                            value={data.fname}
                            required
                            className={styles.input}
                        />
                        <h3>Last Name</h3>
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lname"
                            value={data.lname}
                            required
                            className={styles.input}
                        />
                        <h3>Email</h3>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.green_btn}>
                            Update Profile
                        </button>
                    </div>
                    <div className={styles.columns}>
                        <h1>Change Password</h1>
                        <h3>Current Password</h3>
                        <input
                            type="password"
                            placeholder="Current Password"
                            name="email"
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <h3>New Password</h3>
                        <input
                            type="password"
                            placeholder="New Password"
                            name="email"
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.green_btn}>
                            Update Password
                        </button>
                    </div>
                </div>
                <div id={styles.add_user}>
                    <h1 id={styles.section_text}>Add Authorized Users</h1>
                    <button type="submit" className={styles.green_btn}>
                        + Add User
                    </button>
                    <button type="submit" className={styles.red_btn}>
                        - Remove User
                    </button>
                </div>
                <div id={styles.current_users}>
                    <table>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        <tr>
                            <td>Alex</td>
                            <td>Smith</td>
                            <td>alex.smith@gmail.com</td>
                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john.doe@gmail.com</td>
                        </tr>
                    </table>
                </div>
            </div>
            <ul>{data}</ul>
            <footer>
                <h1>All rights reserved © copyright 2022, West Boca Make-Believe Retirement Community</h1>
            </footer>
        </div>
    );
};

export default UserProfile;