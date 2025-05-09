import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/acc.css";

function AccountManagement(id) {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    // Lấy thông tin người dùng khi component mount
    useEffect(() => {
        fetchUserInfo();
    });

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`/api/user/${id}`);
            setUserInfo(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            setMessage("Không thể tải thông tin người dùng.");
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
        try {
            await axios.put(`/api/user/update/${id}`, userInfo);
            setMessage("Cập nhật thông tin thành công!");
            setIsEditing(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            setMessage("Cập nhật thông tin thất bại.");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }
        try {
            await axios.put(`/api/user/update/${id}`, {
                ...userInfo,
                password: passwordData.newPassword
            });
            setMessage("Đổi mật khẩu thành công!");
            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            console.error("Lỗi khi đổi mật khẩu:", error);
            setMessage("Đổi mật khẩu thất bại. Vui lòng kiểm tra mật khẩu cũ.");
        }
    };

    return (
        <div className="account-container">
            <h2>Quản Lý Tài Khoản Cá Nhân</h2>

            {/* Form Thông Tin Cá Nhân */}
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

            {/* Form Đổi Mật Khẩu */}
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