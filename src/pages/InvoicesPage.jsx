import { useState, useEffect } from 'react';
import '../styles/invoices.css';

function InvoicePage({ role }) {
    const [invoices, setInvoices] = useState([]);
    const [filterRoom, setFilterRoom] = useState('');
    const [filterService, setFilterService] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Giả định fetch danh sách hóa đơn từ API
        const fetchInvoices = async () => {
            let data;
            if (role === 'manager') {
                // Manager xem tất cả hóa đơn
                data = [
                    { id: 1, customerId: 1, customerName: 'Nguyen Van A', amount: 500000, status: 'Chưa thanh toán', room: '101', service: 'Internet' },
                    { id: 2, customerId: 2, customerName: 'Tran Thi B', amount: 300000, status: 'Đã thanh toán', room: '102', service: 'Điện' },
                    { id: 3, customerId: 1, customerName: 'Nguyen Van A', amount: 700000, status: 'Chưa thanh toán', room: '101', service: 'Nước' },
                    { id: 4, customerId: 3, customerName: 'Le Van C', amount: 400000, status: 'Chưa thanh toán', room: '103', service: 'Internet' },
                ];
            } else {
                // Customer chỉ xem hóa đơn của mình
                data = [
                    { id: 1, customerId: 1, customerName: 'Nguyen Van A', amount: 500000, status: 'Chưa thanh toán', room: '101', service: 'Internet' },
                    { id: 3, customerId: 1, customerName: 'Nguyen Van A', amount: 700000, status: 'Chưa thanh toán', room: '101', service: 'Nước' },
                ];
            }
            setInvoices(data);
        };
        fetchInvoices();
    });

    const handlePayment = (invoiceId) => {
        if (role !== 'customer') {
            alert('Chỉ khách hàng mới có thể thanh toán hóa đơn.');
            return;
        }
        if (window.confirm('Bạn có chắc chắn muốn thanh toán hóa đơn này?')) {
            setInvoices(
                invoices.map((invoice) =>
                    invoice.id === invoiceId ? { ...invoice, status: 'Đã thanh toán' } : invoice
                )
            );
            // Gọi API để xử lý thanh toán
            console.log(`Thanh toán hóa đơn ID: ${invoiceId}`);
        }
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesRoom = !filterRoom || invoice.room === filterRoom;
        const matchesService = !filterService || invoice.service === filterService;
        const matchesStatus = !filterStatus || invoice.status === filterStatus;
        const matchesName = !searchTerm || invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRoom && matchesService && matchesStatus && matchesName;
    });

    return (
        <div className="main-content">
            <div className="page">
                <h1>Quản Lý Hóa Đơn</h1>
                <div className="filter-section">
                    <div className="form-group">
                        <label htmlFor="searchTerm">Tìm kiếm khách hàng:</label>
                        <input
                            type="text"
                            id="searchTerm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Nhập tên khách hàng..."
                            className="filter-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="filterRoom">Lọc theo phòng:</label>
                        <select
                            id="filterRoom"
                            value={filterRoom}
                            onChange={(e) => setFilterRoom(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Tất cả</option>
                            <option value="101">Phòng 101</option>
                            <option value="102">Phòng 102</option>
                            <option value="103">Phòng 103</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="filterService">Lọc theo dịch vụ:</label>
                        <select
                            id="filterService"
                            value={filterService}
                            onChange={(e) => setFilterService(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Tất cả</option>
                            <option value="Internet">Internet</option>
                            <option value="Điện">Điện</option>
                            <option value="Nước">Nước</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="filterStatus">Lọc theo trạng thái:</label>
                        <select
                            id="filterStatus"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Tất cả</option>
                            <option value="Chưa thanh toán">Chưa thanh toán</option>
                            <option value="Đã thanh toán">Đã thanh toán</option>
                        </select>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Khách Hàng</th>
                            <th>Phòng</th>
                            <th>Dịch Vụ</th>
                            <th>Số Tiền</th>
                            <th>Trạng Thái</th>
                            {role === 'customer' && <th>Hành Động</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.id}</td>
                                <td>{invoice.customerName}</td>
                                <td>{invoice.room}</td>
                                <td>{invoice.service}</td>
                                <td>{invoice.amount.toLocaleString()} VND</td>
                                <td>{invoice.status}</td>
                                {role === 'customer' && invoice.status === 'Chưa thanh toán' && (
                                    <td>
                                        <button
                                            onClick={() => handlePayment(invoice.id)}
                                            className="action-btn pay-btn"
                                        >
                                            Thanh toán
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvoicePage;