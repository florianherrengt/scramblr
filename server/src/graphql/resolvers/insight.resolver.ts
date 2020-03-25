import { AuthenticationError } from 'apollo-server-express';
import { isEmpty } from 'lodash';
import { Insight, TagEmotion } from '../../entities';
import { AppContext } from 'src/helpers';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Tag } from '../../entities';
import { Note } from '../../entities/note.entity';
import { getInsightDates } from '../../helpers/getInsightDates';
import * as dateFns from 'date-fns'

@Resolver(Insight)
export class InsightResolver {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    ) { }

    @Query(returns => Insight)
    async insights(@Ctx() context: AppContext): Promise<Insight> {
        const { user } = context;
        if (!user) {
            throw new AuthenticationError('User not logged in');
        }

        const getCount = (options: {
            emotion: TagEmotion;
            start: Date;
            end: Date;
        }) => {
            const { emotion, start, end } = options;
            return this.noteRepository
                .createQueryBuilder('Note')
                .leftJoinAndSelect('Note.tags', 'tag')
                .where('Note.user = :username', {
                    username: user.username,
                })
                .andWhere('tag.emotion = :emotion', { emotion })
                .andWhere('Note.createdAt BETWEEN :start AND :end', {
                    start: dateFns.format(start, 'yyyy-MM-dd 00:00:00'),
                    end: dateFns.format(end, 'yyyy-MM-dd 23:59:59'),
                })
                .getCount();
        };

        const insightsDates = getInsightDates(new Date());

        const [week, month, year] = await Promise.all(
            [insightsDates.week, insightsDates.month, insightsDates.year].map(
                async ({ intervals }) =>
                    await Promise.all(
                        intervals.map(async ({ label, start, end }) => {
                            const [positive, negative] = await Promise.all([
                                getCount({
                                    emotion: TagEmotion.positive,
                                    start,
                                    end,
                                }),
                                getCount({
                                    emotion: TagEmotion.negative,
                                    start,
                                    end,
                                }),
                            ]);
                            return {
                                label,
                                positive,
                                negative,
                            };
                        }),
                    ),
            ),
        );
        return { week, month, year };
    }
}
