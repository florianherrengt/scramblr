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
const note_entity_1 = require("./note.entity");
const type_graphql_2 = require("type-graphql");
var TagEmotion;
(function (TagEmotion) {
    TagEmotion["positive"] = "positive";
    TagEmotion["neutral"] = "neutral";
    TagEmotion["negative"] = "negative";
})(TagEmotion = exports.TagEmotion || (exports.TagEmotion = {}));
type_graphql_2.registerEnumType(TagEmotion, {
    name: 'TagEmotion',
});
let Tag = class Tag {
};
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Tag.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ length: 500 }),
    __metadata("design:type", String)
], Tag.prototype, "label", void 0);
__decorate([
    type_graphql_1.Field(() => TagEmotion, { defaultValue: TagEmotion.neutral }),
    typeorm_1.Column({ default: TagEmotion.neutral }),
    __metadata("design:type", String)
], Tag.prototype, "emotion", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => note_entity_1.Note),
    __metadata("design:type", Array)
], Tag.prototype, "notes", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Tag.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (user) => user.username, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Tag.prototype, "user", void 0);
Tag = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entitiy.js.map