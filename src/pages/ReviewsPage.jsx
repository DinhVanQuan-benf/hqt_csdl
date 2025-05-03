import { useState } from 'react';
import ReviewForm from '../components/ReviewForm';
import { mockReviewsData } from '../data/mockData';

function ReviewsPage({ role }) {
    const [reviews, setReviews] = useState(mockReviewsData);
    const [modal, setModal] = useState(null);

    const handleAddReview = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newReview = {
            id: Date.now(),
            rating: Number(formData.get('rating')),
            comment: formData.get('comment'),
            date: new Date().toISOString().split('T')[0]
        };
        setReviews([...reviews, newReview]);
        // TODO: Gửi dữ liệu đến backend
        // Ví dụ API: fetch('/api/reviews', { method: 'POST', body: JSON.stringify(newReview) });
        setModal(null);
    };

    const handleDeleteReview = (id) => {
        setReviews(reviews.filter((review) => review.id !== id));
        // TODO: Xóa dữ liệu trên backend
        // Ví dụ API: fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    };

    return (
        <div className="page reviews-page">
            <h2>Đánh Giá</h2>
            <button
                className="add-button"
                onClick={() => setModal({ type: 'add' })}
            >
                Gửi Đánh Giá
            </button>
            <div className="card-container">
                {reviews.map((review) => (
                    <div key={review.id} className="card">
                        <p><strong>Điểm:</strong> {review.rating}/5</p>
                        <p><strong>Bình luận:</strong> {review.comment}</p>
                        <p><strong>Ngày:</strong> {review.date}</p>
                        {role === 'manager' && (
                            <div className="card-actions">
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteReview(review.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {modal && (
                <ReviewForm
                    onSubmit={handleAddReview}
                    onCancel={() => setModal(null)}
                />
            )}
        </div>
    );
}

export default ReviewsPage;