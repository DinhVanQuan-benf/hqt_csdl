import axios from 'axios';

const addNewRoom = () => {
    return axios.post('http://localhost:8080/room/add', {

    })
}
const editRoom = () => {
    return axios.post(`http://localhost:8080/room/edit}`, {

    })
}

const fetchAllRooms = () => {
    return axios.get(`http://localhost:8080/room/all`);
}

const deleteRoom = (idRoom) => {
    return axios.delete(`http://localhost:8080/room/remove/${idRoom}`, { idRoom: idRoom });
}

export { addNewRoom, fetchAllRooms, deleteRoom, editRoom };