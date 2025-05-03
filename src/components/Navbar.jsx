import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import '../styles/navbar.css';

// Navigation items based on role
const navItems = {
    manager: [
        { id: 'announcements', label: 'Thông báo', icon: 'announcement', path: '/announcements' },
        { id: 'rooms', label: 'Phòng', icon: 'room', path: '/rooms' },
        { id: 'services', label: 'Dịch vụ', icon: 'service', path: '/services' },
        { id: 'invoices', label: 'Hóa đơn', icon: 'invoice', path: '/invoices' },
        { id: 'complaints', label: 'Khiếu nại & Chat', icon: 'complaint', path: '/complaints' },
        { id: 'stats', label: 'Thống kê', icon: 'stats', path: '/stats' },
        { id: 'contracts', label: 'Hợp đồng', icon: 'contract', path: '/contracts' },
        { id: 'accounts', label: 'Quản lí tài khoản', icon: 'account', path: '/accounts' },
    ],
    customer: [
        { id: 'announcements', label: 'Thông báo', icon: 'announcement', path: '/announcements' },
        { id: 'rooms', label: 'Đặt phòng', icon: 'room', path: '/rooms' },
        { id: 'services', label: 'Dịch vụ', icon: 'service', path: '/services' },
        { id: 'invoices', label: 'Hóa đơn của tôi', icon: 'invoice', path: '/invoices' },
        { id: 'complaints', label: 'Khiếu nại & Chat', icon: 'complaint', path: '/complaints' },
        { id: 'contracts', label: 'Hợp đồng', icon: 'contract', path: '/contracts' },
    ],
    guest: [
        { id: 'rooms', label: 'Xem phòng', icon: 'room', path: '/rooms' }
    ],
};

function Navbar({ role, setRole }) {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const location = useLocation();


    const handleLogout = () => {
        localStorage.removeItem('token');
        setRole(null);
        window.location.href = '/';
    };

    const handleLoginSuccess = () => {
        setShowAuthModal(false);
        setRole("manager");
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-header">

                    <div className="navbar-logo"></div>
                    <Link to="/" className="navbar-title">Quản Lý Tòa Nhà</Link>
                </div>
                <div className="navbar-menu">
                    {navItems[role].map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`navbar-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <div className={`navbar-icon ${item.icon}`}></div>
                            <span className="navbar-label">{item.label}</span>
                        </Link>
                    ))}
                </div>
                {role !== 'guest' && (
                    <Link to="/account" className="navbar-user">
                        <div className="navbar-avatar"></div>
                        <div className="navbar-user-info">
                            <span className="navbar-user-name">John Doe</span>
                            <span className="navbar-user-role">{role === 'manager' ? 'Quản lý' : 'Khách hàng'}</span>
                        </div>
                    </Link>
                )}
                {role === 'guest' ? (
                    <button
                        className="navbar-logout"
                        onClick={() => setShowAuthModal(true)}
                    >
                        <span className="navbar-logout-label">Đăng nhập</span>
                    </button>
                ) : (
                    <button className="navbar-logout" onClick={handleLogout}>
                        <span className="navbar-logout-label">Đăng xuất</span>
                    </button>
                )}
            </nav>
            {showAuthModal && (
                <AuthModal
                    onLoginSuccess={handleLoginSuccess}
                    onClose={() => setShowAuthModal(false)}
                />
            )}
        </>
    );
}

export default Navbar;