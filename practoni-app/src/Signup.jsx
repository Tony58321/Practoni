import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignUpUser from "./firebase/signupUser"; // Import the signup function from firebase
import "./style.css";

// This page will handle new users signing up for the app
// It will include a form for the user to fill out with their username, email, and password
// Once the user submits the form, they will be redirected to the signup settings page to select their difficulty
function SignupPage() {
  const navigate = useNavigate();

  // Firebase implementation for signing up a user
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState(null);


  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      await SignUpUser(email, password, username); // Call the signup function with email, password, and username
      console.log("User signed up successfully:", username, email);
      setError(null); // Clear any previous error messages
      navigate("/signup-settings"); // Redirect to signup settings page to select difficulty
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="authorization-container">
      <h1 className="title">PRACTONI</h1>
      <h2 className="subtitle">Sign Up!</h2>
      <form onSubmit={handleSignup} className="authorization-form">
        <div className="username-form">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Enter a username" 
            required 
            onChange={(e) => setUsername(e.target.value)} // Update username state
          />
        </div>
        <div className="email-form">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            required 
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
        </div>
        <div className="password-form">
          <label htmlFor="password">Password:</label>
          <input
            type="password" 
            id="password" 
            placeholder="Enter a password" 
            required
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>
        <div className="password-form">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password" 
            id="confirm-password" 
            placeholder="Re-enter password" 
            required 
            onChange={(e) => setConfirm(e.target.value)} // Update confirm password state
          />
        </div>
        <button type="submit" className="authorization-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage; 