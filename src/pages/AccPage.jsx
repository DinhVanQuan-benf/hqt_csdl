import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/acc.css';
import { getToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';

function AccountManagement() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    // Lấy user ID từ token
    const getUserId = () => {
        const token = getToken();
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.sub; // Giả sử 'sub' chứa username, cần endpoint để lấy ID
            } catch (error) {
                console.error('Invalid token:', error);
                return null;
            }
        }
        return null;
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const username = getUserId();
        if (!username) {
            setMessage('Vui lòng đăng nhập để xem thông tin.');
            return;
        }
        try {
            const response = await axios.get(`/user/${username}`);
            setUserInfo(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            setMessage('Không thể tải thông tin người dùng.');
        }
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        const username = getUserId();
        if (!username) {
            setMessage('Vui lòng đăng nhập để cập nhật.');
            return;
        }
        try {
            await axios.put(`/user/update/${username}`, userInfo);
            setMessage('Cập nhật thông tin thành công!');
            setIsEditing(false);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            setMessage('Cập nhật thông tin thất bại.');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const username = getUserId();
        if (!username) {
            setMessage('Vui lòng đăng nhập để đổi mật khẩu.');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }
        try {
            await axios.put(`/user/update/${username}`, {
                ...userInfo,
                password: passwordData.newPassword
            });
            setMessage('Đổi mật khẩu thành công!');
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Lỗi khi đổi mật khẩu:', error);
            setMessage('Đổi mật khẩu thất bại. Vui lòng kiểm tra mật khẩu cũ.');
        }
    };

    return (
        <div className="account-container">
            <h2>Quản Lý Tài Khoản Cá Nhân</h2>

            <div className="account-section">
                <h3>Thông Tin Cá Nhân</h3>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleUpdateUserInfo}>
                    <div className="form-group">
                        <label>Họ và Tên:</label>
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleUserInfoChange}
                            disabled={!isEditing}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleUserInfoChange}
                            disabled={!isEditing}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Số Điện Thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleUserInfoChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa Chỉ:</label>
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            onChange={handleUserInfoChange}
                            disabled={!isEditing}
                        />
                    </div>
                    {isEditing ? (
                        <div className="form-buttons">
                            <button type="submit">Lưu</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Hủy</button>
                        </div>
                    ) : (
                        <button type="button" onClick={() => setIsEditing(true)}>Chỉnh Sửa</button>
                    )}
                </form>
            </div>

            <div className="account-section">
                <h3>Đổi Mật Khẩu</h3>
                <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label>Mật Khẩu Cũ:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật Khẩu Mới:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Xác Nhận Mật Khẩu Mới:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit">Đổi Mật Khẩu</button>
                </form>
            </div>
        </div>
    );
}

export default AccountManagement;