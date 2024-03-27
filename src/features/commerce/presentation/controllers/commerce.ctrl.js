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
exports.CommerceController = void 0;
const core_1 = require("../../../../core");
class CommerceController {
    constructor(commerceUseCase) {
        this.commerceUseCase = commerceUseCase;
        this.insertCtrl = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const commerce = yield this.commerceUseCase.createCommerce(body);
            res.status(201).send(commerce);
        });
        this.deleteCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idCommerce } = req.params;
            const result = yield this.commerceUseCase.deleteCommerceByUid(idCommerce);
            res.status(200).send(result);
        });
        this.disableCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idCommerce } = req.params;
            const result = yield this.commerceUseCase.disableCommerceByUid(idCommerce);
            res.status(200).send(result);
        });
        this.enableCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idCommerce } = req.params;
            const result = yield this.commerceUseCase.enableCommerceByUid(idCommerce);
            res.status(200).send(result);
        });
        this.findCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idCommerce } = req.params;
            const result = yield this.commerceUseCase.findComerceByUid(idCommerce);
            res.status(200).send(result);
        });
        this.findByCriteriaCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { status, locationType, location } = req.query;
            const statusQ = Object.values(core_1.CriteriaOptionsStatus).includes(status)
                ? core_1.CriteriaOptionsStatus[status]
                : undefined;
            const locationTypeQ = Object.values(core_1.CriteriaOptionsLocation).includes(locationType)
                ? core_1.CriteriaOptionsLocation[locationType]
                : undefined;
            let locationQ = locationTypeQ && typeof location === 'string' && location != ''
                ? {
                    name: location.toUpperCase(),
                    type: locationTypeQ
                }
                : undefined;
            const result = yield this.commerceUseCase.findCommerces(statusQ, locationQ);
            res.status(200).send(result);
        });
    }
}
exports.CommerceController = CommerceController;
