import { createMock } from 'ts-auto-mock';
import { getLogsByCreateMockFileName, UnsupportedTypeLog } from '../utils/log';
import { InterfacePropFallbackAny } from './untypedProperty.warning.type';

describe('Untyped property Warning', () => {
  it('should log a warning and apply null to the property', async () => {
    const logs: UnsupportedTypeLog[] = await getLogsByCreateMockFileName(
      'untypedProperty.warning.test.ts'
    );

    createMock<InterfacePropFallbackAny>();
    expect(logs.length).toBe(1);

    expect(logs[0].header).toContain(
      'WARNING: Transformer - The transformer could not determine' +
        ' a property value for prop; ' +
        'without a specified type nor an initializer value - it will convert to null'
    );
    expect(logs[0].created).toMatch(
      /created file:\/\/.*untypedProperty\.warning\.test\.ts:[0-9]*:[0-9]*/
    );
    expect(logs[0].usedBy).toMatch(
      /used by file:\/\/.*untypedProperty\.warning\.type\.ts:[0-9]*:[0-9]*/
    );
  });
});
