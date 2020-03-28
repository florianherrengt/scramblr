import * as fs from 'fs';

import { Note, Tag, ExportedNote, ExportedTag, TagEmotion } from './entities';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as readline from 'readline';

const getEmotion = (emotion: string): TagEmotion => {
    switch (emotion) {
        case TagEmotion.positive:
            return TagEmotion.positive;
        case TagEmotion.negative:
            return TagEmotion.negative;
        default:
            return TagEmotion.neutral;
    }
};

export const importRouter = async (request: Request, response: Response) => {
    if (!['tags', 'notes'].includes(request.param('entity'))) {
        return response.status(400).send('Invalid entitty');
    }
    const username = request.session?.username;
    if (!username) {
        return response.sendStatus(401);
    }
    if (!request.file) {
        return response.status(400).send('No file received');
    }
    if (!fs.existsSync(request.file.path)) {
        response.status(500).send('File does not exist.');
    }
    const noteRepository = getRepository(Note);
    const tagRepository = getRepository(Tag);

    const lineReader = readline.createInterface({
        input: require('fs').createReadStream(request.file.path),
    });

    let error = null;

    if (request.param('entity') === 'notes') {
        lineReader
            .on('line', async (rawNote) => {
                try {
                    lineReader.pause();
                    const note: ExportedNote = JSON.parse(rawNote);
                    let existingNote = await noteRepository.findOne(
                        {
                            id: note.id,
                            user: { username },
                        },
                        { relations: ['tags'] },
                    );
                    if (!existingNote) {
                        const importedNote = noteRepository.create({
                            ...note,
                            user: { username },
                        });
                        await noteRepository.insert(importedNote);
                        importedNote.tags = [];
                        existingNote = importedNote;
                    }
                    if (
                        note.tagId &&
                        !existingNote.tags
                            .map((tag) => tag.id)
                            .includes(note.tagId)
                    ) {
                        const tag = await tagRepository.findOne({
                            id: note.tagId,
                        });
                        if (tag) {
                            existingNote.tags.push(tag);
                            await noteRepository.save(existingNote);
                        }
                    }
                    lineReader.resume();
                } catch (e) {
                    error = e;
                    console.error(e);
                    lineReader.close();
                }
            })
            .on('close', () => {
                fs.unlinkSync(request.file.path);
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(200).redirect('/notes');
                }
            });
    }
    if (request.param('entity') === 'tags') {
        lineReader
            .on('line', async (rawTag) => {
                try {
                    const tag: ExportedTag = JSON.parse(rawTag);
                    if (!(await tagRepository.findOne({ id: tag.id }))) {
                        await tagRepository.save(
                            tagRepository.create({
                                ...tag,
                                emotion: getEmotion(tag.emotion),
                                user: { username },
                            }),
                        );
                    }
                } catch (e) {
                    error = e;
                    console.error(e);
                    lineReader.close();
                }
            })
            .on('close', () => {
                fs.unlinkSync(request.file.path);
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(200).redirect('/tags');
                }
            });
    }
};
