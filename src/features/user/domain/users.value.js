"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValue = void 0;
const uuid_1 = require("uuid");
class UserValue {
    constructor({ phone, name, email, role, levelUid, commerceId, document, commerceUserId, freeSpace, password, isActive }) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.document = document;
        this.commerceUserId = commerceUserId;
        this.role = role;
        this.levelUid = levelUid;
        this.commerceId = commerceId;
        this.isActive = isActive;
        this.freeSpace = freeSpace;
        this.password = password;
    }
}
exports.UserValue = UserValue;
