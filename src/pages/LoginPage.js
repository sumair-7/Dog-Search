import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser({ name, email });
      onLoginSuccess();
      navigate("/search");
    } catch {
      setError("Failed to log in.");
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h1>Fetch Dog Finder</h1>
        <p>Please log in to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
