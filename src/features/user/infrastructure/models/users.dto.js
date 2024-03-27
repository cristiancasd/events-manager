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
exports.UserTypeORMEntity = void 0;
const typeorm_1 = require("typeorm");
const commerce_1 = require("../../../commerce");
//import { CommerceUserRoles } from '../../../../core';
const levels_1 = require("../../../levels");
const constants_1 = require("../../../../core/shared/constants");
let UserTypeORMEntity = class UserTypeORMEntity {
    convertToUppercase() {
        this.email = this.email.toLocaleLowerCase();
        this.name = this.name.toLocaleLowerCase();
    }
};
exports.UserTypeORMEntity = UserTypeORMEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserTypeORMEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], UserTypeORMEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserTypeORMEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], UserTypeORMEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, select: false }),
    __metadata("design:type", String)
], UserTypeORMEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserTypeORMEntity.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], UserTypeORMEntity.prototype, "commerceUserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserTypeORMEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], UserTypeORMEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], UserTypeORMEntity.prototype, "freeSpace", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserTypeORMEntity.prototype, "creationDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserTypeORMEntity.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserTypeORMEntity.prototype, "convertToUppercase", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => commerce_1.CommerceTypeORMEntity, (commerce) => commerce.levels, {
        eager: true, //cargar automaticamente la relación, que en el fron muestre el
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", commerce_1.CommerceTypeORMEntity)
], UserTypeORMEntity.prototype, "commerce", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => levels_1.LevelTypeORMEntity, (level) => level.users, {
        eager: true, //cargar automaticamente la relación, que en el fron muestre el
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", levels_1.LevelTypeORMEntity)
], UserTypeORMEntity.prototype, "level", void 0);
exports.UserTypeORMEntity = UserTypeORMEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserTypeORMEntity);
