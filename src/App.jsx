import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AccPage from './pages/AccPage';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import ServicesPage from './pages/ServicesPage';
import InvoicesPage from './pages/InvoicesPage';
import AccountsPage from './pages/AccountsPage';
import StatsPage from './pages/StatsPage';

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Backend trả về roles là một mảng, lấy role đầu tiên và loại bỏ tiền tố "ROLE_"
        const roles = decoded.roles || [];
        const userRole = roles.length > 0 ? roles[0].replace('ROLE_', '').toLowerCase() : 'guest';
        setRole(userRole);
      } catch (error) {
        console.error('Token không hợp lệ:', error);
        setRole('guest');
      }
    } else {
      setRole('guest');
    }
    setLoading(false);
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
            <Route path="/services" element={<ProtectedRoute role={role}><ServicesPage role={role} /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute role={role}><InvoicesPage role={role} /></ProtectedRoute>} />
            <Route path="/acc" element={<ProtectedRoute role={role}><AccPage role={role} /></ProtectedRoute>} />
            <Route path="/accounts" element={<ProtectedRoute role={role}><AccountsPage role={role} /></ProtectedRoute>} />
            <Route path="/stats" element={<ProtectedRoute role={role}><StatsPage role={role} /></ProtectedRoute>} />
            <Route path="*" element={<h1>Trang Không Tồn Tại</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;