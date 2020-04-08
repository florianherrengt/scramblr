import { AuthenticationError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Mood } from '../../entities';
import { AppContext } from '../../helpers';
import { RecordMoodInput } from '../inputs/mood.input';

@Resolver(Mood)
export class MoodResolver {
    constructor(
        @InjectRepository(Mood)
        private readonly moodRepository: Repository<Mood>,
    ) {}
    @Query((returns) => [Mood])
    async moods(@Ctx() context: AppContext): Promise<Mood[]> {
        const { username } = context.user || {};
        if (!username) {
            throw new AuthenticationError('User not logged in');
        }
        const moods = await this.moodRepository.find({
            user: { username },
        });
        return moods;
    }
    @Mutation((returns) => Mood)
    async recordMood(
        @Arg('input') input: RecordMoodInput,
        @Ctx() context: AppContext,
    ): Promise<Mood> {
        const { username } = context.user || {};
        if (!username) {
            throw new AuthenticationError('User not logged in');
        }
        if (![0, 1, 2, 3].includes(input.rating)) {
            throw new Error('Invalid mood rating');
        }
        const mood = this.moodRepository.create(input);
        await this.moodRepository.save(mood);
        return mood;
    }
}
