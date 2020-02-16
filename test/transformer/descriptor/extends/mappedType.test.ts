import {createMock} from 'ts-auto-mock';

describe('extends MappedType', () => {
  enum SOME_ENUM {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
  }

  type Dictionary<T extends string, S> = {[key in T]: S};

  it('should be able to convert the interface type', () => {
    interface IBase  {
      propertyA: string;
      propertyB: number;
    }

    interface InterfaceWithExtends extends Dictionary<SOME_ENUM, IBase> {}

    const type: InterfaceWithExtends = createMock<InterfaceWithExtends>();
    expect(type.FIRST.propertyA).toBe('');
    expect(type.FIRST.propertyB).toBe(0);
    expect(type.SECOND.propertyB).toBe(0);
    expect(type.SECOND.propertyA).toBe('');
  });

  it('should be able to convert the primitive type', () => {
    interface InterfaceWithExtends extends Dictionary<SOME_ENUM, string> {}

    const type: InterfaceWithExtends = createMock<InterfaceWithExtends>();
    expect(type.FIRST).toBe('');
    expect(type.SECOND).toBe('');
  });

  it('should be able to convert the primitive type using Record', () => {
    interface InterfaceWithExtends extends Record<SOME_ENUM, string> {}

    const type: InterfaceWithExtends = createMock<InterfaceWithExtends>();
    expect(type.FIRST).toBe('');
    expect(type.SECOND).toBe('');
  });

  it('should be able to convert the literal type', () => {
    interface InterfaceWithExtends extends Record<SOME_ENUM, {
      propertyA: boolean;
    }> {}

    const type: InterfaceWithExtends = createMock<InterfaceWithExtends>();
    expect(type.FIRST.propertyA).toBe(false);
  });
});
