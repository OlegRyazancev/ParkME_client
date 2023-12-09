import $api from "../http";

export default class UserService {
    static async getById(id) {
        return $api.get('/users/' + id)
    };

    static async update(id, name, email, password) {
        return $api.put('/users', {id, name, email, password});
    };
}