import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import "../styles/user.css";

function UserModal({ user, onClose, role }) {
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
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                password: "",
                fullName: user.fullName || "",
                dateOfBirth: user.dateOfBirth || "",
                phone: user.phone || "",
                email: user.email || "",
                position: user.position || "user",
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
            const payload = {
                username: formData.username,
                fullName: formData.fullName,
                dateOfBirth: formData.dateOfBirth || null,
                phone: formData.phone || null,
                email: formData.email || null,
                position: formData.position,
            };
            if (!user) {
                if (!formData.password) {
                    setError("Vui lòng nhập mật khẩu cho người dùng mới!");
                    return;
                }
                payload.password = formData.password;
            }
            if (user) {
                await axios.put(`/user/update/${user.id}`, payload);
                alert("Cập nhật người dùng thành công!");
            } else {
                await axios.post("/user/add", payload);
                alert("Thêm người dùng thành công!");
            }
            setError("");
            onClose();
        } catch (err) {
            console.error("Lỗi khi lưu người dùng:", err);
            setError("Lỗi khi lưu người dùng! Vui lòng kiểm tra dữ liệu.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="user-modal">
                <div><h3>{user ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</h3></div>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Tên đăng nhập"
                        required
                        disabled={!!user}
                    />
                    {!user && (
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mật khẩu"
                            required
                        />
                    )}
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Họ tên"
                        required
                    />
                    <input
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Điện thoại"
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <select name="position" value={formData.position} onChange={handleChange}>
                        <option value="">USER</option>
                        <option value="ADMIN_BUILDING">ADMIN_BUILDING</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="ADMIN_FINANCE">ADMIN_FINANCE</option>
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