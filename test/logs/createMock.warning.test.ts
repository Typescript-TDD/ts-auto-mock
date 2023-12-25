import { createMock } from 'ts-auto-mock';
import { ConditionalType } from './conditionalType';
import { getLogsByCreateMockFileName, UnsupportedTypeLog } from './utils/log';

describe('Create Mock Warning', () => {
  it('should log an unsupported type warning', async () => {
    const logs: UnsupportedTypeLog[] = await getLogsByCreateMockFileName(
      'createMock.warning.test.ts',
    );
    interface InterfaceWithConditionalType {
      conditional: ConditionalType<string>;
    }

    createMock<InterfaceWithConditionalType>();
    expect(logs.length).toBe(1);

    expect(logs[0].header).toContain(
      'WARNING: Transformer - Not supported type: ConditionalType - it will convert to null',
    );
    expect(logs[0].created).toMatch(
      /created file:\/\/.*createMock.warning\.test\.ts:[0-9]*:[0-9]*/,
    );
    expect(logs[0].usedBy).toMatch(
      /used by file:\/\/.*conditionalType\.ts:[0-9]*:[0-9]*/,
    );
  });
});
