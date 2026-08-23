import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        🚗 Inventory
      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/vehicles"
          className="sidebar-link"
        >
          🚘 Vehicles
        </NavLink>

        <NavLink
          to="/categories"
          className="sidebar-link"
        >
          🏷️ Categories
        </NavLink>

        <NavLink
          to="/stock-in"
          className="sidebar-link"
        >
          📥 Stock In
        </NavLink>

        <NavLink
          to="/stock-out"
          className="sidebar-link"
        >
          📤 Stock Out
        </NavLink>

        <NavLink
          to="/reports"
          className="sidebar-link"
        >
          📊 Reports
        </NavLink>

        <NavLink
          to="/profile"
          className="sidebar-link"
        >
          👤 Profile
        </NavLink>

      </nav>

    </aside>
  );
};

export default Sidebar;