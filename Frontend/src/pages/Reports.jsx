import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Reports = () => {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>Reports</h1>

          <p className="welcome-text">
            View inventory and sales reports
          </p>

          <div className="stats-container">

            <div className="stat-card">
              <div className="stat-icon">🚗</div>
              <div>
                <p>Total Vehicles</p>
                <h2>0</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📥</div>
              <div>
                <p>Stock In</p>
                <h2>0</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📤</div>
              <div>
                <p>Stock Out</p>
                <h2>0</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div>
                <p>Total Sales</p>
                <h2>₹0</h2>
              </div>
            </div>

          </div>

          <div className="recent-section">
            <h2>Report Summary</h2>

            <p>
              Detailed reports will appear here after
              inventory data is added.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;