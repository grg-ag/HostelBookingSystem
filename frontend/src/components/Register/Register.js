import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    rollno: "",
    gender: "",
    email: "",
    password: "",
    reEnterPassword: "",
    booked: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, rollno, gender, email, password, reEnterPassword } = user;
    if (
      name &&
      rollno &&
      gender &&
      email &&
      password &&
      reEnterPassword &&
      password === reEnterPassword
    ) {
      axios.post("http://localhost:9002/register", user).then((res) => {
        if (res.data.message === "User Successfully Registered") {
          navigate("/login");
        } else {
          alert("User already Registered");
        }
      });
    } else {
      alert("invalid input");
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-center">
          <h1 id="register-heading">Create Account</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              required
            />
            <label htmlFor="floatingInput">Enter Your Name</label>
          </div>
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="rollno"
              name="rollno"
              value={user.rollno}
              onChange={handleChange}
              placeholder="Enter Your Roll No."
            />
            <label htmlFor="floatingInput">Enter Your Roll No.</label>
          </div>
          <br />
          <div>
            Select Gender : &nbsp;&nbsp;
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
            />
            &nbsp;
            <label>Male</label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
            />
            &nbsp;
            <label>Female</label>
          </div>
          <br />
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email address"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="rePassword"
              name="reEnterPassword"
              value={user.reEnterPassword}
              onChange={handleChange}
              placeholder="Re-enter Password"
            />
            <label htmlFor="floatingPassword">Re-enter Password</label>
          </div>
          <br />
          <button
            type="button"
            id="register"
            className="btn btn-danger"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
