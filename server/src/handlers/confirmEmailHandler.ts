import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { ConfirmEmailToken } from '../helpers';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities';

export const confirmEmailHandler = async (
    request: Request,
    response: Response,
) => {
    try {
        const { email } = jwt.verify(
            request.param('token'),
            config.get('Jwt.secret'),
        ) as ConfirmEmailToken;
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            username: request.session?.username,
            email,
        });
        if (!user) {
            return response.redirect('/sign-in');
        }
        user.emailConfirmed = true;
        await userRepository.save(user);
        response.redirect('/settings');
    } catch (error) {
        response.status(500).send(error);
    }
};
