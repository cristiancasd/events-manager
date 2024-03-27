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
exports.UserController = void 0;
class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
        this.insertCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const user = yield this.userUseCase.createUser(body);
            res.status(201).send(user);
        });
        this.findCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const result = yield this.userUseCase.findUserByUid(userId);
            res.status(200).send(result);
        });
        this.findUserByLevelCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { commerceId, levelUid } = req.params;
            const result = yield this.userUseCase.findUsersByLevelUid(commerceId, levelUid);
            res.status(200).send(result);
        });
        this.deleteCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const result = yield this.userUseCase.deleteUserByUid(userId);
            res.status(200).send(result);
        });
    }
}
exports.UserController = UserController;
