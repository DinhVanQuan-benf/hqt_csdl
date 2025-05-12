
import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/services.css';

function ServicesPage() {
    const [services, setServices] = useState([]);
    const [modal, setModal] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [residentsInRoom, setResidentsInRoom] = useState([]);
    const [selectedResidentId, setSelectedResidentId] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('/service/all');
                const data = Array.isArray(res.data[0]) ? res.data[0] : res.data;
                setServices(data);
            } catch (err) {
                console.error('Lỗi khi lấy dịch vụ:', err);
            }
        };

        const fetchRooms = async () => {
            try {
                const res = await axios.get('/room/all');
                setRooms(res.data);
            } catch (err) {
                console.error('Lỗi khi lấy phòng:', err);
            }
        };

        fetchServices();
        fetchRooms();
    }, []);

    useEffect(() => {
        if (!selectedRoomId) return;
        const room = rooms.find(r => r.id === Number(selectedRoomId));
        if (room) {
            const residents = room.rentalTimes.map(rt => rt.resident);
            setResidentsInRoom(residents);
            setSelectedResidentId(residents.length > 0 ? residents[0].id : '');
        }
    }, [selectedRoomId, rooms]);

    const handleAddService = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newService = {
            name: formData.get('name'),
            price: Number(formData.get('price')),
            description: formData.get('description')
        };
        try {
            await axios.post('/service/add', newService);
            setServices(prev => [...prev, { id: Date.now(), ...newService }]);
            setModal(null);
        } catch (err) {
            console.error('Lỗi thêm dịch vụ:', err);
        }
    };

    const handleEditService = async (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedService = {
            name: formData.get('name'),
            price: Number(formData.get('price')),
            description: formData.get('description')
        };
        try {
            await axios.put(`/service/update/${id}`, updatedService);
            setServices(prev =>
                prev.map(service => (service.id === id ? { id, ...updatedService } : service))
            );
            setModal(null);
        } catch (err) {
            console.error('Lỗi cập nhật dịch vụ:', err);
        }
    };

    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`/service/remove/${id}`);
            setServices(prev => prev.filter(service => service.id !== id));
        } catch (err) {
            console.error('Lỗi xóa dịch vụ:', err);
        }
    };

    const handleBookService = async (e, idService) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const booking = {
            duration: Number(formData.get('duration')),
        };
        try {
            await axios.post(
                `/usedservice/add/${selectedResidentId}/${idService}`,
                booking
            );
            alert('Yêu cầu đặt dịch vụ đã được gửi!');
        } catch (err) {
            console.error('Lỗi đặt dịch vụ:', err);
        }
        setModal(null);
    };

    const ServiceForm = ({ type, data = {}, onSubmit, onCancel }) => (
        <div className="modal-overlay">
            <div className="modal">
                <form className="service-form" onSubmit={onSubmit}>
                    <h3>{type === 'edit' ? 'Sửa Dịch Vụ' : type === 'book' ? 'Đặt Dịch Vụ' : 'Thêm Dịch Vụ'}</h3>
                    <div className="form-group">
                        <label htmlFor="name">Tên dịch vụ</label>
                        <input type="text" name="name" defaultValue={data.name || ''} required disabled={type === 'book'} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Giá (VND)</label>
                        <input type="number" name="price" defaultValue={data.price || ''} required disabled={type === 'book'} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea name="description" rows={3} defaultValue={data.description || ''} disabled={type === 'book'}></textarea>
                    </div>
                    {type === 'book' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="room">Chọn phòng</label>
                                <select value={selectedRoomId} onChange={e => setSelectedRoomId(e.target.value)} required>
                                    <option value="">-- Chọn phòng --</option>
                                    {rooms.map(room => (
                                        <option key={room.id} value={room.id}>{room.name}</option>
                                    ))}
                                </select>
                            </div>
                            {residentsInRoom.length > 0 && (
                                <div className="form-group">
                                    <label htmlFor="resident">Chọn cư dân</label>
                                    <select value={selectedResidentId} onChange={e => setSelectedResidentId(e.target.value)} required>
                                        {residentsInRoom.map(r => (
                                            <option key={r.id} value={r.id}>{r.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="duration">Thời lượng</label>
                                <input type="number" name="duration" min="1" required />
                            </div>
                        </>
                    )}
                    <div className="form-actions">
                        <button type="submit">
                            {type === 'edit' ? 'Cập nhật' : type === 'book' ? 'Gửi yêu cầu' : 'Thêm'}
                        </button>
                        <button type="button" onClick={onCancel}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="page services-page">
            <h2>Dịch Vụ</h2>
            <button className="add-button" onClick={() => setModal({ type: 'add' })}>+</button>

            <div className="service-container">
                {services.map((service) => (
                    <div key={service.id} className="service-card">
                        <h3>{service.name}</h3>
                        <p><strong>Giá:</strong> {service.price.toLocaleString()} VND</p>
                        <p><strong>Mô tả:</strong> {service.description}</p>
                        <div className="service-actions">
                            <button className="edit-button" onClick={() => setModal({ type: 'edit', data: service })}>Sửa</button>
                            <button className="delete-button" onClick={() => handleDeleteService(service.id)}>Xóa</button>
                            <button className="book-button" onClick={() => setModal({ type: 'book', data: service })}>
                                Đặt Dịch Vụ
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modal && (
                <ServiceForm
                    type={modal.type}
                    data={modal.data}
                    onSubmit={
                        modal.type === 'add' ? handleAddService :
                            modal.type === 'edit' ? (e) => handleEditService(e, modal.data.id) :
                                (e) => handleBookService(e, modal.data.id)
                    }
                    onCancel={() => setModal(null)}
                />
            )}
        </div>
    );
}

export default ServicesPage;