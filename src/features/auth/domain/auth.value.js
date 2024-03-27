"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValue = void 0;
class AuthValue {
    constructor({ token, refreshToken, }) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
exports.AuthValue = AuthValue;
