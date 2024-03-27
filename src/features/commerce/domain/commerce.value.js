"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommerceValue = void 0;
const uuid_1 = require("uuid");
class CommerceValue {
    constructor({ name, phone, email, countryCode, city, totalFreePrevent, isActive, dateFinish }) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.countryCode = countryCode;
        this.city = city;
        this.totalFreePrevent = totalFreePrevent;
        this.isActive = isActive;
        this.dateFinish = dateFinish;
    }
}
exports.CommerceValue = CommerceValue;
