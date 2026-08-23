import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const StockIn = () => {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>Stock In</h1>

          <p className="welcome-text">
            Record vehicles entering your inventory
          </p>

          <div className="form-card">
            <h2>Add Stock</h2>

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
                  <label>Supplier</label>
                  <input
                    type="text"
                    placeholder="Supplier name"
                  />
                </div>

              </div>

              <button className="primary-btn">
                Add Stock
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StockIn;