import $api from "../http";

export default class ZoneService {
    static async getAll() {
        return await $api.get('/zones')
    }

    static async getById(id) {
        return await $api.get('/zones/' + id)
    }
}