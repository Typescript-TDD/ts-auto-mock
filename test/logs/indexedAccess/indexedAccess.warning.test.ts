import { createMock } from 'ts-auto-mock';
import { getLogsByCreateMockFileName, UnsupportedTypeLog } from '../utils/log';
import { OtherInterface } from './indexedAccess.warning.type';

describe('IndexedAccess Warning', () => {
  it('should log unsupported warning and assign null for `this` in extended interface with computed property name', async () => {
    const mock: OtherInterface = createMock<OtherInterface>();

    expect(mock.prop<'[]'>()).toBeNull();

    const logs: UnsupportedTypeLog[] = await getLogsByCreateMockFileName(
      'indexedAccess.warning.test.ts',
    );
    expect(logs.length).toBe(1);

    expect(logs[0].header).toContain(
      'WARNING: Transformer - IndexedAccessType transformation failed: cannot find property [] of - this[K]',
    );
    expect(logs[0].created).toMatch(
      /created file:\/\/.*indexedAccess\.warning\.test\.ts:[0-9]*:[0-9]*/,
    );
    expect(logs[0].usedBy).toMatch(
      /used by file:\/\/.*indexedAccess\.warning\.type\.ts:[0-9]*:[0-9]*/,
    );
  });
});
