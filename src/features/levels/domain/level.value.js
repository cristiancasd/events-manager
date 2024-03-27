"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelValue = void 0;
const uuid_1 = require("uuid");
class LevelValue {
    constructor({ typeId, name, commerceId }) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.typeId = typeId;
        this.commerceId = commerceId;
    }
}
exports.LevelValue = LevelValue;
