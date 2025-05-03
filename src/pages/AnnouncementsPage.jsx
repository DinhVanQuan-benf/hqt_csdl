import { useState } from 'react';
import '../styles/announcements.css';

function AnnouncementsPage({ role }) {
    const [announcements, setAnnouncements] = useState([
        { id: 1, title: 'Bảo trì thang máy', content: 'Thang máy sẽ được bảo trì từ 9h đến 12h ngày 15/10/2023.' },
        { id: 2, title: 'Cắt nước tạm thời', content: 'Nước sẽ bị cắt từ 14h đến 16h ngày 16/10/2023 để sửa chữa đường ống.' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editAnnouncement, setEditAnnouncement] = useState(null);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });

    const handleAddOrEditAnnouncement = (e) => {
        e.preventDefault();
        if (editAnnouncement) {
            setAnnouncements(
                announcements.map((ann) =>
                    ann.id === editAnnouncement.id ? { ...ann, ...newAnnouncement } : ann
                )
            );
        } else {
            setAnnouncements([...announcements, { id: Date.now(), ...newAnnouncement }]);
        }
        setNewAnnouncement({ title: '', content: '' });
        setEditAnnouncement(null);
        setShowModal(false);
    };

    const handleEdit = (announcement) => {
        setEditAnnouncement(announcement);
        setNewAnnouncement({ title: announcement.title, content: announcement.content });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setAnnouncements(announcements.filter((ann) => ann.id !== id));
    };

    return (
        <div className="page announcements-page">
            <h2>Thông Báo</h2>
            <div className="card-container">
                {announcements.map((announcement) => (
                    <div key={announcement.id} className="card">
                        <h3>{announcement.title}</h3>
                        <div className="quan"><p>{announcement.content}</p></div>
                        {role === 'manager' && (
                            <div className="card-actions">
                                <button className="edit-button" onClick={() => handleEdit(announcement)}>
                                    Sửa
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(announcement.id)}>
                                    Xóa
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {role === 'manager' && (
                <button className="add-button" onClick={() => setShowModal(true)}>
                    +
                </button>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editAnnouncement ? 'Sửa Thông Báo' : 'Thêm Thông Báo'}</h2>
                        <form onSubmit={handleAddOrEditAnnouncement}>
                            <label>
                                Tiêu đề:
                                <input
                                    type="text"
                                    value={newAnnouncement.title}
                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                    required
                                />
                            </label>
                            <label>
                                Nội dung:
                                <textarea
                                    value={newAnnouncement.content}
                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                                    required
                                />
                            </label>
                            <div className="modal-actions">
                                <button type="submit">{editAnnouncement ? 'Lưu' : 'Thêm'}</button>
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

export default AnnouncementsPage;