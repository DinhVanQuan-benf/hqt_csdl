// RoomModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/rooms.css";

function RoomModal({ room, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        area: "",
        rentPrice: "",
        rentStatus: "",
        // population: ""
    });

    useEffect(() => {
        if (room) {
            setFormData(room);
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
                await axios.put(`/room/edit/${room.id}`, formData);
            } else {
                await axios.post("/room/add", formData);
            }
            onClose();
        } catch (error) {
            console.error("Lỗi khi lưu phòng:", error);
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{room ? "Sửa phòng" : "Thêm phòng mới"}</h3>
                <form onSubmit={handleSubmit} className="room-form">
                    <label>
                        Tên phòng:
                        <input name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Loại:
                        <input name="type" value={formData.type} onChange={handleChange} required />
                    </label>
                    <label>
                        Diện tích:
                        <input name="area" type="number" value={formData.area} onChange={handleChange} required />
                    </label>
                    <label>
                        Giá thuê:
                        <input name="rentPrice" type="number" value={formData.rentPrice} onChange={handleChange} required />
                    </label>
                    <label>
                        Trạng thái:
                        <input name="rentStatus" value={formData.rentStatus} onChange={handleChange} required />
                    </label>
                    {/* <label>
                        Số dân cư:
                        <input name="population" type="number" value={formData.population} onChange={handleChange} required />
                    </label> */}
                    <div className="modal-actions">
                        <button type="submit" onclick={handleSubmit}>Lưu</button>
                        <button type="button" onClick={onClose}>Huỷ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RoomModal;
