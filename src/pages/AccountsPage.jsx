// UserManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserModal from "../components/UserModal";
import "../styles/user.css";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        fetchUsers();
        fetchRooms();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchName, users]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/api/user/all");
            setUsers(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách người dùng:", err);
        }
    };

    const fetchRooms = async () => {
        try {
            const res = await axios.get("/api/room/all");
            setRooms(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách phòng:", err);
        }
    };

    const filterUsers = () => {
        let filtered = [...users];
        if (searchName) {
            filtered = filtered.filter((user) =>
                user.username.toLowerCase().includes(searchName.toLowerCase())
            );
        }
        setFilteredUsers(filtered);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/user/remove/${id}`);
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

            <div className="user-filters">
                <input
                    type="text"
                    placeholder="Tìm theo tên đăng nhập"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />

            </div>

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
                        <th>Phòng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.position}</td>
                            <td>{user.room?.name || "Chưa có"}</td>
                            <td>
                                <button onClick={() => openModal(user)}>Sửa</button>
                                <button onClick={() => handleDelete(user.id)}>Xoá</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="add-button" onClick={() => openModal()}>+</button>

            {isModalOpen && <UserModal user={selectedUser} rooms={rooms} onClose={closeModal} />}
        </div>
    );
}

export default UserManagement;
