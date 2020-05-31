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
const class_validator_1 = require("class-validator");
let TagNote = class TagNote {
};
__decorate([
    type_graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], TagNote.prototype, "id", void 0);
TagNote = __decorate([
    type_graphql_1.InputType()
], TagNote);
let CreateNoteInput = class CreateNoteInput {
};
__decorate([
    type_graphql_1.Field({ nullable: false }),
    class_validator_1.MaxLength(10000),
    __metadata("design:type", String)
], CreateNoteInput.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(type => [TagNote], { nullable: false }),
    __metadata("design:type", Array)
], CreateNoteInput.prototype, "tags", void 0);
CreateNoteInput = __decorate([
    type_graphql_1.InputType()
], CreateNoteInput);
exports.CreateNoteInput = CreateNoteInput;
let UpdateNoteInput = class UpdateNoteInput {
};
__decorate([
    type_graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], UpdateNoteInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.MaxLength(10000),
    __metadata("design:type", String)
], UpdateNoteInput.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(type => [TagNote], { nullable: true }),
    __metadata("design:type", Array)
], UpdateNoteInput.prototype, "tags", void 0);
UpdateNoteInput = __decorate([
    type_graphql_1.InputType()
], UpdateNoteInput);
exports.UpdateNoteInput = UpdateNoteInput;
//# sourceMappingURL=note.input.js.map