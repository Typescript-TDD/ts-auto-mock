import { createMock } from 'ts-auto-mock';
import { getLogsByCreateMockFileName, UnsupportedTypeLog } from '../utils/log';
import { KeyOfType } from './keyof.warning.type';

describe('KeyOf Warning', () => {
  it('should log an unsupported type warning', async () => {
    const logs: UnsupportedTypeLog[] = await getLogsByCreateMockFileName(
      'keyof.warning.test.ts'
    );

    createMock<KeyOfType>();
    expect(logs.length).toBe(1);

    expect(logs[0].header).toContain(
      'WARNING: Transformer - Not supported type: TypeOperator of KeyOfKeyword - it will convert to null'
    );
    expect(logs[0].created).toMatch(
      /created file:\/\/.*keyof\.warning\.test\.ts:[0-9]*:[0-9]*/
    );
    expect(logs[0].usedBy).toMatch(
      /used by file:\/\/.*keyof\.warning\.type\.ts:[0-9]*:[0-9]*/
    );
  });
});
