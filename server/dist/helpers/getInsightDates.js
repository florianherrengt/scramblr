"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const getWeek = (date) => {
    const start = date_fns_1.startOfWeek(date, { weekStartsOn: 1 });
    const end = date_fns_1.endOfWeek(date, { weekStartsOn: 1 });
    const intervals = date_fns_1.eachDayOfInterval({ start, end }).map(date => ({
        label: date_fns_1.format(date, 'E'),
        start: date,
        end: date_fns_1.endOfDay(date),
    }));
    return { start, end, intervals };
};
const getMonth = (date) => {
    const start = date_fns_1.startOfMonth(date);
    const end = date_fns_1.endOfMonth(date);
    const intervals = date_fns_1.eachWeekOfInterval({ start, end }, { weekStartsOn: 1 }).map((date, index) => ({
        label: date_fns_1.format(date, 'dd LLL'),
        start: date,
        end: date_fns_1.endOfWeek(date),
    }));
    return { start, end, intervals };
};
const getYear = (date) => {
    const start = date_fns_1.startOfYear(date);
    const end = date_fns_1.endOfYear(date);
    const intervals = date_fns_1.eachMonthOfInterval({ start, end }).map((date, index) => ({
        label: date_fns_1.format(date, 'LLL'),
        start: date,
        end: date_fns_1.endOfMonth(date),
    }));
    return { start, end, intervals };
};
exports.getInsightDates = (date) => {
    return {
        week: getWeek(date),
        month: getMonth(date),
        year: getYear(date),
    };
};
//# sourceMappingURL=getInsightDates.js.map