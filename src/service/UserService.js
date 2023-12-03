import $api from "../http";

export default class UserService {
    static async getById(id) {
        return $api.get('/users/' + id)
    }
}