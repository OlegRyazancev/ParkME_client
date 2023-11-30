
import $api from "../http";

export default class ZoneService {
    static async getAll() {
        return await $api.get('/zones')
    }
}