import {createMock} from 'ts-auto-mock';

describe('extends MappedTypes', () => {
  it('should not convert the properties', () => {
    enum SOME_ENUM {
      FIRST = 'FIRST',
      SECOND = 'SECOND',
    }


    interface IBase {
      propertyA: string;
      propertyB: number;
    }

    interface InterfaceWithExtends extends Record<SOME_ENUM, IBase> {}

    const type: InterfaceWithExtends = createMock<InterfaceWithExtends>();
    expect(type.FIRST).toBeUndefined();
    expect(type.SECOND).toBeUndefined();
  });
});
