import { Navigate } from 'react-router-dom';

function ProtectedRoute({ role, requiredRole, children }) {
    // Nếu requiredRole là mảng → kiểm tra vai trò có trong danh sách không
    if (Array.isArray(requiredRole)) {
        if (!requiredRole.includes(role)) {
            return <Navigate to="/" replace />;
        }
    } else {
        // Nếu chỉ là một role đơn → kiểm tra bằng ===
        if (role !== requiredRole) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
}

export default ProtectedRoute;
