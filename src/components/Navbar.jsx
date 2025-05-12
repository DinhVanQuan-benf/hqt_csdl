import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import '../styles/navbar.css';
import { removeToken, getRole, isAuthenticated } from '../utils/auth';
import axios from '../utils/axiosConfig';
import { getToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';

// Navigation items based on role
const navItems = {
    admin: [
        { id: 'accounts', label: 'Quản lý tài khoản', icon: 'account', path: '/accounts' },
        { id: 'stats', label: 'Thống kê', icon: 'stats', path: '/stats' },
        { id: 'services', label: 'Dịch vụ', icon: 'service', path: '/service' },
        { id: 'invoices', label: 'Hóa đơn', icon: 'invoice', path: '/bill' },
        { id: 'rooms', label: 'Phòng', icon: 'room', path: '/rooms' },

    ],
    admin_service: [
        { id: 'services', label: 'Dịch vụ', icon: 'service', path: '/service' },
        { id: 'invoices', label: 'Hóa đơn', icon: 'invoice', path: '/bill' },
    ],
    admin_room: [
        { id: 'rooms', label: 'Phòng', icon: 'room', path: '/rooms' },
    ],
};

function Navbar({ setRole }) {
    const [role, setRoleState] = useState('guest');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');


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

    // Lấy role từ token khi load trang
    useEffect(() => {
        loadUser();
    }, []);
    const loadUser = async () => {
        if (isAuthenticated()) {
            const storedRole = getRole();
            const mappedRole = mapRole(storedRole);
            setRoleState(mappedRole);
            setRole(mappedRole);

            const name = await fetchUserInfo();
            setFullname(name);
        } else {
            setRoleState('guest');
            setRole('guest');
        }
    };

    const handleLogout = () => {
        removeToken();
        setRoleState('guest');
        setRole('guest');
        navigate('/');
    };

    const handleLoginSuccess = async (backendRole) => {
        const mappedRole = mapRole(backendRole);
        setShowAuthModal(false);
        setRoleState(mappedRole);
        setRole(mappedRole);

        await loadUser();

        navigate(location.pathname, { state: { role: mappedRole } });
    };


    const handleNavClick = (path) => {
        navigate(path, { state: { role } });
    };
    const fetchUserInfo = async () => {
        const token = getToken();
        let username;
        try {
            const decoded = jwtDecode(token);
            username = decoded.sub;
        } catch (err) {
            console.error('Lỗi khi lấy thông tin:', err);
        }
        try {
            const getRes = await axios.get(`/user/get`, {
                params: { username },
            });
            return getRes.data.fullName;
        } catch (err) {
            console.error('Lỗi khi lấy thông tin:', err);
        } return "error";
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
                        <div
                            key={item.id}
                            onClick={() => handleNavClick(item.path)}
                            className={`navbar-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <div className={`navbar-icon ${item.icon}`}></div>
                            <span className="navbar-label">{item.label}</span>
                        </div>
                    ))}
                </div>
                {role !== 'guest' && (
                    <Link to="/acc" className="navbar-user">
                        <div className="navbar-avatar"></div>
                        <div className="navbar-user-info">
                            <span className="navbar-user-name">{fullname}</span>
                            <span className="navbar-user-role">
                                {role === 'admin'
                                    ? 'Quản lý'
                                    : role === 'admin_service'
                                        ? 'Quản lý dịch vụ'
                                        : role === 'admin_room'
                                            ? 'Quản lý phòng'
                                            : 'Người dùng'}
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