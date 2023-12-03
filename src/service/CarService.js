import $api from "../http";

export default class CarService {
    static async getByUserId(id) {
        return await $api.get('/users/' + id + '/cars')
    }
}
