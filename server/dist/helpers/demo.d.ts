import { Connection, Repository } from 'typeorm';
import { Note, Tag, User } from '../entities';
export declare const encrypt: (str?: string | undefined) => string;
export declare class PopulateDemo {
    private readonly connection;
    private readonly noteRepository;
    private readonly userRepository;
    private readonly tagRepository;
    constructor(connection: Connection, noteRepository: Repository<Note>, userRepository: Repository<User>, tagRepository: Repository<Tag>);
    populate(): Promise<void>;
}
