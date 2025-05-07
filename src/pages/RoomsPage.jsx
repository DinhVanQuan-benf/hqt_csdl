// RoomManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import RoomModal from "../components/RoomModal";
import "../styles/rooms.css";

function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get("/api/room/all");
            setRooms(response.data);
        } catch (error) {
            console.error("Lỗi khi tải phòng:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá phòng này?")) return;
        try {
            await axios.delete(`/api/room/remove/${id}`);
            setRooms(rooms.filter((room) => room.id !== id));
        } catch (error) {
            console.error("Lỗi khi xoá phòng:", error);
        }
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
        setShowModal(true);
    };

    const handleAddRoom = () => {
        setEditingRoom(null);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingRoom(null);
        fetchRooms();
    };

    return (
        <div className="room-container">
            <h2>Danh sách phòng</h2>
            <table className="room-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên phòng</th>
                        <th>Loại</th>
                        <th>Diện tích (m²)</th>
                        <th>Giá thuê</th>
                        <th>Trạng thái</th>
                        {/* <th>Số dân cư</th> */}
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <td>{room.type}</td>
                            <td>{room.area}</td>
                            <td>{room.rentPrice.toLocaleString()} VND</td>
                            <td>{room.rentStatus}</td>
                            {/* <td>{room.population}</td> */}
                            <td>
                                <button onClick={() => handleEdit(room)}>Sửa</button>
                                <button onClick={() => handleDelete(room.id)}>Xoá</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="add-room-button" onClick={handleAddRoom}>+</button>

            {showModal && (
                <RoomModal room={editingRoom} onClose={handleModalClose} />
            )}
        </div>
    );
}

export default RoomManagement;
