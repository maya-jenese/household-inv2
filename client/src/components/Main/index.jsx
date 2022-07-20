import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
	const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate('/userprofile');
    };
	
	const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
	};

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Household Inventory System</h1>
		<button className={styles.white_btn} onClick={navigateToProfile}>
          Profile
        </button>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
	  <h2>Welcome!</h2>
    </div>
  );
};

export default Main;
