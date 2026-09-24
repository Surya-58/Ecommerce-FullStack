import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, LockKeyhole, Eye, EyeOff, ShieldCheck } from "lucide-react";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      if (data.user.role !== "admin") {
        throw new Error("Access denied. Admin only");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      console.log("Admin Login Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__background"></div>

      <div className="admin-login__container">

        <div className="admin-login__branding">
          <div className="admin-login__logo">
            <span className="admin-login__logo-icon"></span>
            <span>QuickCart</span>
          </div>

          <div className="admin-login__branding-content">
            <span className="admin-login__eyebrow">
              <ShieldCheck size={16} />
              Admin Portal
            </span>

            <h1>
              Manage your store
              <span> with confidence.</span>
            </h1>

            <p>
              Manage products, categories, users and orders from one
              convenient dashboard.
            </p>
          </div>
        </div>

        <div className="admin-login__card">
          <div className="admin-login__header">
            <div className="admin-login__mobile-logo">
              <span className="admin-login__logo-icon"></span>
            </div>

            <h2>Welcome Back</h2>

            <p>Sign in to your QuickCart admin account</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login__form">

            <div className="admin-login__field">
              <label htmlFor="email">Email Address</label>

              <div className="admin-login__input-wrapper">
                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>
            </div>

            <div className="admin-login__field">
              <label htmlFor="password">Password</label>

              <div className="admin-login__input-wrapper">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="admin-login__password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="admin-login__error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="admin-login__button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="admin-login__footer">
            <ShieldCheck size={15} />
            <span>Authorized administrators only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;