import { jwtDecode } from 'jwt-decode';

// Lấy token từ localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Lưu token vào localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Xóa token khỏi localStorage
export const removeToken = () => {
    localStorage.removeItem('token');
};

// Giải mã token để lấy thông tin
export const decodeToken = () => {
    const token = getToken();
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
        return null;
    }
};

// Lấy role từ token
export const getRole = () => {
    const decoded = decodeToken();
    if (!decoded) return null;
    return decoded.authorities || decoded.roles || decoded.role || null;
};

// Kiểm tra role cụ thể
export const hasRole = (requiredRole) => {
    const role = getRole();
    if (!role) return false;
    if (Array.isArray(role)) {
        return role.includes(requiredRole);
    }
    return role === requiredRole;
};

// Kiểm tra xem user có đăng nhập không
export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp) {
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        }
        return true;
    } catch (error) {
        return false;
    }
};