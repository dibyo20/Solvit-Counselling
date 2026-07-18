import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldAlert } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loginUser, authLoading, error } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrUsername || !password) return;
    try {
      await loginUser(emailOrUsername, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="login-card">
        <div className="auth-form-header centered">
          <div className="logo-area">
            <img src="/logo.svg" alt="Solvit Logo" />
          </div>
          <h2>Solvit Counselling</h2>
          <p>Welcome back. Find your path to clarity.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email Address or Username</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="text"
                id="login-email"
                placeholder="name@example.com"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                disabled={authLoading}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
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

          {error && (
            <div className="error-message">
              <ShieldAlert size={16} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={authLoading}>
            {authLoading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <span>LOGIN</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <p className="auth-footer">
          &copy; 2026 Solvit Counselling. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
