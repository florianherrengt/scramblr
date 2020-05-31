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
let SignUpInput = class SignUpInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SignUpInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], SignUpInput.prototype, "password", void 0);
SignUpInput = __decorate([
    type_graphql_1.InputType()
], SignUpInput);
exports.SignUpInput = SignUpInput;
let SignInInput = class SignInInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SignInInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], SignInInput.prototype, "password", void 0);
SignInInput = __decorate([
    type_graphql_1.InputType()
], SignInInput);
exports.SignInInput = SignInInput;
let UpdateEmailInput = class UpdateEmailInput {
};
__decorate([
    type_graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], UpdateEmailInput.prototype, "email", void 0);
UpdateEmailInput = __decorate([
    type_graphql_1.InputType()
], UpdateEmailInput);
exports.UpdateEmailInput = UpdateEmailInput;
//# sourceMappingURL=user.input.js.map