import React, { useEffect, useState } from "react";
import axios from "axios";
import RoomModal from "../components/RoomModal";
import ContractModal from "../components/ContractModal";
import "../styles/rooms.css";

function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [latestRental, setLatestRental] = useState(null);
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const res = await axios.get("/api/room/all");
            setRooms(res.data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách phòng:", err);
        }
    };

    const handleAddRoom = () => {
        setEditingRoom(null);
        setShowRoomModal(true);
    };

    const handleEditRoom = (room) => {
        setEditingRoom(room);
        setShowRoomModal(true);
    };

    const handleStatusClick = (room) => {
        setSelectedRoom(room);

        // Lấy rentalTime mới nhất
        const latest = room.rentalTimes?.[room.rentalTimes.length - 1] || [];
        setLatestRental(latest || null);
        // Lấy tất cả cư dân từ các rentalTimes
        const allResidents = room.rentalTimes?.reduce((acc, rental) => {
            if (rental.resident) {
                acc.push(rental.resident);
            }
            return acc;
        }, []) || [];
        setResidents(allResidents);
    };
    const closeModals = () => {
        setShowRoomModal(false);
        setSelectedRoom(null);
        setEditingRoom(null);
        setLatestRental(null);
        setResidents([]);
        fetchRooms();
    };

    return (
        <div className="room-container">
            <h2>Danh sách phòng</h2>
            <div className="room-grid">
                {rooms.map((room) => {
                    const latest = room.rentalTimes?.[room.rentalTimes.length - 1];
                    return (
                        <div className="room-card" key={room.id}>
                            <h3>{room.name}</h3>
                            <p><strong>Loại:</strong> {room.type}</p>
                            <p><strong>Diện tích:</strong> {room.area} m²</p>
                            <p><strong>Giá thuê:</strong> {room.rentPrice.toLocaleString()} VND</p>
                            <p>
                                <strong>Trạng thái:</strong><br />
                                <span
                                    className="clickable-status"
                                    onClick={() => handleStatusClick(room)}
                                >
                                    {room.rentStatus === "available"
                                        ? "Thêm hợp đồng"
                                        : `${latest?.startDate || ""} -> ${latest?.endDate || ""}`}
                                </span>
                            </p>
                            <div className="actions">
                                <button onClick={() => handleEditRoom(room)}>Sửa</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="add-room-button" onClick={handleAddRoom}>+ Thêm phòng</button>

            {showRoomModal && (
                <RoomModal room={editingRoom} onClose={closeModals} />
            )}

            {selectedRoom && (
                <ContractModal
                    room={selectedRoom}
                    rentalTime={latestRental}
                    residents={residents}
                    onClose={closeModals}
                />
            )}
        </div>
    );
}

export default RoomManagement;
