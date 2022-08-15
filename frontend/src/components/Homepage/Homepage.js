import React from "react";
import { Link } from "react-router-dom";

function Homepage({ user }) {
  return (
    <div className="text-center">
      <h1 id="heading">THAPAR HOSTEL</h1>
      <h4 style={{ textAlign: "right", marginRight: "15px" }}>
        Welcome, {user.name}
      </h4>
      <div>
        <Link
          to="/profile"
          style={{ textDecoration: "none", fontSize: "30px" }}
        >
          Profile
        </Link>
      </div>
      <div>
        <Link to="/rooms" style={{ textDecoration: "none", fontSize: "30px" }}>
          Check Room Availability
        </Link>
      </div>
      <div>
        <Link
          to="/booking"
          style={{ textDecoration: "none", fontSize: "30px" }}
        >
          Book Hostel
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
