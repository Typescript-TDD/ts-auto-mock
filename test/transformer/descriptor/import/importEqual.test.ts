// eslint-disable-next-line import/order
import { NameSpaceInterfaceImport } from '../utils/namespace/namespace';
// eslint-disable-next-line import/order
import IAmAnotherExportedWithEqual from '../utils/interfaces/anotherExportEqual';
import { createMock } from 'ts-auto-mock';
import Enum = NameSpaceInterfaceImport.Enum;
import Interface = NameSpaceInterfaceImport.Interface;
import SubInterface = NameSpaceInterfaceImport.SubNamespace.SubInterface;
import IAmExportedWithEqual = require('../utils/interfaces/exportEqual');

describe('import equal', () => {
  it('should use the correct import for an interface', () => {
    const mock: Interface = createMock<Interface>();
    expect(mock.a).toBe('');
  });

  it('should use the correct import for a literal', () => {
    interface InterfaceWithEnumFromModule {
      enum: Enum;
    }
    const mock: InterfaceWithEnumFromModule = createMock<
      InterfaceWithEnumFromModule
    >();
    expect(mock.enum).toBe(Enum.A);
  });

  it('should use the correct import for a sub module interface', () => {
    const mock: SubInterface = createMock<SubInterface>();
    expect(mock.a).toBe('');
  });

  it('should use the correct import for an equal exported interface used with require', () => {
    const mock: IAmExportedWithEqual = createMock<IAmExportedWithEqual>();
    expect(mock.a).toBe('');
    expect(mock.b).toBe(0);
  });

  it('should use the correct import for an equal exported interface used with import', () => {
    const mock: IAmAnotherExportedWithEqual = createMock<
      IAmAnotherExportedWithEqual
    >();
    expect(mock.a).toBe('');
    expect(mock.b).toBe(0);
  });
});
