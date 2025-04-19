import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

// This page will let the user select their difficulty level
function SignupSettingsPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (level) => {
    setSelected(level);
    navigate("/dashboard"); // Redirect to the dashboard after selection
    console.log("Selected difficulty level:", level); // For debugging purposes
    // TODO: Save the selected level to the user's profile in the database
  };

  return (
    <div className="authorization-container">
      <h1 className="title">Select Your Difficulty</h1>
      <p className="subtitle">Choose the level you feel most comfortable at</p>

      <div className="difficulty-options">
        {["Easy", "Medium", "Hard"].map((level) => (
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