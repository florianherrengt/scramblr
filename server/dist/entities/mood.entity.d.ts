import { User } from './user.entity';
export declare enum MoodRating {
    sad = 0,
    meh = 1,
    good = 2,
    special = 3
}
export declare class Mood {
    id: string;
    rating: MoodRating;
    createdAt: Date;
    user: User;
}
