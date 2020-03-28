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
    const stream = fs
        .createReadStream(request.file.path, { encoding: 'utf8' })
        .on('data', (rawNote) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            stream.pause();
            const note = JSON.parse(`'${rawNote}'`);
            let existingNote = yield noteRepository.findOne({
                id: note.id,
            });
            if (!existingNote) {
                const importedNote = noteRepository.create(note);
                yield noteRepository.insert(importedNote);
                existingNote = importedNote;
            }
            if (note.tagId) {
                const tag = yield tagRepository.findOne({ id: note.tagId });
                if (tag) {
                    existingNote.tags.push(tag);
                    yield noteRepository.save(existingNote);
                    return;
                }
            }
            stream.resume();
        }
        catch (error) {
            stream.close();
            response.status(500).send(error);
        }
    }))
        .on('close', () => {
        fs.unlinkSync(request.file.path);
    });
});
//# sourceMappingURL=importRouter.js.map