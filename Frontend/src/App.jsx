import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import Vehicles from "./pages/Vehicles";

import { useAuth } from "./context/AuthContext";


// ============================================
// PROTECTED ROUTE
// ============================================

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


// ============================================
// ADMIN ONLY ROUTE
// ============================================

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin is determined from MongoDB user.role
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


// ============================================
// APP
// ============================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ======================================
            ROOT
        ====================================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />


        {/* ======================================
            LOGIN
        ====================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ======================================
            REGISTER
        ====================================== */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ======================================
            USER DASHBOARD
        ====================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            ADMIN DASHBOARD
        ====================================== */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        {/* ======================================
            VEHICLES
        ====================================== */}

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <Vehicles />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            CATEGORIES
        ====================================== */}

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            STOCK IN
        ====================================== */}

        <Route
          path="/stock-in"
          element={
            <ProtectedRoute>
              <StockIn />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            STOCK OUT
        ====================================== */}

        <Route
          path="/stock-out"
          element={
            <ProtectedRoute>
              <StockOut />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            REPORTS
        ====================================== */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            PROFILE
        ====================================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            UNKNOWN URL
        ====================================== */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;