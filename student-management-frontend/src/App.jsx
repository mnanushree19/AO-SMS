import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Students */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Students />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Add Student */}
          <Route
            path="/students/add"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AddStudent />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Edit Student */}
          <Route
            path="/students/edit/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EditStudent />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Student Details */}
          <Route
            path="/students/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentDetails />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;