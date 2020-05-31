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
var MoodRating;
(function (MoodRating) {
    MoodRating[MoodRating["sad"] = 0] = "sad";
    MoodRating[MoodRating["meh"] = 1] = "meh";
    MoodRating[MoodRating["good"] = 2] = "good";
    MoodRating[MoodRating["special"] = 3] = "special";
})(MoodRating = exports.MoodRating || (exports.MoodRating = {}));
type_graphql_1.registerEnumType(MoodRating, {
    name: 'MoodRating',
});
let Mood = class Mood {
};
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Mood.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => MoodRating),
    typeorm_1.Column({ type: 'int2' }),
    __metadata("design:type", Number)
], Mood.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Mood.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (user) => user.username, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Mood.prototype, "user", void 0);
Mood = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Mood);
exports.Mood = Mood;
//# sourceMappingURL=mood.entity.js.map