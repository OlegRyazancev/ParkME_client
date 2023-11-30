import $api from "../http";


export default class AuthService {
    static async login(username, password) {
        return $api.post('/auth/login', { username, password });
    }

    static async registration(name, email, password, passwordConfirmation) {
        return $api.post('/auth/register', { name, email, password, passwordConfirmation });
    }
}