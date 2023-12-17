import $api from "../http";

export default class ReservationService {
    static async getByUserId(id) {
        return await $api.get(`/users/${id}/reservations`);
    };

    static async cancel(id) {
        return await $api.put(`/reservations/${id}`);
    };

    static async create(reservationData, userId) {
        return await $api.post(`/users/${userId}/reservations`, reservationData);
    }

    static async update(reservationData) {
        return await $api.put(`/reservations`, reservationData);
    }
}