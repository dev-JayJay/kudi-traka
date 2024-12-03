import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const LoginPage = () => {
  const navigate = useNavigate();
  // const [authenticated, setAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      enqueueSnackbar({
        variant: 'warning',
        message: 'All fields are required to login',
      });
    } else if (formData.username && formData.password === 'kudi_traka_admin') {
      localStorage.setItem('authenticated',true);
      enqueueSnackbar({
        variant: 'success',
        message: 'login successful!'
      })
      navigate('/admin');
    } else {
      localStorage.setItem('authenticated',true);
      localStorage.setItem('username', formData.username);
      enqueueSnackbar({
        variant: 'success',
        message: 'login successful!'
      });
      navigate('/chat-with-misa');
    }

  };
  return (
    <div className="formWrapper">
      <div className="formText">
        <p>Welcome back </p>
        <small>to</small>
        <span>KudiTraka</span>
      </div>
      <div className="inputContainer">
        <label>username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
        <label>password</label>
        <input
          type={`password`}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Link to={`#`} className="forgetLink">forgotten password?</Link>
        <button onClick={handleSubmit}>Login</button>
        <p className="noAccount">Don't have an account ? <Link to={`/register`}>register</Link></p>
      </div>
    </div>
  );
};
