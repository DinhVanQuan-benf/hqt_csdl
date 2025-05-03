import { useState } from 'react';
import ServiceForm from '../components/ServiceForm';
import { mockServicesData } from '../data/mockData';
import '../styles/services.css';

function ServicesPage({ role }) {
    const [services, setServices] = useState(mockServicesData);
    const [modal, setModal] = useState(null);

    const handleAddService = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newService = {
            id: Date.now(),
            name: formData.get('name'),
            price: Number(formData.get('price')),
            status: 'Có sẵn'
        };
        setServices([...services, newService]);
        // TODO: Gửi dữ liệu đến backend
        // Ví dụ API: fetch('/api/services', { method: 'POST', body: JSON.stringify(newService) });
        setModal(null);
    };

    const handleEditService = (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedService = {
            id,
            name: formData.get('name'),
            price: Number(formData.get('price'))
        };
        setServices(services.map((service) => (service.id === id ? updatedService : service)));
        // TODO: Cập nhật dữ liệu trên backend
        // Ví dụ API: fetch(`/api/services/${id}`, { method: 'PUT', body: JSON.stringify(updatedService) });
        setModal(null);
    };

    const handleDeleteService = (id) => {
        setServices(services.filter((service) => service.id !== id));
        // TODO: Xóa dữ liệu trên backend
        // Ví dụ API: fetch(`/api/services/${id}`, { method: 'DELETE' });
    };

    const handleBookService = (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const booking = {
            serviceId: id,
            duration: Number(formData.get('duration')),
            status: 'Chờ duyệt'
        };
        // TODO: Gửi yêu cầu đặt dịch vụ đến backend
        // Ví dụ API: fetch('/api/service-bookings', { method: 'POST', body: JSON.stringify(booking) });
        alert('Yêu cầu đặt dịch vụ đã được gửi!');
        setModal(null);
    };

    return (
        <div className="page services-page">
            <h2>{role === 'manager' ? 'Quản Lý Dịch Vụ' : 'Dịch Vụ'}</h2>
            {role === 'manager' && (
                <button
                    className="add-button"
                    onClick={() => setModal({ type: 'add' })}
                >
                    +
                </button>
            )}
            <div className="card-container">
                {services.map((service) => (
                    <div key={service.id} className="card">
                        <h3>{service.name}</h3>
                        <p><strong>Giá:</strong> {service.price.toLocaleString()} VND</p>
                        <p><strong>Trạng thái:</strong> {service.status}</p>
                        <div className="card-actions">
                            {role === 'manager' ? (
                                <>
                                    <button
                                        className="edit-button"
                                        onClick={() => setModal({ type: 'edit', data: service })}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteService(service.id)}
                                    >
                                        Xóa
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="book-button"
                                    onClick={() => setModal({ type: 'book', data: service })}
                                    disabled={service.status !== 'Có sẵn'}
                                >
                                    Đặt Dịch Vụ
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {modal && (
                <ServiceForm
                    type={modal.type}
                    data={modal.data}
                    onSubmit={modal.type === 'add' ? handleAddService : modal.type === 'edit' ? handleEditService : handleBookService}
                    onCancel={() => setModal(null)}
                />
            )}
        </div>
    );
}

export default ServicesPage;