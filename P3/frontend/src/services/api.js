import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3030/reservations'
  });

export const createReservation = (reservationData) => {
    return api.post('/', reservationData);
};

export const getReservations = () => {
    return api.get('/');
};

export const updateReservation = (id, reservationData) => {
    return api.put(`/${id}`, reservationData);
};

export const deleteReservation = (id) => {
    return api.delete(`/${id}`);
};

export default api;