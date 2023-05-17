import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here, such as making an API request
    // to validate the user's credentials
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Successful login, redirect to NotesListPage
        navigate('api/notes/');
      } else {
        // Handle login error
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset the form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className="loginBoxContainer">
      <h2>Login</h2>
      <form className="loginBox" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-button-div">
          <button className="login-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
