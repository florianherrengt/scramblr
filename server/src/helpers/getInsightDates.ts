import {
    parse,
    format,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
    eachWeekOfInterval,
    startOfYear,
    endOfYear,
    eachMonthOfInterval,
    endOfDay,
} from 'date-fns';

const getWeek = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    const intervals = eachDayOfInterval({ start, end }).map(date => ({
        label: format(date, 'E'),
        start: date,
        end: endOfDay(date),
    }));
    return { start, end, intervals };
};

const getMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const intervals = eachWeekOfInterval(
        { start, end },
        { weekStartsOn: 1 },
    ).map((date, index) => ({
        label: format(date, 'dd LLL'),
        start: date,
        end: endOfWeek(date),
    }));
    return { start, end, intervals };
};

const getYear = (date: Date) => {
    const start = startOfYear(date);
    const end = endOfYear(date);
    const intervals = eachMonthOfInterval({ start, end }).map(
        (date, index) => ({
            label: format(date, 'LLL'),
            start: date,
            end: endOfMonth(date),
        }),
    );
    return { start, end, intervals };
};

export const getInsightDates = (date: Date) => {
    return {
        week: getWeek(date),
        month: getMonth(date),
        year: getYear(date),
    };
};
