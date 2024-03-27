"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authUseCase) {
        this.authUseCase = authUseCase;
        this.signInCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const authData = yield this.authUseCase.signIn(email, password);
            res.status(200).send(authData);
        });
        this.refreshTokenCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            const authData = yield this.authUseCase.refreshToken(refreshToken);
            res.status(200).send(authData);
        });
        this.validateTokenCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['authorization'];
            const authData = yield this.authUseCase.validateToken(token !== null && token !== void 0 ? token : '');
            res.status(200).send(authData);
        });
    }
}
exports.AuthController = AuthController;
