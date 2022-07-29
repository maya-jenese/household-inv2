import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AddProperty from "./components/AddProperty";
import Property from "./components/Property";
import Admin from "./components/Admin";
import UpdateProperty from "./components/UpdateProperty";

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
