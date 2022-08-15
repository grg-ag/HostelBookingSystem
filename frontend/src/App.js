import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Booking from "./components/Booking/Booking";
import Rooms from "./components/Rooms/Rooms";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          {user && user._id ? (
            <Route exact path="/" element={<Homepage user={user} />} />
          ) : (
            <Route
              exact
              path="/login"
              element={<Login setLoginUser={setLoginUser} />}
            />
          )}
          <Route
            exact
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile user={user} />} />
          <Route exact path="/booking" element={<Booking user={user} />} />
          <Route exact path="/rooms" element={<Rooms user={user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
