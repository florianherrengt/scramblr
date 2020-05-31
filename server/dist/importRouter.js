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
const fs = require("fs");
const entities_1 = require("./entities");
const typeorm_1 = require("typeorm");
const readline = require("readline");
const helpers_1 = require("./helpers");
const logger = helpers_1.getLogger('importRouter');
const getEmotion = (emotion) => {
    switch (emotion) {
        case entities_1.TagEmotion.positive:
            return entities_1.TagEmotion.positive;
        case entities_1.TagEmotion.negative:
            return entities_1.TagEmotion.negative;
        default:
            return entities_1.TagEmotion.neutral;
    }
};
exports.importRouter = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!['tags', 'notes'].includes(request.param('entity'))) {
        return response.status(400).send('Invalid entitty');
    }
    const username = (_a = request.session) === null || _a === void 0 ? void 0 : _a.username;
    if (!username) {
        return response.sendStatus(401);
    }
    if (!request.file) {
        return response.status(400).send('No file received');
    }
    if (!fs.existsSync(request.file.path)) {
        response.status(500).send('File does not exist.');
    }
    const noteRepository = typeorm_1.getRepository(entities_1.Note);
    const tagRepository = typeorm_1.getRepository(entities_1.Tag);
    const lineReader = readline.createInterface({
        input: require('fs').createReadStream(request.file.path),
    });
    let error = null;
    if (request.param('entity') === 'notes') {
        lineReader
            .on('line', (rawNote) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                lineReader.pause();
                const note = JSON.parse(rawNote);
                let existingNote = yield noteRepository.findOne({
                    id: note.id,
                    user: { username },
                }, { relations: ['tags'] });
                if (!existingNote) {
                    const importedNote = noteRepository.create(Object.assign(Object.assign({}, note), { user: { username } }));
                    yield noteRepository.insert(importedNote);
                    importedNote.tags = [];
                    existingNote = importedNote;
                }
                if (note.tagId &&
                    !existingNote.tags
                        .map((tag) => tag.id)
                        .includes(note.tagId)) {
                    const tag = yield tagRepository.findOne({
                        id: note.tagId,
                    });
                    if (tag) {
                        existingNote.tags.push(tag);
                        yield noteRepository.save(existingNote);
                    }
                }
                lineReader.resume();
            }
            catch (e) {
                error = e;
                logger.error(e);
                lineReader.close();
            }
        }))
            .on('close', () => {
            fs.unlinkSync(request.file.path);
            if (error) {
                response.status(500).send(error);
            }
            else {
                response.status(200).redirect('/notes');
            }
        });
    }
    if (request.param('entity') === 'tags') {
        lineReader
            .on('line', (rawTag) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const tag = JSON.parse(rawTag);
                if (!(yield tagRepository.findOne({ id: tag.id }))) {
                    yield tagRepository.save(tagRepository.create(Object.assign(Object.assign({}, tag), { emotion: getEmotion(tag.emotion), user: { username } })));
                }
            }
            catch (e) {
                error = e;
                logger.error(e);
                lineReader.close();
            }
        }))
            .on('close', () => {
            fs.unlinkSync(request.file.path);
            if (error) {
                response.status(500).send(error);
            }
            else {
                response.status(200).redirect('/tags');
            }
        });
    }
});
//# sourceMappingURL=importRouter.js.map