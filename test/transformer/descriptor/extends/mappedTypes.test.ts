import { createMock } from 'ts-auto-mock';

describe('extends MappedTypes', () => {
  it('should not convert the properties', () => {
    enum SomeEnum {
      FIRST = 'FIRST',
      SECOND = 'SECOND',
    }

    interface IBase {
      propertyA: string;
      propertyB: number;
    }

    interface InterfaceWithExtends extends Record<SomeEnum, IBase> {}

    const type: InterfaceWithExtends = createMock<InterfaceWithExtends>();
    expect(type.FIRST).toBeUndefined();
    expect(type.SECOND).toBeUndefined();
  });
});
