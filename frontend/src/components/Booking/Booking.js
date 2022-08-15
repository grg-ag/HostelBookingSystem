import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Booking({ user }) {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    rollno: user.rollno,
    hostelNumber: "",
    roomNumber: "",
    mess: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9002/submit", details).then((res) => {
      console.log(res);
      if (res.data.message === "Room Booked Successfully") {
        axios.put("http://localhost:9002/user", details).then((u) => {
          console.log(u);
        });
        axios.put("http://localhost:9002/roomUpdate", details).then((u) => {
          console.log(u);
        });
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <div>
      <div>
        {user.booked ? (
          <h1 className="text-center text-success">You have already Booked</h1>
        ) : (
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100 text-center">
              <h1 id="heading">Book Your Hostel</h1>
              <div className="col-12 col-md-8 col-lg-6 col-xl-5" id="login-box">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="hostelNumber"
                    name="hostelNumber"
                    value={details.hostelNumber}
                    onChange={handleChange}
                    placeholder="Enter the Hostel Number :"
                  />
                  <label htmlFor="floatingInput">
                    Enter the Hostel Number :
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="roomNumber"
                    name="roomNumber"
                    value={details.roomNumber}
                    onChange={handleChange}
                    placeholder="Enter the Room Number : "
                  />
                  <label htmlFor="floatingInput">Enter the Room Number :</label>
                </div>
                <label>Do You want to opt for Mess ? </label> &nbsp;
                <input
                  type="checkbox"
                  name="mess"
                  checked={details.mess}
                  onChange={handleChange}
                />
                <br />
                <br />
                <button
                  type="button"
                  id="book"
                  className="btn btn-danger"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
