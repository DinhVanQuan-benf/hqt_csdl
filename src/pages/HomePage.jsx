import { useState, useEffect } from 'react';
import '../styles/home.css';
import axios1 from '../utils/axiosConfig';
import axios from 'axios';

function HomePage({ role }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [building, setBuilding] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        address: '',
        floorCount: 0,
        totalRooms: 0,
        status: ''
    });

    useEffect(() => {
        fetchBuilding();
    }, []);

    const fetchBuilding = async () => {
        try {
            const res = await axios.get('api/building/1');
            setBuilding(res.data);
            setEditForm(res.data);
        } catch (err) {
            console.error('Lỗi khi tải thông tin tòa nhà:', err);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async () => {
        if (role !== 'admin') {
            alert('Chỉ quản lý được sửa thông tin tòa nhà!');
            return;
        }
        try {
            await axios1.put(`/building/update/1`, editForm);
            alert('Cập nhật tòa nhà thành công');
            setShowEditModal(false);
            fetchBuilding();
        } catch (err) {
            alert('Lỗi khi cập nhật tòa nhà');
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            setComments([...comments, { id: Date.now(), text: comment, rating }]);
            setComment('');
            setRating(0);
        }
    };

    return (
        <div className="page home-page">
            <h2>Thông Tin Tòa Nhà</h2>
            <img src="https://cdn3.ivivu.com/2020/04/nhung-toa-nha-co-thiet-ke-khong-tuong-o-trung-quoc-ivivu-6.jpg" alt="building" />

            {role === 'admin' && (
                <button onClick={() => setShowEditModal(true)}>Sửa thông tin tòa nhà</button>
            )}

            <div className="card-container">
                <div className="card-container">
                    <div className="card">
                        <h3>Tên</h3>
                        <p>{building.name}</p>
                    </div>
                    <div className="card">
                        <h3>Địa chỉ</h3>
                        <p>{building.address}</p>
                    </div>
                    <div className="card">
                        <h3>Số tầng</h3>
                        <p>{building.floorCount}</p>
                    </div>
                    <div className="card">
                        <h3>Tổng số phòng</h3>
                        <p>{building.totalRooms}</p>
                    </div>
                </div>

            </div>

            <h2>Đánh Giá và Bình Luận</h2>
            {role !== 'guest' ? (
                <div className="rating-section">
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= rating ? 'filled' : ''}`}
                                onClick={() => handleRatingChange(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Viết bình luận của bạn..."
                            required
                        />
                        <button type="submit">Gửi</button>
                    </form>
                </div>
            ) : (
                <p>Vui lòng đăng nhập để đánh giá và bình luận.</p>
            )}

            <div className="comments-section">
                {comments.length > 0 ? (
                    comments.map((c) => (
                        <div key={c.id} className="comment">
                            <div className="comment-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= c.rating ? 'filled' : ''}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p>{c.text}</p>
                        </div>
                    ))
                ) : (
                    <p>Chưa có bình luận nào.</p>
                )}
            </div>

            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Sửa thông tin tòa nhà</h3>
                        <label>Tên</label>
                        <input name="name" value={editForm.name} onChange={handleEditChange} />

                        <label>Địa chỉ</label>
                        <input name="address" value={editForm.address} onChange={handleEditChange} />

                        <label>Số tầng</label>
                        <input name="floorCount" type="number" value={editForm.floorCount} onChange={handleEditChange} />

                        <label>Tổng số phòng</label>
                        <input name="totalRooms" type="number" value={editForm.totalRooms} onChange={handleEditChange} />

                        <label>Trạng thái</label>
                        <input name="status" value={editForm.status} onChange={handleEditChange} />

                        <div className="modal-actions">
                            <button className="cancel" onClick={() => setShowEditModal(false)}>Hủy</button>
                            <button className="save" onClick={handleEditSubmit}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;