import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "../styles/dashboard.css";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "Petrol",
    transmission: "Manual",
    color: "",
    status: "Available",
  });

  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const response = await API.get("/vehicles");

      setVehicles(response.data);
    } catch (error) {
      console.error(error);

      setError("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await API.post("/vehicles", {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
      });

      setFormData({
        brand: "",
        model: "",
        year: "",
        price: "",
        fuelType: "Petrol",
        transmission: "Manual",
        color: "",
        status: "Available",
      });

      setShowForm(false);

      fetchVehicles();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to add vehicle"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/vehicles/${id}`);

      fetchVehicles();
    } catch (error) {
      console.error(error);

      setError("Failed to delete vehicle");
    }
  };

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

            <button
              className="primary-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm
                ? "Close"
                : "+ Add Vehicle"}
            </button>

          </div>

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          {/* ADD VEHICLE FORM */}

          {showForm && (
            <div className="form-card">

              <h2>Add New Vehicle</h2>

              <form onSubmit={handleSubmit}>

                <div className="form-grid">

                  <div>
                    <label>Brand</label>

                    <input
                      type="text"
                      name="brand"
                      placeholder="Toyota"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Model</label>

                    <input
                      type="text"
                      name="model"
                      placeholder="Fortuner"
                      value={formData.model}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Year</label>

                    <input
                      type="number"
                      name="year"
                      placeholder="2026"
                      value={formData.year}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Price</label>

                    <input
                      type="number"
                      name="price"
                      placeholder="3500000"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Fuel Type</label>

                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                    >
                      <option value="Petrol">
                        Petrol
                      </option>

                      <option value="Diesel">
                        Diesel
                      </option>

                      <option value="Electric">
                        Electric
                      </option>

                      <option value="Hybrid">
                        Hybrid
                      </option>
                    </select>
                  </div>

                  <div>
                    <label>Transmission</label>

                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                    >
                      <option value="Manual">
                        Manual
                      </option>

                      <option value="Automatic">
                        Automatic
                      </option>
                    </select>
                  </div>

                  <div>
                    <label>Color</label>

                    <input
                      type="text"
                      name="color"
                      placeholder="White"
                      value={formData.color}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Available">
                        Available
                      </option>

                      <option value="Sold">
                        Sold
                      </option>
                    </select>
                  </div>

                </div>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Add Vehicle
                </button>

              </form>

            </div>
          )}

          {/* VEHICLE TABLE */}

          <div className="recent-section">

            <h2>Vehicle Inventory</h2>

            {loading ? (
              <p>Loading vehicles...</p>
            ) : vehicles.length === 0 ? (
              <p>No vehicles available.</p>
            ) : (

              <table>

                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Fuel</th>
                    <th>Transmission</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {vehicles.map((vehicle) => (
                    <tr key={vehicle._id}>

                      <td>{vehicle.brand}</td>

                      <td>{vehicle.model}</td>

                      <td>{vehicle.year}</td>

                      <td>
                        ₹{vehicle.price.toLocaleString("en-IN")}
                      </td>

                      <td>{vehicle.fuelType}</td>

                      <td>{vehicle.transmission}</td>

                      <td>{vehicle.status}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(vehicle._id)
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            )}

          </div>

        </main>

      </div>

    </div>
  );
};

export default Vehicles;