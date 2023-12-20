import $api from "../http";

export default class UserService {
    static async getById(id) {
        return $api.get('/users/' + id)
    };

    static async update(userData) {
        return $api.put('/users', userData);
    };

    static async delete(id) {
        return $api.delete(`/users/${id}`);
    }
}