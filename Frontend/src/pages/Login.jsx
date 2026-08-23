import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // Validate fields
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password");
      return;
    }

    try {
      setLoading(true);

      // Login through AuthContext
      const response = await login(
        email.trim(),
        password
      );

      console.log("Login response:", response);

      // Make sure user information exists
      if (!response || !response.user) {
        setError("Login successful, but user information is missing.");
        return;
      }

      // Get user's role
      const role = response.user.role;

      console.log("Logged in user:", response.user);
      console.log("User role:", role);

      // ==============================
      // ADMIN
      // ==============================
      if (role === "admin") {
        navigate("/admin/dashboard", {
          replace: true,
        });

        return;
      }

      // ==============================
      // NORMAL USER
      // ==============================
      if (role === "user") {
        navigate("/dashboard", {
          replace: true,
        });

        return;
      }

      // ==============================
      // UNKNOWN ROLE
      // ==============================
      setError(
        "Your account does not have a valid role. Please contact the administrator."
      );

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* =========================================
            LEFT SIDE
        ========================================= */}

        <div className="login-left">

          <div className="brand">

            <div className="brand-icon">
              ◆
            </div>

            <h2>
              AutoHub
            </h2>

          </div>

          <div className="welcome-content">

            <h1>
              Welcome Back!
            </h1>

            <p>
              Sign in to manage your account and
              explore everything AutoHub has to offer.
            </p>

            <div className="features">

              <div className="feature">

                <span>
                  ✓
                </span>

                <p>
                  Manage your vehicles easily
                </p>

              </div>

              <div className="feature">

                <span>
                  ✓
                </span>

                <p>
                  Access your account securely
                </p>

              </div>

              <div className="feature">

                <span>
                  ✓
                </span>

                <p>
                  Fast and simple experience
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================
            RIGHT SIDE
        ========================================= */}

        <div className="login-right">

          <div className="login-form-container">

            <h1>
              Login
            </h1>

            <p className="subtitle">
              Enter your details to continue
            </p>

            {/* ERROR */}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* =====================================
                LOGIN FORM
            ===================================== */}

            <form onSubmit={handleLogin}>

              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  required
                />

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  required
                />

              </div>

              {/* =================================
                  REMEMBER ME + FORGOT PASSWORD
              ================================= */}

              <div className="login-options">

                <label className="remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => {
                    alert(
                      "Forgot password functionality will be added next."
                    );
                  }}
                >
                  Forgot Password?
                </button>

              </div>

              {/* =================================
                  LOGIN BUTTON
              ================================= */}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>

            {/* =================================
                OR DIVIDER
            ================================= */}

            <div className="or-divider">

              <span></span>

              <p>
                OR
              </p>

              <span></span>

            </div>

            {/* =================================
                REGISTER
            ================================= */}

            <p className="register-text">

              Don't have an account?{" "}

              <Link to="/register">
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;