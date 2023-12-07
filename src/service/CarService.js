import $api from "../http";

export default class CarService {
    static async getByUserId(id) {
        return await $api.get('/users/' + id + '/cars')
    }

    static async deleteCarById(id) {
        return await $api.delete('/cars/' + id)
    }

    static async create(userId, carData) {
        return await $api.post(`/users/${userId}/cars`, carData)
    }
}
