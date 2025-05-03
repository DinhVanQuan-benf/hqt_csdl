import { useState } from 'react';
import '../styles/home.css';

function HomePage({ role }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

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
            <img src="https://cdn3.ivivu.com/2020/04/nhung-toa-nha-co-thiet-ke-khong-tuong-o-trung-quoc-ivivu-6.jpg" />
            <div className="card-container">
                <div className="card">
                    <h3>Tên Tòa Nhà</h3>
                    <p>Tòa Nhà ABC</p>
                </div>
                <div className="card">
                    <h3>Địa Chỉ</h3>
                    <p>123 Đường XYZ, Quận 1, TP.HCM</p>
                </div>
                <div className="card">
                    <h3>Số Phòng</h3>
                    <p>50 phòng</p>
                </div>
                <div className="card">
                    <h3>Liên Hệ</h3>
                    <p>Phone: 0123 456 789</p>
                    <p>Email: contact@abcbuilding.com</p>
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
        </div>
    );
}

export default HomePage;