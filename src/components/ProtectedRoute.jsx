import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

function ProtectedRoute({ role, children }) {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    const handleLoginSuccess = (newRole) => {
        setShowAuthModal(false);
        navigate(window.location.pathname);
    };

    if (!role || role === 'guest') {
        setShowAuthModal(true);
        return (
            <>
                {children}
                {showAuthModal && (
                    <AuthModal
                        onLoginSuccess={handleLoginSuccess}
                        onClose={() => setShowAuthModal(false)}
                    />
                )}
            </>
        );
    }

    return children;
}

export default ProtectedRoute;