declare class TagNote {
    id: string;
}
export declare class CreateNoteInput {
    text: string;
    tags?: TagNote[];
}
export declare class UpdateNoteInput {
    id: string;
    text: string;
    tags?: TagNote[];
}
export {};
