import { createMock } from 'ts-auto-mock';
import * as Export from '../utils/export/export';

describe('exportSpecifier', () => {
    it('should use the correct interface', () => {
        const mock: Export.DefaultInterface = createMock<Export.DefaultInterface>();
        expect(mock.a()).toBe('');
    });
});
