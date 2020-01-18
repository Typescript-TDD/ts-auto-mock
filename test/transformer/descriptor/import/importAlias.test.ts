import { createMock } from 'ts-auto-mock';
import { Interface as InterfaceAlias } from '../utils/interfaces/basic';
import { InterfaceAliasExport } from '../utils/interfaces/importAndExport';

describe('importAlias', () => {
  it('should use the correct import for an alias', () => {
    const mock: InterfaceAlias = createMock<InterfaceAlias>();
    expect(mock.a).toBe('');
    expect(mock.b).toBe(0);
  });

  it('should use the correct import for an internal alias', () => {
    const mock: InterfaceAliasExport = createMock<InterfaceAliasExport>();
    expect(mock.a).toBe('');
    expect(mock.b).toBe(0);
  });
});
