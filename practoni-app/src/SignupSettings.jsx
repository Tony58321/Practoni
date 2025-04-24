import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase"; // Import the Firestore database instance
import "./style.css";

// This page will let the user select their difficulty level
function SignupSettingsPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = async (level) => {
    setSelected(level);
    console.log("Selected difficulty level:", level); // For debugging purposes

    // Save the selected level to Firestore (assuming user is authenticated)
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error("No user is currently logged in.");
        return;
      }

      const userRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore

      await updateDoc(userRef, {
        difficulty: level // Update the difficulty level in Firestore
      });
    
    
    navigate("/dashboard"); // Redirect to the dashboard after selection
    } catch (error) {
      console.error("Error updating difficulty level:", error);
    }
  };

  return (
    <div className="authorization-container">
      <h1 className="title">Select Your Difficulty</h1>
      <p className="subtitle">Choose the level you feel most comfortable at</p>

      <div className="difficulty-options">
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <button
            key={level}
            onClick={() => handleSelect(level)}
            className={`authorization-btn ${selected === level ? "selected" : ""}`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SignupSettingsPage;