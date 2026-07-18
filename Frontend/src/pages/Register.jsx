import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { registerUser, authLoading, error } = useAuth();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (
      !fullname.trim() ||
      !email.trim() ||
      !username.trim() ||
      !password.trim()
    ) {
      setLocalError("Please fill out all fields.");
      return;
    }

    try {
      await registerUser(fullname, email, username, password);
      navigate("/home");
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-left-panel">
          <div>
            <div className="logo-area">
              <img src="/logo.svg" alt="Solvit Logo" />
            </div>
            <h1>Begin Your Journey to Serenity</h1>
            <p>
              Connect with premium mental health professionals in a space
              designed for clarity and empathetic growth.
            </p>
          </div>
          <div className="illustration-container">
            <img src="/illustration.png" alt="Counselling Illustration" />
          </div>
        </div>

        <div className="auth-right-panel">
          <div className="auth-form-header">
            <div className="logo-area d-mobile-only">
              <img src="/logo.svg" alt="Solvit Logo" />
            </div>
            <h2>Create Account</h2>
            <p>Join our community of wellness seekers today.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reg-name">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  id="reg-name"
                  placeholder="John Doe"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  disabled={authLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="reg-email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={authLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-username">Username</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="username"
                  id="reg-username"
                  placeholder="jhon_doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={authLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="reg-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={authLoading}
                  required
                />
                <button
                  type="button"
                  className="visibility-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {(localError || error) && (
              <div className="error-message">
                <ShieldAlert size={16} />
                <span>{localError || error}</span>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={authLoading}>
              {authLoading ? (
                <span>Registering...</span>
              ) : (
                <>
                  <span>Register Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="auth-redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <p className="auth-footer">
            &copy; 2026 Solvit Counselling. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
