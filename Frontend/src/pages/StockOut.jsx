import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const StockOut = () => {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>Stock Out</h1>

          <p className="welcome-text">
            Record vehicles sold or removed from inventory
          </p>

          <div className="form-card">
            <h2>Remove Stock</h2>

            <form>
              <div className="form-grid">

                <div>
                  <label>Vehicle</label>
                  <select>
                    <option>Select Vehicle</option>
                  </select>
                </div>

                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                  />
                </div>

                <div>
                  <label>Date</label>
                  <input type="date" />
                </div>

                <div>
                  <label>Customer</label>
                  <input
                    type="text"
                    placeholder="Customer name"
                  />
                </div>

              </div>

              <button className="primary-btn">
                Remove Stock
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StockOut;