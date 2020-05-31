import { Insight } from '../../entities';
import { AppContext } from 'src/helpers';
import { Repository } from 'typeorm';
import { Tag } from '../../entities';
import { Note } from '../../entities/note.entity';
export declare class InsightResolver {
    private readonly noteRepository;
    private readonly tagRepository;
    constructor(noteRepository: Repository<Note>, tagRepository: Repository<Tag>);
    insights(context: AppContext): Promise<Insight>;
}
