import { useState } from 'react';
import '../styles/contracts.css';

function ContractsPage({ role, userId }) {
    const [contracts, setContracts] = useState([
        { id: 1, customerId: 101, customerName: 'Nguyen Van A', startDate: '2025-04-01', endDate: '2025-06-01', status: 'Chờ duyệt' },
        { id: 2, customerId: 102, customerName: 'Tran Thi B', startDate: '2025-03-15', endDate: '2025-05-15', status: 'Hết hạn' },
        { id: 3, customerId: 101, customerName: 'Le Van C', startDate: '2025-05-01', endDate: '2025-07-01', status: 'Đang hoạt động' },
        { id: 4, customerId: 103, customerName: 'Pham Thi D', startDate: '2025-04-10', endDate: '2025-06-10', status: 'Chờ duyệt' },
    ]);
    // Lọc hợp đồng theo userId nếu không phải manager
    const filteredContracts = role === 'manager' ? contracts : contracts.filter(contract => contract.customerId === userId);

    const handleApprove = (id) => {
        setContracts(contracts.map(contract =>
            contract.id === id ? { ...contract, status: 'Đang hoạt động' } : contract
        ));
        // TODO: Gửi API để duyệt hợp đồng
    };

    const handleReject = (id) => {
        setContracts(contracts.map(contract =>
            contract.id === id ? { ...contract, status: 'Từ chối' } : contract
        ));
        // TODO: Gửi API để từ chối hợp đồng
    };

    const handleCancel = (id) => {
        setContracts(contracts.map(contract =>
            contract.id === id ? { ...contract, status: 'Hủy bỏ' } : contract
        ));
        // TODO: Gửi API để hủy hợp đồng
    };

    return (
        <div className="page contracts-page">
            <h2>{role === 'manager' ? 'Quản Lý Hợp Đồng' : 'Hợp Đồng Của Tôi'}</h2>
            {filteredContracts.length === 0 ? (
                <p>Không có hợp đồng nào để hiển thị.</p>
            ) : (
                <div className="table-container">
                    <table className="contract-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên Khách Hàng</th>
                                <th>Ngày Bắt Đầu</th>
                                <th>Ngày Kết Thúc</th>
                                <th>Trạng Thái</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContracts.map((contract) => (
                                <tr key={contract.id}>
                                    <td>{contract.id}</td>
                                    <td>{contract.customerName}</td>
                                    <td>{contract.startDate}</td>
                                    <td>{contract.endDate}</td>
                                    <td>{contract.status}</td>
                                    <td>
                                        {role === 'manager' && contract.status === 'Chờ duyệt' ? (
                                            <>
                                                <button
                                                    className="approve-button"
                                                    onClick={() => handleApprove(contract.id)}
                                                >
                                                    Duyệt
                                                </button>
                                                <button
                                                    className="reject-button"
                                                    onClick={() => handleReject(contract.id)}
                                                >
                                                    Từ chối
                                                </button>
                                            </>
                                        ) : contract.status === 'Đang hoạt động' ? (
                                            <button
                                                className="cancel-button"
                                                onClick={() => handleCancel(contract.id)}
                                            >
                                                Hủy
                                            </button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ContractsPage;