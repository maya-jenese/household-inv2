import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AddProperty from "./components/AddProperty";
import Property from "./components/Property";
import Admin from "./components/Admin";
import UpdateProperty from "./components/UpdateProperty";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0ILE9K94zgkAWr-rueMzgwwfj1hx29o0",
  authDomain: "household-inventory-syst-f39e7.firebaseapp.com",
  projectId: "household-inventory-syst-f39e7",
  storageBucket: "household-inventory-syst-f39e7.appspot.com",
  messagingSenderId: "806507679584",
  appId: "1:806507679584:web:c584e58813b40422781805",
  measurementId: "G-LST1D3NXPY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      {user && <Route path="/userprofile" exact element={<UserProfile />} />}
      {user && <Route path="/Property" exact element={<Property />} />}
      {user && <Route path="/Admin" exact element={<Admin />} />}
      <Route path="/add-property" exact element={<AddProperty />} />
      <Route path="/update-property" exact element={<UpdateProperty />} />
      <Route path="*" element={<Navigate replace to="login" />} />
    </Routes>
  );
}

export default App;
