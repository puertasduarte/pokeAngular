import { FilterNamePipe } from './filter-name.pipe';
import { value } from './filter-name-value';

describe('FilterNamePipe', () => {
    let filterNamePipe: FilterNamePipe;
    const array = value;
    /*
    it('create an instance', () => {
        const pipe = new FilterNamePipe();
        expect(pipe).toBeTruthy();
    });
*/
    it('check complete array, for input "ivy"', () => {
        filterNamePipe = new FilterNamePipe();
        expect(filterNamePipe.transform(value, 'ivy')).toEqual([
            array[1],
            array[494],
        ]);
    });
    it('check pipe lenght, for imput "gli"', () => {
        filterNamePipe = new FilterNamePipe();
        expect(filterNamePipe.transform(value, 'gli').length).toBe(3);
    });
    it('check not changes for pipe when no input', () => {
        filterNamePipe = new FilterNamePipe();
        expect(filterNamePipe.transform(value, '')).toEqual(array);
    });
    it('check if returns empty array with a wrong input', () => {
        filterNamePipe = new FilterNamePipe();
        expect(filterNamePipe.transform(value, 'abc')).toEqual([]);
    });
});
