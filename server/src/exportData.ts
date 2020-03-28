import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { Note, Tag } from './entities';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

interface RawNote {
    Note_id: string;
    Note_text: string;
    Note_createdAt: string;
    Note_userUsername: string;
    tag_id: string;
    tag_label: string;
    tag_emotion: string;
    tag_createdAt: string;
    tag_userUsername: string;
}

interface RawTag {
    Tag_id: string;
    Tag_label: string;
    Tag_emotion: string;
    Tag_createdAt: string;
    Tag_userUsername: string;
}

export const exportRouter = async (request: Request, response: Response) => {
    if (!['tags', 'notes'].includes(request.param('entity'))) {
        return response.status(400).send('Invalid entitty');
    }
    const username = request.session?.username;
    if (!username) {
        return response.sendStatus(401);
    }
    try {
        response.setHeader('Content-Disposition', 'attachment');
        response.setHeader('Content-Type', 'text/plain');

        if (request.param('entity') === 'tags') {
            (
                await getRepository(Tag)
                    .createQueryBuilder('Tag')
                    .where('Tag.user = :username', {
                        username,
                    })
                    .stream()
            )
                .on('data', (data: RawTag) => {
                    const {
                        Tag_id: id,
                        Tag_createdAt: createdAt,
                        Tag_emotion: emotion,
                        Tag_label: label,
                    } = data;
                    response.write(
                        JSON.stringify({ id, label, emotion, createdAt }) +
                            '\n',
                    );
                })
                .on('close', () => {
                    response.end();
                });
        }
        if (request.param('entity') === 'notes') {
            (
                await getRepository(Note)
                    .createQueryBuilder('Note')
                    .leftJoinAndSelect('Note.tags', 'tag')
                    .where('Note.user = :username', {
                        username,
                    })
                    .stream()
            )
                .on('data', (data: RawNote) => {
                    const {
                        Note_id: id,
                        Note_text: text,
                        Note_createdAt: createdAt,
                        tag_id: tagId,
                    } = data;
                    response.write(
                        JSON.stringify({ id, text, createdAt, tagId }) + '\n',
                    );
                })
                .on('close', () => response.end());
        }
    } catch (err) {
        response.status(500).send(err);
    }
};
