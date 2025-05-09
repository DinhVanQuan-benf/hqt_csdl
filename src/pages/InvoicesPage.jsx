import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/invoices.css';

function InvoicePage() {
    const [invoices, setInvoices] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterService, setFilterService] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/api/usedservice/all');
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, []);

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesService = !filterService || invoice.service.name === filterService;
        const matchesStatus = !filterStatus || invoice.status === filterStatus;
        return matchesService && matchesStatus;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoices = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

    const uniqueStatuses = [...new Set(invoices.map(inv => inv.status))];
    const uniqueServices = [...new Set(invoices.map(inv => inv.service.name))];

    return (
        <div className="main-content">
            <div className="page">
                <h1>Quản Lý Hóa Đơn</h1>
                <div className="filter-section">
                    <div className="form-group">
                        <label htmlFor="filterService">Lọc theo dịch vụ:</label>
                        <select
                            id="filterService"
                            value={filterService}
                            onChange={(e) => setFilterService(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Tất cả</option>
                            {uniqueServices.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
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
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Dịch Vụ</th>
                            <th>Số Tiền</th>
                            <th>Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentInvoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.id}</td>
                                <td>{invoice.service.name}</td>
                                <td>{invoice.service.price.toLocaleString()} VND</td>
                                <td>{invoice.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className="pagination">
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
        </div>
    );
}

export default InvoicePage;
