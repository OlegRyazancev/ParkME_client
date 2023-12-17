import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";

export default class Store {


    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(logUsername, logPassword) {
        try {
            const response = await AuthService.login(logUsername, logPassword);
            const {id, username} = response.data;

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            const decodedToken = jwtDecode(response.data.accessToken);
            this.setAuth(true);
            this.setUser({
                id: id,
                username: username,
                roles: decodedToken.roles
            })
        } catch (e) {
            throw e
        }
    }

    async registration(regName, regEmail, regPassword, regPasswordConfirmation) {
        try {
            const response = await AuthService.registration(regName, regEmail, regPassword, regPasswordConfirmation);
            const {id, name, email} = response.data;

            this.setUser({
                id: id,
                name: name,
                email: email
            })
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.setAuth(false);
        this.setUser({});
    }

    async checkAuth() {
        try {
            console.log("check auth")
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await axios.post(`${API_URL}/auth/refresh`, refreshToken)
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            this.setAuth(true);
            const decodedToken = jwtDecode(response.data.accessToken);
            const {id, username} = response.data;
            this.setUser({
                id: id,
                username: username,
                roles: decodedToken.roles
            })
        } catch (e) {
            console.log(e)
        }
    }
}