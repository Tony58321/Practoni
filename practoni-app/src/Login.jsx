import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

// This will be the login page for the user to enter their username and password or create an account if they are a new user
function LoginPage() {
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      navigate("/dashboard"); // Redirect to the dashboard after successful login
    };
  
    // Returns HTML for the login page and handles the login form submission
    return (
      <div className="authorization-container">
        <h1 className="title">PRACTONI</h1>
        <h2 className="subtitle">Returning User Login</h2>
        <form onSubmit={handleLogin} className="authorization-form">
          <div className="username-form">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Enter your username" required />
          </div>
          <div className="password-form">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="authorization-btn">Login</button>
        </form>
        <p className="forgot-password"><a href="#">Forgot your password?</a></p>
        <p className="new-user">New user? <Link to="/signup">Create an account</Link></p>
        <p className="tagline">Keep track of your practice! <br /> Create tasks you hope to accomplish.</p>
      </div>
    );
  }
  
  export default LoginPage; // This is the name we use for routing and importing the component in other files