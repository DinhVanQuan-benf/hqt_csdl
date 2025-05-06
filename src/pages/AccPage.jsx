// import AccountForm from '../components/AccountForm';
import '../styles/accounts.css';

function AccPage() {
    const handleSubmit = async (formData) => {
        console.log('Form submitted:', formData);
        // Gọi API để cập nhật dữ liệu
    };

    const userData = {
        name: 'Nguyen Van A',
        email: 'a@example.com',
        phone: '0123456789',
    };

    return (
        <div className="main-content">
            <div className="page">
                <div className="account-header">
                    <h1>Quản Lý Tài Khoản</h1>
                </div>
                <div className="account-avatar-container">
                    <div className="account-avatar">
                        Ảnh đại diện
                    </div>
                </div>
                <AccountForm data={userData} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default AccPage;