import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import "../styles/user.css";

function RoomModal({ room, onClose, role }) {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        area: "",
        rentPrice: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (room) {
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
        if (role !== "admin_room") {
            setError("Chỉ quản lý phòng được thêm/sửa phòng!");
            return;
        }
        try {
            const payload = {
                name: formData.name,
                type: formData.type,
                area: Number(formData.area),
                rentPrice: Number(formData.rentPrice),
                rentStatus: room ? room.rentStatus : "available"
            };
            if (isNaN(payload.area) || isNaN(payload.rentPrice)) {
                setError("Diện tích và giá thuê phải là số hợp lệ!");
                return;
            }
            if (room) {
                await axios.put(`/api/room/edit/${room.id}`, payload);
                alert("Cập nhật phòng thành công!");
            } else {
                await axios.post("/api/room/add", payload);
                alert("Thêm phòng thành công!");
            }
            setError("");
            onClose();
        } catch (error) {
            console.error("Lỗi khi lưu phòng:", error);
            setError("Lỗi khi lưu phòng! Vui lòng kiểm tra dữ liệu.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="room-modal">
                <h3>{room ? "Sửa phòng" : "Thêm phòng mới"}</h3>
                {error && <p className="error">{error}</p>}
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
                        min="1"
                    />
                    <input
                        name="rentPrice"
                        type="number"
                        value={formData.rentPrice}
                        onChange={handleChange}
                        placeholder="Giá thuê"
                        required
                        min="0"
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