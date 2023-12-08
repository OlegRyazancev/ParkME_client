import $api from "../http";

export default class ReservationService {
    static async getByUserId(id) {
        return await $api.get(`/users/${id}/reservations`)
    };

    static async cancel(id) {
        return await $api.put(`/reservations/${id}`)
    };
}