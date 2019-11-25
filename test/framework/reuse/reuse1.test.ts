import { createMock } from 'ts-auto-mock';
import '../config';
import { Interface } from '../interface';

describe('reuse', () => {
    it('should use the correct mock', () => {
        const mock: Interface = createMock<Interface>();
        mock.a();
        expect(mock.a).toHaveBeenCalled();
    });
});
