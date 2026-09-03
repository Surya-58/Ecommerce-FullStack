import React, { use, useState, useContext } from "react";
import { loginUser } from "../Services/userApi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "../Styles/Pages/login.css";

const Login = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  setError("");

  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    const data = await loginUser(email, password);

    console.log("Login Response:", data);

    // Save JWT token
    localStorage.setItem("token", data.token);

    // Save user
    setCurrentUser(data.user);
    localStorage.setItem(
      "currentUser",
      JSON.stringify(data.user)
    );

    navigate("/");
  } catch (error) {
    console.log("Login Error:", error);
    setError(error.message);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-page__image">
        <img src="/images/hero-grocery1.jpg" alt="Fresh Groceries" />
        <div className="auth-page__image-caption">
          <h2>Fresh Groceries Delivered Fast</h2>
          <p>
            Login to continue shopping for fresh groceries, beverages and daily
            essentials.
          </p>
        </div>
      </div>

      <div className="auth-page__form-wrap">
        <div className="auth-card">
          <div className="auth-card__logo">
            <h2>QuickCart</h2>
          </div>
          <h1 className="auth-card__title">Welcome Back</h1>
          <p className="auth-card__subtitle">Login to continue to shopping</p>

          <form
            className="auth-card__form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="field">
              <label className="field__label">Email Address</label>
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field__label">Password</label>
              <input
                className="input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="field-error">{error}</p>}

            <div className="auth-card__row">
              <label className="checkbox">
                <input type="checkbox" />
                <span className="checkbox__box"></span>
                Remember Me
              </label>
              <a href="#" className="auth-card__forgot">
                Forgot Password?
              </a>
            </div>

            <button className="btn btn--primary btn--full">Login</button>
          </form>

          <div className="auth-card__footer">
            Dont have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
