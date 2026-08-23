import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await register(formData);

      if (result.success) {

        setSuccess(
          "Registration successful! Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } else {

        setError(result.message);

      }

    } catch (error) {

      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* LEFT SIDE */}
        <div className="register-left">

          <div className="register-brand">
            <div className="register-brand-icon">
              ◆
            </div>

            <h2>AutoHub</h2>
          </div>

          <div className="register-welcome">

            <h1>Join AutoHub!</h1>

            <p>
              Create your account and start managing
              your dealership inventory easily.
            </p>

            <div className="register-features">

              <div className="register-feature">
                <span>✓</span>
                <p>Manage your vehicles</p>
              </div>

              <div className="register-feature">
                <span>✓</span>
                <p>Track your inventory</p>
              </div>

              <div className="register-feature">
                <span>✓</span>
                <p>Manage your dealership securely</p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">

          <div className="register-form-container">

            <h1>Create Account</h1>

            <p className="register-subtitle">
              Enter your details to get started
            </p>

            {error && (
              <div className="register-error">
                {error}
              </div>
            )}

            {success && (
              <div className="register-success">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="register-form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* EMAIL */}
              <div className="register-form-group">

                <label htmlFor="register-email">
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PASSWORD */}
              <div className="register-form-group">

                <label htmlFor="register-password">
                  Password
                </label>

                <input
                  id="register-password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            <p className="register-login-text">

              Already have an account?{" "}

              <Link to="/login">
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;