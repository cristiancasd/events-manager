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
exports.CommerceTypeORMEntity = void 0;
const typeorm_1 = require("typeorm");
const event_dto_1 = require("../../../events/infrastructure/models/event.dto");
const levels_1 = require("../../../levels");
let CommerceTypeORMEntity = class CommerceTypeORMEntity extends typeorm_1.BaseEntity {
    convertToUppercase() {
        this.city = this.city.toUpperCase();
        this.countryCode = this.countryCode.toUpperCase();
    }
};
exports.CommerceTypeORMEntity = CommerceTypeORMEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    //@PrimaryColumn('string')
    ,
    __metadata("design:type", String)
], CommerceTypeORMEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], CommerceTypeORMEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', unique: true }),
    __metadata("design:type", Number)
], CommerceTypeORMEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], CommerceTypeORMEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 8, default: 'CO' }),
    __metadata("design:type", String)
], CommerceTypeORMEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], CommerceTypeORMEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], CommerceTypeORMEntity.prototype, "totalFreePrevent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], CommerceTypeORMEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], CommerceTypeORMEntity.prototype, "dateFinish", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CommerceTypeORMEntity.prototype, "creationDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CommerceTypeORMEntity.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_dto_1.EventTypeORMEntity, (event) => event.commerce),
    __metadata("design:type", Array)
], CommerceTypeORMEntity.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => levels_1.LevelTypeORMEntity, (level) => level.commerce),
    __metadata("design:type", Array)
], CommerceTypeORMEntity.prototype, "levels", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommerceTypeORMEntity.prototype, "convertToUppercase", null);
exports.CommerceTypeORMEntity = CommerceTypeORMEntity = __decorate([
    (0, typeorm_1.Entity)('commerce')
], CommerceTypeORMEntity);
