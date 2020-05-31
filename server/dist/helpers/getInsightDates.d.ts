export declare const getInsightDates: (date: Date) => {
    week: {
        start: Date;
        end: Date;
        intervals: {
            label: string;
            start: Date;
            end: Date;
        }[];
    };
    month: {
        start: Date;
        end: Date;
        intervals: {
            label: string;
            start: Date;
            end: Date;
        }[];
    };
    year: {
        start: Date;
        end: Date;
        intervals: {
            label: string;
            start: Date;
            end: Date;
        }[];
    };
};
