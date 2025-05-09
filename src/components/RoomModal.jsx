import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/user.css"; // Dùng lại user.css để thống nhất

function RoomModal({ room, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        area: "",
        rentPrice: ""
    });

    useEffect(() => {
        if (room) {
            // Nếu sửa phòng thì lấy dữ liệu hiện có
            setFormData({
                name: room.name,
                type: room.type,
                area: room.area,
                rentPrice: room.rentPrice
            });
        }
    }, [room]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (room) {
                // Sửa phòng
                await axios.put(`/api/room/edit/${room.id}`, {
                    ...formData,
                    rentStatus: room.rentStatus // Giữ nguyên trạng thái khi sửa
                });
            } else {
                // Thêm phòng mới với trạng thái mặc định là "available"
                await axios.post("/api/room/add", {
                    ...formData,
                    rentStatus: "available"
                });
            }
            onClose();
        } catch (error) {
            console.error("Lỗi khi lưu phòng:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="room-modal">
                <h3>{room ? "Sửa phòng" : "Thêm phòng mới"}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tên phòng"
                        required
                    />
                    <input
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Loại phòng"
                        required
                    />
                    <input
                        name="area"
                        type="number"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="Diện tích (m²)"
                        required
                    />
                    <input
                        name="rentPrice"
                        type="number"
                        value={formData.rentPrice}
                        onChange={handleChange}
                        placeholder="Giá thuê"
                        required
                    />

                    <div className="modal-buttons">
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={onClose}>Huỷ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RoomModal;
