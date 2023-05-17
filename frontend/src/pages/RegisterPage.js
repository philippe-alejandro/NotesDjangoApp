import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const { email, firstName, lastName, password, confirmPassword } = formData;

  const createUser = async () => {
    console.log("createUser fetch");
    fetch(`/api/login/`, {
        method: "OPST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data and perform register logic
    if (password === confirmPassword) {
      createUser();
      // Perform registration or registration logic
      console.log('Register Successful');
    } else {
      console.log('Passwords do not match');
    }
    // Reset form data
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="registerBoxContainer">
      <h2>Please Register</h2>
      <form className="registerBox" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleChange} required />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
        </div>
        <div className="register-button-div">
          <button className="register-button" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
