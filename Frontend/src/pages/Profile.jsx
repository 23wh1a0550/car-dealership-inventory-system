import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Profile = () => {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>Profile</h1>

          <p className="welcome-text">
            Manage your account information
          </p>

          <div className="form-card">
            <h2>Account Details</h2>

            <form>
              <div className="form-grid">

                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                  />
                </div>

              </div>

              <button className="primary-btn">
                Update Profile
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;