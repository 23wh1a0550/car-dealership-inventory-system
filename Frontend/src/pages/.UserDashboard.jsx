import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

import "../styles/dashboard.css";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <main className="dashboard-content">

          {/* HEADER */}

          <div className="dashboard-header">

            <div>
              <h1>
                Welcome, {user?.name || "User"} 👋
              </h1>

              <p className="welcome-text">
                Welcome to your Car Dealership Inventory
                Management System.
              </p>
            </div>

          </div>


          {/* USER STATISTICS */}

          <div className="stats-container">

            <div className="stat-card">

              <div className="stat-icon">
                🚗
              </div>

              <div className="stat-info">

                <p>
                  Available Vehicles
                </p>

                <h2>
                  0
                </h2>

                <span className="stat-label">
                  Vehicles available
                </span>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                📦
              </div>

              <div className="stat-info">

                <p>
                  Vehicles In Stock
                </p>

                <h2>
                  0
                </h2>

                <span className="stat-label">
                  Current inventory
                </span>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                💰
              </div>

              <div className="stat-info">

                <p>
                  My Requests
                </p>

                <h2>
                  0
                </h2>

                <span className="stat-label">
                  Vehicle requests
                </span>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                ❤️
              </div>

              <div className="stat-info">

                <p>
                  Favorites
                </p>

                <h2>
                  0
                </h2>

                <span className="stat-label">
                  Saved vehicles
                </span>

              </div>

            </div>

          </div>


          {/* USER ACTIONS */}

          <div className="dashboard-section">

            <div className="section-title">

              <div>

                <h2>
                  Quick Actions
                </h2>

                <p>
                  Access your vehicle management options
                </p>

              </div>

            </div>


            <div className="quick-actions">

              <button
                className="quick-action"
                onClick={() =>
                  window.location.href = "/vehicles"
                }
              >

                <span>
                  🚗
                </span>

                <div>

                  <strong>
                    View Vehicles
                  </strong>

                  <p>
                    Browse available vehicles
                  </p>

                </div>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  window.location.href = "/categories"
                }
              >

                <span>
                  📁
                </span>

                <div>

                  <strong>
                    Categories
                  </strong>

                  <p>
                    Browse vehicle categories
                  </p>

                </div>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  window.location.href = "/profile"
                }
              >

                <span>
                  👤
                </span>

                <div>

                  <strong>
                    My Profile
                  </strong>

                  <p>
                    Manage your account
                  </p>

                </div>

              </button>

            </div>

          </div>


          {/* RECENT INVENTORY */}

          <div className="recent-section">

            <div className="section-title">

              <div>

                <h2>
                  Available Vehicles
                </h2>

                <p>
                  Recently added vehicles
                </p>

              </div>

              <button
                className="view-all-btn"
                onClick={() =>
                  window.location.href = "/vehicles"
                }
              >
                View All
              </button>

            </div>


            <table>

              <thead>

                <tr>

                  <th>
                    Vehicle
                  </th>

                  <th>
                    Model
                  </th>

                  <th>
                    Year
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr>

                  <td>
                    No vehicles available
                  </td>

                  <td>
                    -
                  </td>

                  <td>
                    -
                  </td>

                  <td>
                    -
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
};

export default UserDashboard;