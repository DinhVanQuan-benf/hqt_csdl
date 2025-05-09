import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { isAuthenticated } from '../utils/auth';

function ProtectedRoute({ role, requiredRole, setRole, children }) {
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            setShowAuthModal(true);
        }
    }, []);

    const handleLoginSuccess = (newRole) => {
        setShowAuthModal(false);
        setRole(newRole); // Cập nhật role trong App.jsx
    };

    if (!isAuthenticated()) {
        return (
            <>
                {showAuthModal && (
                    <AuthModal
                        onLoginSuccess={handleLoginSuccess}
                        onClose={() => setShowAuthModal(false)}
                    />
                )}
                <Navigate to="/" replace />
            </>
        );
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;