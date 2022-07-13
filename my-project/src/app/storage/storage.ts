import { Equipment } from "../models/equipment";

export abstract class EquipmentStorage {
    static get addEquipment(): Equipment {
      return JSON.parse(sessionStorage.getItem('addEquipment')||'{}');
    }
    static set addEquipment(value) {
      sessionStorage.setItem('addEquipment', JSON.stringify(value));
    }
}