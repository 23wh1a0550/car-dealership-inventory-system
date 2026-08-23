import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Categories = () => {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="page-header">
            <div>
              <h1>Categories</h1>
              <p className="welcome-text">
                Manage vehicle categories
              </p>
            </div>

            <button className="primary-btn">
              + Add Category
            </button>
          </div>

          <div className="recent-section">
            <h2>Vehicle Categories</h2>

            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Vehicles</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>SUV</td>
                  <td>Sport Utility Vehicles</td>
                  <td>0</td>
                  <td>
                    <button className="small-btn">
                      Edit
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Sedan</td>
                  <td>Luxury and family sedans</td>
                  <td>0</td>
                  <td>
                    <button className="small-btn">
                      Edit
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Hatchback</td>
                  <td>Compact vehicles</td>
                  <td>0</td>
                  <td>
                    <button className="small-btn">
                      Edit
                    </button>
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

export default Categories;