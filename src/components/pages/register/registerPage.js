import React, { useState } from 'react'
import "./register.css"
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack';

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullname: '',
    username:'',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handlechange = (e) => {
    const { name, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      enqueueSnackbar({
        variant: 'error',
        message: 'passwords does not match check properly',
      });
    }

    if (!formData.fullname || !formData.username || !formData.email || !formData.password || !formData.confirm_password) {
      enqueueSnackbar({
        variant: 'warning',
        message: 'All fields are required to login',
      });
    } else {
      enqueueSnackbar({
        variant: 'success',
        message: 'Registration Successful please login!',
      });
      navigate(`/login`);
    }
  };

  return (
    <div className="formWrapper">
      <div className="formText">
        <p>Welcome </p>
        <small>to</small>
        <span>KudiTraka</span>
        <span>Register</span>
      </div>
      <div className="inputContainer">
        <label>fullname</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handlechange}
          placeholder="Enter your fullname"
        />
        <label>username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handlechange}
          placeholder="Enter your username"
        />
        <label>email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handlechange}
          placeholder="Enter your email"
        />
        <label>password</label>
        <input
          type={`password`}
          id="password"
          name="password"
          value={formData.password}
          onChange={handlechange}
        />
        <label>confirm password</label>
        <input
          type={`confirm_password`}
          id="confirm_password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handlechange}
        />
        {/* <Link to={`#`} className="forgetLink">forgotten password?</Link> */}
        <button onClick={handleSubmit}>Register</button>
        <p className="noAccount">already have an account ? <Link to={`/login`}>login</Link></p>
      </div>
    </div>
  )
}
