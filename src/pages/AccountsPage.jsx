// UserManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserModal from "../components/UserModal";
import "../styles/user.css";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/user/all");
            setUsers(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách người dùng:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/user/remove/${id}`);
            fetchUsers();
        } catch (err) {
            console.error("Lỗi khi xoá người dùng:", err);
        }
    };

    const openModal = (user = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
        fetchUsers();
    };

    return (
        <div className="user-container">
            <h2>Quản lý người dùng</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên đăng nhập</th>
                        <th>Họ tên</th>
                        <th>Ngày sinh</th>
                        <th>Điện thoại</th>
                        <th>Email</th>
                        <th>Chức vụ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.position}</td>
                            <td>
                                <button onClick={() => openModal(user)}>Sửa</button>
                                <button onClick={() => handleDelete(user.id)}>Xoá</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-button" onClick={() => openModal()}>+ Thêm người dùng</button>
            {isModalOpen && <UserModal user={selectedUser} onClose={closeModal} />}
        </div>
    );
}

export default UserManagement;
