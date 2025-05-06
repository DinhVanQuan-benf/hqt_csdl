import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AccPage from './pages/AccPage';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import ServicesPage from './pages/ServicesPage';
import InvoicesPage from './pages/InvoicesPage';
import ComplaintsPage from './pages/ComplaintsPage';
import AccountsPage from './pages/AccountsPage';
import StatsPage from './pages/StatsPage';
import ContractsPage from './pages/ContractsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';

// Danh sách liên kết từ Navbar để tạo route tự động
const navItems = {
  manager: [
    { id: 'announcements', label: 'Thông báo', icon: 'announcement', path: '/announcements' },
    { id: 'rooms', label: 'Phòng', icon: 'room', path: '/rooms' },
    { id: 'services', label: 'Dịch vụ', icon: 'service', path: '/services' },
    { id: 'invoices', label: 'Hóa đơn', icon: 'invoice', path: '/invoices' },
    { id: 'complaints', label: 'Khiếu nại & Chat', icon: 'complaint', path: '/complaints' },
    { id: 'stats', label: 'Thống kê', icon: 'stats', path: '/stats' },
    { id: 'booking-history', label: 'Lịch sử đặt phòng', icon: 'history', path: '/booking-history' },
    { id: 'approve-rooms', label: 'Duyệt phòng', icon: 'approve', path: '/approve-rooms' },
  ],
  guest: [
    { id: 'rooms', label: 'Xem phòng', icon: 'room', path: '/rooms' },
  ],
};

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setRole('manager');
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar role={role || 'guest'} setRole={setRole} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage role={role || 'guest'} />} />
            <Route path="/announcements" element={<ProtectedRoute role={role}><AnnouncementsPage role={role} /></ProtectedRoute>} />
            <Route path="/rooms" element={<RoomsPage role={role || 'guest'} setRole={setRole} />} />
            <Route path="/services" element={<ProtectedRoute role={role}><ServicesPage role={role} /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute role={role}><InvoicesPage role={role} /></ProtectedRoute>} />
            <Route path="/complaints" element={<ProtectedRoute role={role}><ComplaintsPage role={role} /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute role={role}><AccPage role={role} /></ProtectedRoute>} />
            <Route path="/accounts" element={<ProtectedRoute role={role}><AccountsPage role={role} /></ProtectedRoute>} />
            <Route path="/stats" element={<ProtectedRoute role={role}><StatsPage role={role} /></ProtectedRoute>} />
            <Route path="/contracts" element={<ProtectedRoute role={role}><ContractsPage role={role} /></ProtectedRoute>} />
            <Route path="*" element={<h1>Trang Không Tồn Tại</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;