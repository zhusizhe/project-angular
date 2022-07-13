import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment';
import { Service } from './service';


@Injectable()
export class ApiService extends Service {
    constructor() {
        super('./api/');
    }


    getEquipment() {
        let url = 'equipments';
        return this.requestJson<Equipment[]>(url, "GET");
    }

    getEquipmentById(id: string) {
        let url = 'equipments/?id=' + id;
        return this.requestJson<Equipment[]>(url, "GET");
    }

    postEquipment(data: any = {}) {
        let url = 'equipments';
        return this.requestJson<Equipment>(url, "POST", data);
    }

    putEquipment(id: string, data: any = {}) {
        let url = 'equipments/' + id;
        return this.requestJson<Equipment>(url, "PUT", data);
    }

    deleteEquipment(id: string) {
        let url = 'equipments/' + id;
        return this.requestJson<Equipment>(url, "DELETE");
    }

}