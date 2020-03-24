import { getTitleFromPath, titles } from './Title';

describe('MainLayout/Title', () => {
    it('getTitleFromPath', () => {
        expect(getTitleFromPath('/settings')).toEqual(titles.settings);
        expect(getTitleFromPath(Math.random().toString())).toEqual('');
    });
});
