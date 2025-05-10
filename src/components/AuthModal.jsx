import { useState } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/register.css';
import { setToken, getRole } from '../utils/auth';

function AuthModal({ onLoginSuccess, onClose }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

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
        return null;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('user/login', formData);

            const { accessToken, tokenType } = res.data;
            const token = `${tokenType} ${accessToken}`;
            setToken(token);
            const backendRole = getRole();

            if (!backendRole) {
                setError('Không tìm thấy role trong token!');
                return;
            }

            const mappedRole = mapRole(backendRole);
            if (!mappedRole) {
                setError('Role không hợp lệ!');
                return;
            }

            alert('Đăng nhập thành công!');
            onLoginSuccess(mappedRole);
            onClose();
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            setError('Đăng nhập thất bại! Vui lòng kiểm tra thông tin.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal auth-modal">
                <h2>Đăng nhập</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        name="username"
                        placeholder="Tên đăng nhập"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="form-actions">
                        <button type="submit">Đăng nhập</button>
                        <button type="button" onClick={onClose}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthModal;