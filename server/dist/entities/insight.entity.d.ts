import { TagEmotion } from './tag.entitiy';
declare class InsightData {
    label: string;
    [TagEmotion.positive]: number;
    [TagEmotion.negative]: number;
}
export declare class Insight {
    week: InsightData[];
    month: InsightData[];
    year: InsightData[];
}
export {};
