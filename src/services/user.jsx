import axios from 'axios';

const registerNewUser = (email, username, password) => {
    return axios.post('http://localhost:8381/api/v1/Register', {
        email, username, password
    })
}

const loginUser = (email, password) => {
    return axios.post('http://localhost:8381/api/v1/Login', {
        email, password
    })
}

const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:8381/api/v1/user/read?page=${page}&limit=${limit}`);
}

const deleteUser = (user) => {
    return axios.delete("http://localhost:8381/api/v1/user/delete", { data: { id: user.id } });
}

export { registerNewUser, loginUser, fetchAllUsers, deleteUser };