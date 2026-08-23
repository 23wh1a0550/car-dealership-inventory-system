
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <main className="dashboard-content">

          <h1>Dashboard</h1>

          <p className="welcome-text">
            Welcome to your Car Dealership Inventory
            Management System 👋
          </p>

          <div className="stats-container">

            <div className="stat-card">
              <div className="stat-icon">
                🚗
              </div>

              <div>
                <p>Total Vehicles</p>
                <h2>0</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                📦
              </div>

              <div>
                <p>Available Stock</p>
                <h2>0</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                💰
              </div>

              <div>
                <p>Total Sales</p>
                <h2>0</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                ⚠️
              </div>

              <div>
                <p>Low Stock</p>
                <h2>0</h2>
              </div>
            </div>

          </div>

          <div className="recent-section">

            <h2>Recent Inventory</h2>

            <table>

              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>No vehicles yet</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;