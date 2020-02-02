import { createMock } from 'ts-auto-mock';
import exportAlias = require('../utils/export/exportAlias');

describe('typeQuery exports ', () => {
  describe('for export aliases ', () => {
    it('should assign all the types as an object', () => {
      const type: typeof exportAlias = createMock<typeof exportAlias>();

      expect(new type.types.Class().a).toBe('');
    });
  });
});
