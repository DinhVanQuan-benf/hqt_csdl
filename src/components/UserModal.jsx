// UserModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/user.css";

function UserModal({ user, onClose }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fullName: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        position: "user",
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                await axios.put(`/user/edit/${user.id}`, formData);
            } else {
                await axios.post("/user/add", formData);
            }
            onClose();
        } catch (error) {
            console.error("Lỗi khi lưu người dùng:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{user ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</h3>
                <form onSubmit={handleSubmit}>
                    <input name="username" value={formData.username} onChange={handleChange} placeholder="Tên đăng nhập" required />
                    <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Mật khẩu" required={!user} />
                    <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Họ tên" required />
                    <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" required />
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <select name="position" value={formData.position} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <div className="modal-actions">
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={onClose}>Huỷ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserModal;
