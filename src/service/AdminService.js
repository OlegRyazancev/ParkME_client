import $api from "../http";
import {pl, tr} from "date-fns/locale";

export default class AdminService {

    static async getAllCars() {
        return await $api.get('/admin/cars');
    }

    static async getAllUsers() {
        return await $api.get('/admin/users');
    }

    static async getAllReservations() {
        return await $api.get('/admin/reservations');
    }

    static async createZone(zoneData) {
        return await $api.post('/admin/zones', zoneData);
    }

    static async updateZone(zoneData) {
        return await $api.put('/admin/zones', zoneData);
    }

    static async createPlacesInZone(zoneId, countPlaces) {
        return await $api.post(`/admin/zones/${zoneId}/places?places=${countPlaces}`);
    }

    static async changePlaceStatusById(placeId, status) {
        return await $api.put(`/admin/places/${placeId}/status?status=${status}`);
    }

    static async deleteZoneWithPlaces(zoneId) {
        return await $api.delete(`/admin/zones/${zoneId}`);
    }

    static async deletePlace(placeId) {
        return await $api.delete(`/admin/places/${placeId}`);
    }

}