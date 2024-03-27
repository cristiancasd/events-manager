"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeORMEntity = void 0;
const typeorm_1 = require("typeorm");
const commerce_1 = require("../../../commerce");
let EventTypeORMEntity = class EventTypeORMEntity {
};
exports.EventTypeORMEntity = EventTypeORMEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    //@PrimaryColumn('string')
    ,
    __metadata("design:type", String)
], EventTypeORMEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], EventTypeORMEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], EventTypeORMEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EventTypeORMEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], EventTypeORMEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], EventTypeORMEntity.prototype, "creationDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], EventTypeORMEntity.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => commerce_1.CommerceTypeORMEntity, (commerce) => commerce.events, {
        eager: true, //cargar automaticamente la relación, que en el fron muestre el
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", commerce_1.CommerceTypeORMEntity)
], EventTypeORMEntity.prototype, "commerce", void 0);
exports.EventTypeORMEntity = EventTypeORMEntity = __decorate([
    (0, typeorm_1.Entity)('event')
], EventTypeORMEntity);
