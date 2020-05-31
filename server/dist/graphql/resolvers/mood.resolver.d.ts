import { Repository } from 'typeorm';
import { Mood } from '../../entities';
import { AppContext } from '../../helpers';
import { RecordMoodInput } from '../inputs/mood.input';
export declare class MoodResolver {
    private readonly moodRepository;
    constructor(moodRepository: Repository<Mood>);
    moods(context: AppContext): Promise<Mood[]>;
    recordMood(input: RecordMoodInput, context: AppContext): Promise<Mood>;
}
