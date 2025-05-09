import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import '../styles/navbar.css';

// Navigation items based on role
const navItems = {
    admin: [
        { id: 'accounts', label: 'Quản lý tài khoản', icon: 'account', path: '/accounts' },
        { id: 'stats', label: 'Thống kê', icon: 'stats', path: '/stats' },
    ],
    admin_service: [
        { id: 'services', label: 'Dịch vụ', icon: 'service', path: '/services' },
        { id: 'invoices', label: 'Hóa đơn', icon: 'invoice', path: '/invoices' },
    ],
    admin_room: [
        { id: 'rooms', label: 'Phòng', icon: 'room', path: '/rooms' },
    ],
    guest: [
        { id: 'rooms', label: 'Xem phòng', icon: 'room', path: '/rooms' },
    ],
};

function Navbar({ role, setRole }) {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setRole('guest');
        window.location.href = '/';
    };

    const handleLoginSuccess = (newRole) => {
        setShowAuthModal(false);
        setRole(newRole);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-header">
                    <div className="navbar-logo"></div>
                    <Link to="/" className="navbar-title">Quản Lý Tòa Nhà</Link>
                </div>
                <div className="navbar-menu">
                    {navItems[role]?.map((item) => (
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
                    <Link to="/acc" className="navbar-user">
                        <div className="navbar-avatar"></div>
                        <div className="navbar-user-info">
                            <span className="navbar-user-name">John Doe</span>
                            <span className="navbar-user-role">
                                {role === 'admin' ? 'Quản lý' : role === 'admin_service' ? 'Quản lý dịch vụ' : 'Quản lý phòng'}
                            </span>
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