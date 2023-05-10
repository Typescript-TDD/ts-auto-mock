import { createMock } from 'ts-auto-mock';

describe('create-mock-values', () => {
  interface SubInterface {
    property: number;
  }

  interface Interface {
    property: string | null;
    method: (() => void) | null;
    subInterface: SubInterface | null;
  }

  it('should create the mock merging the values provided', () => {
    const properties: Interface = createMock<Interface>({
      property: 'sss',
    });

    expect(properties.property).toBe('sss');
    if (typeof properties.method === 'function') {
      properties.method();
    }
  });

  it('should create the mock merging the null values provided', () => {
    const properties: Interface = createMock<Interface>({
      property: null,
      method: null,
      subInterface: null,
    });

    expect(properties.property).toBeNull();
    expect(properties.method).toBeNull();
    expect(properties.subInterface).toBeNull();
  });

  it('should assign the entire object if value is a mock', () => {
    interface TypeToMock {
      a: string;
    }

    const mock: TypeToMock = createMock<TypeToMock>();

    interface ParentType {
      prop: TypeToMock;
    }

    const parentMock: ParentType = createMock<ParentType>({
      prop: mock,
    });

    expect(parentMock.prop).toBe(mock);
  });

  it('should assign the entire object if value is a recursive mock', () => {
    interface TypeToMock {
      a: TypeToMock;
      b: string;
    }

    const mock1: TypeToMock = createMock<TypeToMock>();
    const mock2: TypeToMock = createMock<TypeToMock>({
      b: '123',
    });

    interface ParentType {
      propArray: TypeToMock[];
      prop: TypeToMock;
    }

    const parentMock: ParentType = createMock<ParentType>({
      // @ts-ignore
      propArray: [mock1, mock2],
      prop: mock1,
    });

    expect(parentMock.propArray[0]).toBe(mock1);
    expect(parentMock.propArray[1]).toBe(mock2);
    expect(parentMock.prop).toBe(mock1);
  });
});
