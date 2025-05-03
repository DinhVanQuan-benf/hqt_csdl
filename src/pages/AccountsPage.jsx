import { useState } from 'react';
import '../styles/user.css';

function AccountsPage() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Nguyen Van A', email: 'a@example.com', phone: '0123456789', role: 'Admin' },
        { id: 2, name: 'Tran Thi B', email: 'b@example.com', phone: '0987654321', role: 'User' },
        { id: 3, name: 'Le Van C', email: 'c@example.com', phone: '0912345678', role: 'User' },
    ]);

    const handleDeleteUser = (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            setUsers(users.filter((user) => user.id !== userId));
        }
    };
    const handleRoleChange = (userId, newRole) => {
        setUsers(users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
        ));
    };
    return (
        <div className="main-content">
            <div className="page">
                <h1>Quản Lý Người Dùng</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Vai trò</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="role-select"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="action-btn delete-btn"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AccountsPage;