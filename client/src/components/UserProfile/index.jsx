import {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {useNavigate} from "react-router-dom";
import logo from '../../logo_normal.png';
import axios from "axios";

const UserProfile = () => {
    const [data, setData] = useState({
        email: "",
        firstName: "",
        lastName: ""
    });

    const [authorizedUsers, setAuthorizedUsers] = useState({} );

    const [password_data, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirm: ""
    });

    const [authorizedEmail, setAuthorizedEmail] = useState({
        email: "",
        authorized_email: ""
    });

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handlePasswordChange = ({ currentTarget: input }) => {
        setPasswordData({ ...password_data, [input.name]: input.value });
    };

    const handleSetAuthorizedEmail = ({ currentTarget: input }) => {
        authorizedEmail.email = data.email;
        setAuthorizedEmail({ ...authorizedEmail, [input.name]: input.value });
    };

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

        fetch("http://localhost:8080/api/users/getuserinfo", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({token: localStorage.getItem("token")})
        }).then(response => response.json()).then(password_data => setPasswordData(password_data));
    }, []);

    let authUsers = [];

    useEffect(async () => {
            if (data.email !== "") {
                authorizedEmail.email = data.email
                try {
                    console.log(authorizedEmail.email);
                    const url = "http://localhost:8080/api/updateprofile/get-authorized-users";
                    const {authorizedUsers: res} = await axios.post(url, authorizedEmail)
                        .then((response) => {
                            authUsers = response.data;
                            console.log(authUsers);
                            setAuthorizedUsers(response.data);
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
    }, [data.email]);

    async function GetAuthUserManually() {
        if (data.email !== "") {
            authorizedEmail.email = data.email
            try {
                console.log("Called");
                console.log(authorizedEmail.email);
                const url = "http://localhost:8080/api/updateprofile/get-authorized-users";
                const {authorizedUsers: res} = await axios.post(url, authorizedEmail)
                    .then((response) => {
                        authUsers = response.data;
                        console.log(authUsers);
                        setAuthorizedUsers(response.data);
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
    }

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

    const updatePassword = async (e) => {
        e.preventDefault();
        try {
            console.log(password_data);
            const url = "http://localhost:8080/api/updateprofile/update-password";
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

    const addAuthorizedUser = async (e) => {
        e.preventDefault();
        try {
            console.log(authorizedEmail);
            const url = "http://localhost:8080/api/updateprofile/add-authorized-user";
            const { data: res } = await axios.post(url, authorizedEmail).then((response) => {
                console.log(response);
                GetAuthUserManually();
            });
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                await GetAuthUserManually();
                setError(error.response.data.message);
            }
        }
    };

    const removeAuthorizedUser = async (e) => {
        e.preventDefault();
        try {
            console.log(authorizedEmail);
            const url = "http://localhost:8080/api/updateprofile/remove-authorized-user";
            const { data: res } = await axios.post(url, authorizedEmail).then((response) => {
                console.log(response);
                GetAuthUserManually();
            });
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                await GetAuthUserManually();
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
                <h1 id={styles.section_text}>My Profile</h1>
                <div className={styles.row}>
                    <div className={styles.columns}>
                        <form className={styles.form_container} onSubmit={updateDetails}>
                            <h1>Edit Details</h1>
                            <h3>First Name</h3>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                required
                                className={styles.input}
                            />
                            <h3>Last Name</h3>
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                value={data.lastName}
                                required
                                className={styles.input}
                            />
                            <h3>Email</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />
                            <button type="submit" className={styles.green_btn}>
                                Update Profile
                            </button>
                        </form>
                    </div>
                    <div className={styles.columns}>
                        <form className={styles.form_container} onSubmit={updatePassword}>
                            <h1>Change Password</h1>
                            <h3>Current Password</h3>
                            <input
                                type="password"
                                placeholder="Current Password"
                                name="current_password"
                                onChange={handlePasswordChange}
                                required
                                className={styles.input}
                            />
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
                    <div className={styles.columns}>
                        <form className={styles.form_container} onSubmit={addAuthorizedUser}>
                            <h1>Add Authorized User</h1>
                            <h3>Authorized User's Email</h3>
                            <input
                                type="email"
                                placeholder="Authorized User's Email"
                                name="authorized_email"
                                onChange={handleSetAuthorizedEmail}
                                required
                                className={styles.input}
                            />
                            <button type="submit" className={styles.green_btn}>
                                Add Authorized User
                            </button>
                        </form>
                        <form className={styles.form_container} onSubmit={removeAuthorizedUser}>
                            <h1>Remove Authorized User</h1>
                            <h3>Authorized User's Email</h3>
                            <input
                                type="email"
                                placeholder="Authorized User's Email"
                                name="authorized_email"
                                onChange={handleSetAuthorizedEmail}
                                required
                                className={styles.input}
                            />
                            <button type="submit" className={styles.red_btn}>
                                Remove Authorized User
                            </button>
                        </form>
                    </div>
                </div>
                {error && <div className={styles.message}>{error}</div>}
                <div id={styles.add_user}>
                    <h1 id={styles.section_text}>Authorized Users</h1>
                </div>
                <div id={styles.current_users}>
                    <table>
                        <tbody>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        {authorizedUsers.length ?
                            authorizedUsers.map(authorizedUsers => (
                                <tr>
                                    <td>{authorizedUsers.firstName}</td>
                                    <td>{authorizedUsers.lastName}</td>
                                    <td>{authorizedUsers.email}</td>
                                </tr>
                            ))
                            :
                            (<tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <footer>
                <h1>All rights reserved © copyright 2022, West Boca Make-Believe Retirement Community</h1>
            </footer>
        </div>
    );
};

export default UserProfile;