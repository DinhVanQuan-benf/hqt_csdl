import { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';
function AuthModal({ onLoginSuccess, onClose }) {
    const [activeTab, setActiveTab] = useState('login');
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '', remember: false });
    const [registerCredentials, setRegisterCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('token', 'demo-token');
        if (loginCredentials.remember) {
            localStorage.setItem('remember', 'true');
        }
        onLoginSuccess();
        navigate('/');
    };
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        setActiveTab('login');
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Tạo tài khoản
                    </button>
                </div>
                {activeTab === 'login' ? (
                    <form onSubmit={handleLoginSubmit} className="login-form">
                        <label>
                            E-mail:
                            <input
                                type="email"
                                value={loginCredentials.email}
                                onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={loginCredentials.password}
                                onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                                required
                            />
                        </label>
                        <div className="login-options">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    checked={loginCredentials.remember}
                                    onChange={(e) => setLoginCredentials({ ...loginCredentials, remember: e.target.checked })}
                                />
                                Nhớ đăng nhập
                            </label>
                            <a href="/forgot-password" className="forgot-password">Quên mật khẩu?</a>
                        </div>
                        <div className="modal-actions">
                            <button type="submit">Đăng nhập</button>
                            <button type="button" onClick={onClose}>Hủy</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit} className="login-form">
                        <label>
                            E-mail:
                            <input
                                type="email"
                                value={registerCredentials.email}
                                onChange={(e) => setRegisterCredentials({ ...registerCredentials, email: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={registerCredentials.password}
                                onChange={(e) => setRegisterCredentials({ ...registerCredentials, password: e.target.value })}
                                required
                            />
                        </label>
                        <div className="modal-actions">
                            <button type="submit">Tạo tài khoản</button>
                            <button type="button" onClick={onClose}>Hủy</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthModal;