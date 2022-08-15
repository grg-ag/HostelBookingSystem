import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setLoginUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9002/login", user).then((res) => {
      if (res.data.message === "User not Registered") {
        alert("Invalid Email Id or Password");
      } else {
        setLoginUser(res.data.user);
        navigate("/");
      }
    });
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100 text-center">
        <h1 id="heading">LOGIN</h1>
        <div className="col-12 col-md-8 col-lg-6 col-xl-5" id="login-box">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email address"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <br />
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <br />
          <button
            id="login"
            type="button"
            className="btn btn-danger"
            onClick={login}
          >
            Login
          </button>
          <br />
          <br />
          Don't have an account ?
          <button
            type="button"
            id="Register"
            className="btn btn-link"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
