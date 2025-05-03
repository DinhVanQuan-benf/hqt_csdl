import { useState, useEffect } from 'react';
import RoomForm from '../components/RoomForm';
import { mockRoomsData } from '../data/mockData';
import AuthModal from '../components/AuthModal';
import '../styles/rooms.css';

function RoomsPage({ role: initialRole }) {
    const [rooms, setRooms] = useState(mockRoomsData);
    const [modal, setModal] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [role, setRole] = useState(initialRole);

    useEffect(() => {
        // Đồng bộ role từ localStorage nếu có token
        const token = localStorage.getItem('token');
        if (token && !role) {
            setRole('customer'); // Giả định role mặc định là 'customer'
        }
    }, [role]);

    const handleAddRoom = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newRoom = {
            id: Date.now(),
            number: formData.get('number'),
            type: formData.get('type'),
            price: Number(formData.get('price')),
            status: 'Trống'
        };
        setRooms([...rooms, newRoom]);
        setModal(null);
    };

    const handleEditRoom = (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedRoom = {
            id,
            number: formData.get('number'),
            type: formData.get('type'),
            price: Number(formData.get('price'))
        };
        setRooms(rooms.map((room) => (room.id === id ? updatedRoom : room)));
        setModal(null);
    };

    const handleDeleteRoom = (id) => {
        setRooms(rooms.filter((room) => room.id !== id));
    };

    const handleBookRoom = (room) => {
        if (!localStorage.getItem('token')) {
            setIsAuthModalOpen(true); // Mở modal đăng nhập nếu chưa đăng nhập
            return;
        }
        setModal({ type: 'book', data: room });
    };

    const handleAuthSuccess = (newRole) => {
        setRole(newRole);
        setIsAuthModalOpen(false);
        if (modal && modal.type === 'book') {
            setModal(modal); // Tiếp tục mở modal đặt phòng
        }
    };

    return (
        <div className="page rooms-page">
            <h2>{role === 'manager' ? 'Quản Lý Phòng' : 'Đặt Phòng'}</h2>
            {role === 'manager' && (
                <button
                    className="add-button"
                    onClick={() => setModal({ type: 'add' })}
                >
                    +
                </button>
            )}
            <div className="card-container">
                {rooms.length === 0 ? (
                    <p>Không có phòng nào để hiển thị.</p>
                ) : (
                    rooms.map((room) => (
                        <div key={room.id} className="card">
                            <h3>Phòng {room.number}</h3>
                            <p><strong>Loại:</strong> {room.type}</p>
                            <p><strong>Giá:</strong> {room.price.toLocaleString()} VND</p>
                            <p><strong>Trạng thái:</strong> {room.status}</p>
                            <div className="card-actions">
                                {role === 'manager' ? (
                                    <>
                                        <button
                                            className="edit-button"
                                            onClick={() => setModal({ type: 'edit', data: room })}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDeleteRoom(room.id)}
                                        >
                                            Xóa
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="book-button"
                                        onClick={() => handleBookRoom(room)}
                                        disabled={room.status !== 'Trống'}
                                    >
                                        Đặt Phòng
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {modal && (
                <RoomForm
                    type={modal.type}
                    data={modal.data}
                    onSubmit={modal.type === 'add' ? handleAddRoom : modal.type === 'edit' ? handleEditRoom : handleBookRoom}
                    onCancel={() => setModal(null)}
                />
            )}
            {isAuthModalOpen && (
                <AuthModal
                    onLoginSuccess={handleAuthSuccess}
                    onClose={() => setIsAuthModalOpen(false)}
                />
            )}
        </div>
    );
}

export default RoomsPage;