// UserModal.jsx
import React, { useState, useEffect } from "react";
import "../styles/user.css";
import axios from "axios";

function UserModal({ user, onClose, rooms }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fullName: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        position: "user",
        roomId: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                ...user,
                roomId: user.room?.id || ""
            });
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
                await axios.put(`http://localhost:8080/api/users/${user.id}`, formData);
            } else {
                await axios.post("http://localhost:8080/api/users", formData);
            }
            onClose();
        } catch (err) {
            console.error("Lỗi khi lưu người dùng:", err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="user-modal">
                <div><h3>{user ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</h3></div>
                <form onSubmit={handleSubmit}>
                    <input name="username" value={formData.username} onChange={handleChange} placeholder="Tên đăng nhập" required />

                    {!user && (
                        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Mật khẩu" required />
                    )}

                    <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Họ tên" required />
                    <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />

                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Điện thoại" />
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />

                    <select name="position" value={formData.position} onChange={handleChange}>
                        <option value="">-- Chức vụ --</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <select name="roomId" value={formData.roomId} onChange={handleChange}>
                        <option value="">-- Chọn phòng --</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>{room.name}</option>
                        ))}
                    </select>

                    <div className="modal-buttons">
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={onClose}>Huỷ</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default UserModal;

