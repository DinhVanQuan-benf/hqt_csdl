import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import '../styles/invoices.css';

function InvoicePage() {
    const [invoices, setInvoices] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterService, setFilterService] = useState('');
    const [filterResident, setFilterResident] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editModal, setEditModal] = useState(null);
    const [billModal, setBillModal] = useState(null);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/usedservice/all');
                const services = response.data;

                setInvoices(services);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, []);

    const handleEdit = (invoice) => {
        setEditModal(invoice);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updated = {
            quantity: Number(formData.get("quantity")),
            status: formData.get("status")
        };

        try {
            await axios.put(`/usedservice/update/${editModal.id}`, updated);
            setInvoices(prev =>
                prev.map(inv => inv.id === editModal.id ? { ...inv, ...updated } : inv)
            );
            setEditModal(null);
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
        }
    };

    const handleCreateBill = (invoice) => {
        setBillModal(invoice);
    };

    const handleSubmitBill = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const paymentType = formData.get("paymentType");
        const now = new Date();
        const bill = {
            name: `${billModal.residentName} - ${billModal.service.name}`,
            paymentAmount: (billModal.quantity || 1) * billModal.service.price,
            paymentDate: now.toISOString(),
            paymentType,
            note: "Tạo hóa đơn tự động",
        };

        try {
            await axios.post(`/bill/add/${billModal.id}`, bill);
            const updatedStatus = {
                quantity: billModal.quantity,
                status: "Đã thanh toán"
            };
            await axios.put(`/usedservice/update/${billModal.id}`, updatedStatus);

            setInvoices(prev =>
                prev.map(inv =>
                    inv.id === billModal.id ? { ...inv, status: "Đã thanh toán" } : inv
                )
            );

            alert("Tạo hóa đơn thành công và cập nhật trạng thái!");
            setBillModal(null);
        } catch (err) {
            console.error("Lỗi tạo hóa đơn:", err);
        }
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesService = !filterService || invoice.service.name === filterService;
        const matchesStatus = !filterStatus || invoice.status === filterStatus;
        const matchesResident = !filterResident || invoice.residentName === filterResident;
        return matchesService && matchesStatus && matchesResident;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoices = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

    const uniqueStatuses = [...new Set(invoices.map(inv => inv.status))];
    const uniqueServices = [...new Set(invoices.map(inv => inv.service.name))];
    const uniqueResidents = [...new Set(invoices.map(inv => inv.residentName))];

    return (
        <div className="invoice-main-content">
            <div className="invoice-page">
                <h1>Quản Lý Hóa Đơn</h1>
                <div className="invoice-filter-section">
                    <div className="invoice-form-group">
                        <label htmlFor="filterService">Lọc theo dịch vụ:</label>
                        <select
                            id="filterService"
                            value={filterService}
                            onChange={(e) => setFilterService(e.target.value)}
                            className="invoice-filter-select"
                        >
                            <option value="">Tất cả</option>
                            {uniqueServices.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>

                    <div className="invoice-form-group">
                        <label htmlFor="filterStatus">Lọc theo trạng thái:</label>
                        <select
                            id="filterStatus"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="invoice-filter-select"
                        >
                            <option value="">Tất cả</option>
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className="invoice-form-group">
                        <label htmlFor="filterResident">Lọc theo cư dân:</label>
                        <select
                            id="filterResident"
                            value={filterResident}
                            onChange={(e) => setFilterResident(e.target.value)}
                            className="invoice-filter-select"
                        >
                            <option value="">Tất cả</option>
                            {uniqueResidents.map(resident => (
                                <option key={resident} value={resident}>{resident}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Dịch Vụ</th>
                            <th>Cư Dân</th>
                            <th>Số Lượng</th>
                            <th>Số Tiền</th>
                            <th>Tổng Tiền</th>
                            <th>Trạng Thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentInvoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.id}</td>
                                <td>{invoice.service.name}</td>
                                <td>{invoice.residentName}</td>
                                <td>{invoice.quantity || 1}</td>
                                <td>{invoice.service.price.toLocaleString()} VND</td>
                                <td>{((invoice.quantity || 1) * invoice.service.price).toLocaleString()} VND</td>
                                <td>{invoice.status}</td>
                                <td>
                                    <button onClick={() => handleEdit(invoice)}>Sửa</button>
                                    {invoice.status !== "Đã thanh toán" && (
                                        <button onClick={() => handleCreateBill(invoice)}>Tạo hóa đơn</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className="invoice-pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {editModal && (
                <div className="invoice-modal-overlay">
                    <div className="invoice-modal">
                        <form onSubmit={handleUpdate}>
                            <h3>Sửa dịch vụ #{editModal.id}</h3>
                            <label>Trạng thái:</label>
                            <input name="status" defaultValue={editModal.status} required />
                            <label>Số lượng:</label>
                            <input name="quantity" type="number" defaultValue={editModal.quantity} required />
                            <div style={{ marginTop: '10px' }}>
                                <button type="submit">Lưu</button>
                                <button type="button" onClick={() => setEditModal(null)}>Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {billModal && (
                <div className="invoice-modal-overlay">
                    <div className="invoice-modal">
                        <form onSubmit={handleSubmitBill}>
                            <h3>Tạo hóa đơn cho dịch vụ #{billModal.id}</h3>
                            <label>Hình thức thanh toán:</label>
                            <select name="paymentType" required>
                                <option value="">-- Chọn --</option>
                                <option value="Thanh toán trực tiếp">Thanh toán trực tiếp</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                            </select>
                            <div style={{ marginTop: '10px' }}>
                                <button type="submit">Tạo hóa đơn</button>
                                <button type="button" onClick={() => setBillModal(null)}>Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InvoicePage;
