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
exports.LevelController = void 0;
class LevelController {
    constructor(levelUseCase) {
        this.levelUseCase = levelUseCase;
        this.insertCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const level = yield this.levelUseCase.createLevel(body);
            res.status(201).send(level);
        });
        this.deleteCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { levelId } = req.params;
            const result = yield this.levelUseCase.deleteLevelByUid(levelId);
            res.status(200).send(result);
        });
        this.findCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { levelId } = req.params;
            const result = yield this.levelUseCase.findLevelByUid(levelId);
            res.status(200).send(result);
        });
        this.findLevelByCommerceCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { commerceId } = req.params;
            const result = yield this.levelUseCase.findLevelsByCommerce(commerceId);
            res.status(200).send(result);
        });
    }
}
exports.LevelController = LevelController;
