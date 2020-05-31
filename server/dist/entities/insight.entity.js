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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const tag_entitiy_1 = require("./tag.entitiy");
let InsightData = class InsightData {
};
_a = tag_entitiy_1.TagEmotion.positive, _b = tag_entitiy_1.TagEmotion.negative;
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InsightData.prototype, "label", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], InsightData.prototype, _a, void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], InsightData.prototype, _b, void 0);
InsightData = __decorate([
    type_graphql_1.ObjectType()
], InsightData);
let Insight = class Insight {
};
__decorate([
    type_graphql_1.Field(() => [InsightData]),
    __metadata("design:type", Array)
], Insight.prototype, "week", void 0);
__decorate([
    type_graphql_1.Field(() => [InsightData]),
    __metadata("design:type", Array)
], Insight.prototype, "month", void 0);
__decorate([
    type_graphql_1.Field(() => [InsightData]),
    __metadata("design:type", Array)
], Insight.prototype, "year", void 0);
Insight = __decorate([
    type_graphql_1.ObjectType()
], Insight);
exports.Insight = Insight;
//# sourceMappingURL=insight.entity.js.map