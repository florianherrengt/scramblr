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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const tag_entitiy_1 = require("./tag.entitiy");
let Note = class Note {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Note.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ length: 10000 }),
    __metadata("design:type", String)
], Note.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Note.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.username, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Note.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(type => [tag_entitiy_1.Tag]),
    typeorm_1.ManyToMany(type => tag_entitiy_1.Tag),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Note.prototype, "tags", void 0);
Note = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Note);
exports.Note = Note;
//# sourceMappingURL=note.entity.js.map