import { useState } from 'react';
import '../styles/complaints.css';

function ComplaintsPage({ role }) {
    const [complaints, setComplaints] = useState([
        { id: 1, title: 'Cúp điện', description: 'Phòng 101 bị cúp điện từ sáng nay.', status: 'Chưa xử lý' },
        { id: 2, title: 'Rò rỉ nước', description: 'Phòng 102 có ống nước bị rò rỉ.', status: 'Đang xử lý' },
    ]);
    const [messages, setMessages] = useState([
        { id: 1, content: 'Xin chào, tôi cần hỗ trợ về rò rỉ nước.', timestamp: '2023-10-01 10:00', own: false },
        { id: 2, content: 'Chào bạn, chúng tôi sẽ xử lý ngay.', timestamp: '2023-10-01 10:05', own: true },
    ]);
    const [newComplaint, setNewComplaint] = useState({ title: '', description: '' });
    const [newMessage, setNewMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleAddComplaint = (e) => {
        e.preventDefault();
        setComplaints([...complaints, { id: Date.now(), ...newComplaint, status: 'Chưa xử lý' }]);
        setNewComplaint({ title: '', description: '' });
        setShowModal(false);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { id: Date.now(), content: newMessage, timestamp: new Date().toISOString(), own: true }]);
            setNewMessage('');
        }
    };

    return (
        <div className="page complaints-page">
            <h2>Khiếu Nại</h2>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Mô tả</th>
                            <th>Trạng thái</th>
                            {role === 'manager' && <th>Hành động</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint.id}>
                                <td>{complaint.title}</td>
                                <td>{complaint.description}</td>
                                <td>{complaint.status}</td>
                                {role === 'manager' && (
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => alert(`Xử lý khiếu nại: ${complaint.title}`)}
                                        >
                                            Xử lý
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => setComplaints(complaints.filter((c) => c.id !== complaint.id))}
                                        >
                                            Từ chối
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {role !== 'manager' && (
                <button className="add-button" onClick={() => setShowModal(true)}>
                    +
                </button>
            )}

            <h2>Chat Hỗ Trợ</h2>
            <div className="chat-container">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-message ${message.own ? 'own-message' : ''}`}
                    >
                        <div className="chat-message-content">{message.content}</div>
                        <div className="chat-message-time">{message.timestamp}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    required
                />
                <button type="submit">Gửi</button>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Thêm Khiếu Nại</h2>
                        <form onSubmit={handleAddComplaint}>
                            <label>
                                Tiêu đề:
                                <input
                                    type="text"
                                    value={newComplaint.title}
                                    onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                Mô tả:
                                <textarea
                                    value={newComplaint.description}
                                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                                    required
                                />
                            </label>
                            <div className="modal-actions">
                                <button type="submit">Thêm</button>
                                <button type="button" onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ComplaintsPage;