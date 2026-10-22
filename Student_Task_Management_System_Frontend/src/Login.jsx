
import React, { useState } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Demo login only. This does not verify credentials with a server.
    onLogin();
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">🎓</div>

        <h1>StudySpace</h1>
        <p className="login-subtitle">
          Your study planner, all in one place.
        </p>

        <h2>Welcome back!</h2>
        <p className="login-description">
          Sign in to organise your tasks and stay on track.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show password
          </label>

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" type="submit">
            Sign in
          </button>
        </form>

        <p className="login-footer">
          Made for real student routines ✨
        </p>
      </section>
    </main>
  );
}
