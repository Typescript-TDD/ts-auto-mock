import { createMockList } from 'ts-auto-mock';
import { ConditionalType } from './conditionalType';
import { getLogsByCreateMockFileName, UnsupportedTypeLog } from './utils/log';

describe('Warning', () => {
  it('should log an unsupported type warning', () => {
    const logs: UnsupportedTypeLog[] = getLogsByCreateMockFileName(
      'createMockList.warning.test.ts'
    );
    interface InterfaceWithConditionalType {
      conditional: ConditionalType<string>;
    }

    createMockList<InterfaceWithConditionalType>(2);
    expect(logs.length).toBe(1);

    expect(logs[0].header).toContain(
      'WARNING: Transformer - Not supported type: ConditionalType - it will convert to null'
    );
    expect(logs[0].created).toMatch(
      /created file:\/\/.*createMockList.warning\.test\.ts:[0-9]*:[0-9]*/
    );
    expect(logs[0].usedBy).toMatch(
      /used by file:\/\/.*conditionalType\.ts:[0-9]*:[0-9]*/
    );
  });
});
