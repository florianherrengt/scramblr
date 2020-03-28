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
const entities_1 = require("./entities");
const typeorm_1 = require("typeorm");
exports.exportRouter = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('exportRouter', request.originalUrl);
    if (!['tags', 'notes'].includes(request.param('entity'))) {
        return response.status(400).send('Invalid entitty');
    }
    const username = (_a = request.session) === null || _a === void 0 ? void 0 : _a.username;
    if (!username) {
        return response.sendStatus(401);
    }
    try {
        response.setHeader('Content-Disposition', 'attachment');
        response.setHeader('Content-Type', 'text/plain');
        if (request.param('entity') === 'tags') {
            (yield typeorm_1.getRepository(entities_1.Tag)
                .createQueryBuilder('Tag')
                .where('Tag.user = :username', {
                username,
            })
                .stream())
                .on('data', (data) => {
                const { Tag_id: id, Tag_createdAt: createdAt, Tag_emotion: emotion, Tag_label: label, } = data;
                response.write(JSON.stringify({ id, label, emotion, createdAt }) +
                    '\n');
            })
                .on('close', () => {
                response.end();
            });
        }
        if (request.param('entity') === 'notes') {
            (yield typeorm_1.getRepository(entities_1.Note)
                .createQueryBuilder('Note')
                .leftJoinAndSelect('Note.tags', 'tag')
                .where('Note.user = :username', {
                username,
            })
                .stream())
                .on('data', (data) => {
                const { Note_id: id, Note_text: text, Note_createdAt: createdAt, tag_id: tagId, } = data;
                const exportedNote = {
                    id,
                    text,
                    createdAt,
                    tagId,
                };
                response.write(JSON.stringify(exportedNote) + '\n');
            })
                .on('close', () => response.end());
        }
    }
    catch (err) {
        response.status(500).send(err);
    }
});
//# sourceMappingURL=exportRouter.js.map