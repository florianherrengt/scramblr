"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getInsightDates_1 = require("./getInsightDates");
const lodash_1 = require("lodash");
describe('Helpers/getInsightDates', () => {
    it('getInsightDates(today)', () => {
        const results = getInsightDates_1.getInsightDates(new Date(1585139550627));
        expect(results.week.start.toUTCString()).toContain('Mon, 23 Mar 2020');
        expect(results.week.end.toUTCString()).toContain('Sun, 29 Mar 2020');
        expect(results.week.intervals[0].label).toEqual('Mon');
        expect(lodash_1.last(results.week.intervals).label).toEqual('Sun');
        expect(results.month.start.toUTCString()).toContain('Sun, 01 Mar 2020');
        expect(results.month.end.toUTCString()).toContain('Tue, 31 Mar 2020');
        expect(results.month.intervals[0].label).toEqual('24 Feb');
        expect(lodash_1.last(results.month.intervals).label).toEqual('30 Mar');
        expect(results.year.start.toUTCString()).toContain('01 Jan 2020');
        expect(results.year.end.toUTCString()).toContain('31 Dec 2020');
        expect(results.year.intervals[0].label).toEqual('Jan');
        expect(lodash_1.last(results.year.intervals).label).toEqual('Dec');
    });
});
//# sourceMappingURL=getInsightDates.test.js.map