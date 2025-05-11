import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/acc.css';
import { getToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';

function AccountManagement() {
    const [userInfo, setUserInfo] = useState({
        id: '',
        fullname: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        password: "",
        position: ""
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    const fetchUserInfo = async () => {
        const token = getToken();
        let username;
        try {
            const decoded = jwtDecode(token);
            username = decoded.sub;
        } catch (error) {
            setMessage('Token không hợp lệ.');
            return;
        }
        try {
            const getRes = await axios.get(`/user/get`, {
                params: { username },
            });

            const user = getRes.data;
            setUserInfo(user);
        } catch (err) {
            console.error('Lỗi khi lấy thông tin:', err);
            setMessage('Không thể tải thông tin người dùng.');
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

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
        const token = getToken();
        try {
            await axios.put(`/user/update/${userInfo.id}`, userInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Cập nhật thông tin thành công!');
            setIsEditing(false);
        } catch (error) {
            console.error('Cập nhật lỗi:', error);
            setMessage('Không thể cập nhật thông tin.');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!passwordData.oldPassword) {
            setMessage('Vui lòng nhập mật khẩu hiện tại.');
            return;
        }
        if (passwordData.oldPassword !== userInfo.password) {
            setMessage('Mật khẩu không đúng');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage('Mật khẩu mới không khớp.');
            return;
        }
        if (!passwordData.newPassword) {
            setMessage('Vui lòng nhập mật khẩu mới.');
            return;
        }

        try {
            await axios.put(`/user/update/${userInfo.id}`, {
                ...userInfo,
                password: passwordData.newPassword
            });
            setMessage('Đổi mật khẩu thành công!');
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Đổi mật khẩu lỗi:', error);
            setMessage('Đổi mật khẩu thất bại.');
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
                            name="fullname"
                            value={userInfo.fullname}
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
                        <label>Ngày sinh:</label>
                        <input
                            type="text"
                            name="address"
                            value={userInfo.dateOfBirth}
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
                        <div className="form-group">
                            <label>Mật Khẩu Hiện Tại:</label>
                            <input
                                type="password"
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>

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
                        <label>Xác Nhận Mật Khẩu:</label>
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
