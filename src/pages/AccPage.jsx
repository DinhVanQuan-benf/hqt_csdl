import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/acc.css';
import { getToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';

function AccountManagement() {
    const [userInfo, setUserInfo] = useState({
        id: '',
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        password: "",
        position: ""
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
            setMessage('Token không hợp lệ.', error);
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


    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/user/update/${userInfo.id}`, userInfo);
            setMessage('Cập nhật thông tin thành công!');
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Cập nhật lỗi:', error);
            setMessage('Không thể cập nhật thông tin.');
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
                            name="fullName"
                            value={userInfo.fullName}
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
                            type="date"
                            name="dateOfBirth"
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
        </div>
    );
}

export default AccountManagement;
