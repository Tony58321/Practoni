import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import SignupSettingsPage from "./SignupSettings";
import PracticeTasks from "./Tasks";

// This is the main App component that sets up the routing for the application
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup-settings" element={<SignupSettingsPage />} />
          <Route path="/dashboard" element={<PracticeTasks />} />
        </Routes>
    </Router>
  );
}


export default App;
