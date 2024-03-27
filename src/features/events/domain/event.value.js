"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValue = void 0;
const uuid_1 = require("uuid");
class EventValue {
    constructor({ name, description, date, url, commerceId }) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.description = description;
        this.date = date;
        this.url = url;
        this.commerceId = commerceId;
    }
}
exports.EventValue = EventValue;
