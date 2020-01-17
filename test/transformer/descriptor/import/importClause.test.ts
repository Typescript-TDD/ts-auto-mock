import { createMock } from 'ts-auto-mock';
import Export from '../utils/export/exportWithThis';

describe('importClause', () => {
  it('should keep the this reference', () => {
    const mock: Export = createMock<Export>();
    expect(mock.a().a).toBeDefined();
  });
});
