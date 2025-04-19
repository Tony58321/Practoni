import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

// This page will handle new users signing up for the app
// It will include a form for the user to fill out with their username, email, and password
// Once the user submits the form, they will be redirected to the signup settings page to select their difficulty
function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup-settings"); // Redirect to signup settings page to select difficulty
    // TODO: send data to backend to create a new user
  };

  return (
    <div className="authorization-container">
      <h1 className="title">PRACTONI</h1>
      <h2 className="subtitle">Sign Up!</h2>
      <form onSubmit={handleSignup} className="authorization-form">
        <div className="username-form">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter a username" required />
        </div>
        <div className="email-form">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div className="password-form">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter a password" required />
        </div>
        <div className="password-form">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" placeholder="Re-enter password" required />
        </div>
        <button type="submit" className="authorization-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage; 