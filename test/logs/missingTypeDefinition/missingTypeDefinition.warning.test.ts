import { createMock } from 'ts-auto-mock';
import { getLogsByCreateMockFileName, UnsupportedTypeLog } from '../utils/log';
import { WrapperOfNotExistingType } from './missingTypeDefinition.warning.type';

describe('Missing type definition', () => {
  it('should log a warning and apply null', async () => {
    const logs: UnsupportedTypeLog[] = await getLogsByCreateMockFileName(
      'missingTypeDefinition.warning.test.ts',
    );

    createMock<WrapperOfNotExistingType>();
    expect(logs.length).toBe(1);

    expect(logs[0].header).toContain(
      'WARNING: Transformer - Type definition for type reference NotExistingType not found - it will convert to null',
    );
    expect(logs[0].created).toMatch(
      /created file:\/\/.*missingTypeDefinition\.warning\.test\.ts:[0-9]*:[0-9]*/,
    );
    expect(logs[0].usedBy).toMatch(
      /used by file:\/\/.*missingTypeDefinition\.warning\.type\.ts:[0-9]*:[0-9]*/,
    );
  });
});
