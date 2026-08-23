import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="navbar">

      <div className="navbar-brand">
        🚗 Car Dealership Inventory
      </div>

      <div className="navbar-right">

        <span className="navbar-user">
          👤 {user?.name || "User"}
        </span>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;