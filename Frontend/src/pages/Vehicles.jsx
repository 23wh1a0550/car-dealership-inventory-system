import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Vehicles = () => {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="page-header">
            <div>
              <h1>Vehicles</h1>
              <p className="welcome-text">
                Manage your dealership vehicles
              </p>
            </div>

            <button className="primary-btn">
              + Add Vehicle
            </button>
          </div>

          <div className="recent-section">
            <h2>Vehicle Inventory</h2>

            <table>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Price</th>
                  <th>Fuel</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="7" className="empty-row">
                    No vehicles available
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

export default Vehicles;