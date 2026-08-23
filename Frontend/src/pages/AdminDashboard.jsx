import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "../styles/dashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await API.get("/vehicles");

        setVehicles(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const totalVehicles = vehicles.length;

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Available"
  ).length;

  const soldVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Sold"
  ).length;

  const inventoryValue = vehicles.reduce(
    (total, vehicle) =>
      total + Number(vehicle.price || 0),
    0
  );

  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <main className="dashboard-content">

          <div className="dashboard-header">

            <div>
              <h1>Admin Dashboard</h1>

              <p className="welcome-text">
                Manage your complete dealership inventory.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => navigate("/vehicles")}
            >
              + Add Vehicle
            </button>

          </div>

          {/* STATISTICS */}

          <div className="stats-container">

            <div className="stat-card">
              <div className="stat-icon">
                🚗
              </div>

              <div className="stat-info">
                <p>Total Vehicles</p>
                <h2>
                  {loading ? "..." : totalVehicles}
                </h2>
                <span className="stat-label">
                  Complete inventory
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                ✓
              </div>

              <div className="stat-info">
                <p>Available</p>
                <h2>
                  {loading ? "..." : availableVehicles}
                </h2>
                <span className="stat-label">
                  Vehicles for sale
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                📈
              </div>

              <div className="stat-info">
                <p>Sold</p>
                <h2>
                  {loading ? "..." : soldVehicles}
                </h2>
                <span className="stat-label">
                  Completed sales
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                ₹
              </div>

              <div className="stat-info">
                <p>Inventory Value</p>
                <h2>
                  {loading
                    ? "..."
                    : `₹${inventoryValue.toLocaleString(
                        "en-IN"
                      )}`}
                </h2>
                <span className="stat-label">
                  Current value
                </span>
              </div>
            </div>

          </div>

          {/* ADMIN ACTIONS */}

          <div className="dashboard-section">

            <div className="section-title">
              <h2>Administration</h2>
            </div>

            <div className="quick-actions">

              <button
                className="quick-action"
                onClick={() => navigate("/vehicles")}
              >
                <span>🚗</span>

                <div>
                  <strong>Vehicles</strong>
                  <p>Manage inventory</p>
                </div>
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  navigate("/categories")
                }
              >
                <span>📁</span>

                <div>
                  <strong>Categories</strong>
                  <p>Manage categories</p>
                </div>
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  navigate("/stock-in")
                }
              >
                <span>📥</span>

                <div>
                  <strong>Stock In</strong>
                  <p>Add inventory</p>
                </div>
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  navigate("/reports")
                }
              >
                <span>📊</span>

                <div>
                  <strong>Reports</strong>
                  <p>View reports</p>
                </div>
              </button>

            </div>

          </div>

          {/* RECENT VEHICLES */}

          <div className="recent-section">

            <div className="section-title">

              <div>
                <h2>Recent Vehicles</h2>

                <p>
                  Latest vehicles added to inventory
                </p>
              </div>

              <button
                className="view-all-btn"
                onClick={() =>
                  navigate("/vehicles")
                }
              >
                View All
              </button>

            </div>

            {vehicles.length === 0 ? (

              <div className="empty-dashboard">
                <div className="empty-icon">
                  🚗
                </div>

                <h3>No vehicles available</h3>

                <p>
                  Add vehicles to see them here.
                </p>
              </div>

            ) : (

              <table>

                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Fuel</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {vehicles.slice(0, 5).map(
                    (vehicle) => (
                      <tr key={vehicle._id}>

                        <td>
                          {vehicle.brand}{" "}
                          {vehicle.model}
                        </td>

                        <td>
                          {vehicle.year}
                        </td>

                        <td>
                          ₹
                          {Number(
                            vehicle.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td>
                          {vehicle.fuelType}
                        </td>

                        <td>
                          <span
                            className={
                              vehicle.status ===
                              "Sold"
                                ? "status sold"
                                : "status available"
                            }
                          >
                            {vehicle.status}
                          </span>
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            )}

          </div>

        </main>

      </div>
    </div>
  );
};

export default AdminDashboard;