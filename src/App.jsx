import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AccPage from './pages/AccPage';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import ServicesPage from './pages/ServicesPage';
import InvoicesPage from './pages/InvoicesPage';
import UserManagement from './pages/AccountsPage';
import StatsPage from './pages/StatsPage';
import { getRole, isAuthenticated } from './utils/auth';

function App() {
  const [role, setRole] = useState('guest');
  const [loading, setLoading] = useState(true);

  // Ánh xạ role từ backend sang frontend
  const mapRole = (backendRole) => {
    if (Array.isArray(backendRole)) {
      if (backendRole.includes('ADMIN')) return 'admin';
      if (backendRole.includes('ADMIN_FINANCE')) return 'admin_service';
      if (backendRole.includes('ADMIN_BUILDING')) return 'admin_room';
      if (backendRole.includes('admin')) return 'admin'; // Tương thích token hiện tại
    } else {
      if (backendRole === 'ADMIN') return 'admin';
      if (backendRole === 'ADMIN_FINANCE') return 'admin_service';
      if (backendRole === 'ADMIN_BUILDING') return 'admin_room';
      if (backendRole === 'admin') return 'admin'; // Tương thích token hiện tại
    }
    return 'guest';
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (isAuthenticated()) {
        const backendRole = getRole();
        setRole(mapRole(backendRole));
      } else {
        setRole('guest');
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar role={role} setRole={setRole} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage role={role} />} />
            <Route path="/rooms" element={<RoomsPage role={role} setRole={setRole} />} />
            <Route path="/services" element={<ProtectedRoute role={role} requiredRole="admin_service" setRole={setRole}><ServicesPage role={role} /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute role={role} requiredRole="admin_service" setRole={setRole}><InvoicesPage role={role} /></ProtectedRoute>} />
            <Route path="/acc" element={<ProtectedRoute role={role} setRole={setRole}><AccPage role={role} /></ProtectedRoute>} />
            <Route path="/accounts" element={<ProtectedRoute role={role} requiredRole="admin" setRole={setRole}><UserManagement role={role} /></ProtectedRoute>} />
            <Route path="/stats" element={<ProtectedRoute role={role} requiredRole="admin" setRole={setRole}><StatsPage role={role} /></ProtectedRoute>} />
            <Route path="*" element={<h1>Trang Không Tồn Tại</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;