import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/contract.css";

function ContractModal({ room, rentalTime = {}, residents = [], onClose }) {
    const [startTime, setStartTime] = useState(rentalTime.startDate || "");
    const [endTime, setEndTime] = useState(rentalTime.endDate || "");
    const [residentList, setResidentList] = useState(residents);
    const [showResidentForm, setShowResidentForm] = useState(false);
    const [editingResidentIndex, setEditingResidentIndex] = useState(null);
    const [residentForm, setResidentForm] = useState({
        name: "",
        dateOfBirth: "",
        idNumber: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        setStartTime(rentalTime.startDate || "");
        setEndTime(rentalTime.endDate || "");
        setResidentList(residents);
    }, [rentalTime, residents]);

    const fetchResidents = async () => {
        try {
            const res = await axios.get(`/api/rentaltime/${rentalTime.id}/residents`);
            setResidentList(res.data);
        } catch (err) {
            console.error("Lỗi khi load danh sách dân cư", err);
        }
    };

    const handleResidentFormChange = (e) => {
        const { name, value } = e.target;
        setResidentForm({ ...residentForm, [name]: value });
    };

    const handleAddResident = () => {
        setEditingResidentIndex(null);
        setResidentForm({
            name: "",
            dateOfBirth: "",
            idNumber: "",
            phone: "",
            email: ""
        });
        setShowResidentForm(true);
    };

    const handleEditResident = (index) => {
        setEditingResidentIndex(index);
        setResidentForm({ ...residentList[index] });
        setShowResidentForm(true);
    };

    const handleDeleteResident = async (residentId) => {
        if (window.confirm("Xoá dân cư này?")) {
            try {
                await axios.put(`/api/room/break/${residentId}`, {});
                alert("Xoá dân cư thành công");
                await fetchResidents();
            } catch (err) {
                alert("Lỗi khi xoá dân cư");
            }
        }
    };

    const handleSaveResident = async () => {
        try {
            if (editingResidentIndex !== null) {
                const residentId = residentList[editingResidentIndex].id;
                await axios.put(`/api/resident/edit/${residentId}`, residentForm);
                alert("Sửa dân cư thành công");
            } else {
                const rentalTimePayload = {
                    startTime,
                    endTime,
                    resident: residentForm
                };
                await axios.put(`/api/room/add/resident/${room.id}`, rentalTimePayload);
                alert("Thêm dân cư thành công");
            }

            setShowResidentForm(false);
            setResidentForm({ name: "", dateOfBirth: "", idNumber: "", phone: "", email: "" });
            await fetchResidents();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi lưu dân cư");
        }
    };

    const handleSubmit = async () => {
        try {
            if (!startTime || !endTime) {
                alert("Vui lòng nhập đầy đủ thời gian thuê");
                return;
            }

            await axios.put(`/api/rentaltime/update/${rentalTime.id}`, {
                startTime,
                endTime,
                resident: {}
            });

            alert("Lưu hợp đồng thành công");
            onClose();
        } catch (err) {
            alert("Lỗi khi lưu hợp đồng");
        }
    };

    return (
        <div className="contract-modal">
            <div className="contract-modal-content">
                <h2>Hợp đồng - {room.name}</h2>

                <label>Thời gian bắt đầu:</label>
                <input
                    type="date"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />

                <label>Thời gian kết thúc:</label>
                <input
                    type="date"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />

                <h3>Danh sách dân cư</h3>
                <table className="resident-table">
                    <thead>
                        <tr>
                            <th>Họ tên</th>
                            <th>Ngày sinh</th>
                            <th>CMND/CCCD</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residentList.map((res, index) => (
                            <tr key={res.id || index}>
                                <td>{res.name}</td>
                                <td>{res.dateOfBirth}</td>
                                <td>{res.idNumber}</td>
                                <td>{res.phone}</td>
                                <td>{res.email}</td>
                                <td>
                                    <button onClick={() => handleEditResident(index)}>Sửa</button>
                                    <button onClick={() => handleDeleteResident(res.id)}>Xoá</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showResidentForm && (
                    <div className="resident-form">
                        <h4>{editingResidentIndex !== null ? "Sửa dân cư" : "Thêm dân cư"}</h4>
                        <input
                            name="name"
                            placeholder="Họ tên"
                            value={residentForm.name}
                            onChange={handleResidentFormChange}
                            required
                        />
                        <input
                            name="dateOfBirth"
                            type="date"
                            value={residentForm.dateOfBirth}
                            onChange={handleResidentFormChange}
                            required
                        />
                        <input
                            name="idNumber"
                            placeholder="CMND/CCCD"
                            value={residentForm.idNumber}
                            onChange={handleResidentFormChange}
                            required
                        />
                        <input
                            name="phone"
                            placeholder="Số điện thoại"
                            value={residentForm.phone}
                            onChange={handleResidentFormChange}
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={residentForm.email}
                            onChange={handleResidentFormChange}
                            required
                        />
                        <button onClick={handleSaveResident}>Xác nhận</button>
                    </div>
                )}

                <button onClick={handleAddResident}>+ Thêm dân cư</button>

                <div className="modal-actions">
                    <button onClick={onClose}>Đóng</button>
                    <button onClick={handleSubmit}>Lưu hợp đồng</button>
                </div>
            </div>
        </div>
    );
}

export default ContractModal;
