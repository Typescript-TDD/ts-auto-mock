import { createMock } from 'ts-auto-mock';

describe('typescript lib', () => {
  it('should set an empty array', () => {
    interface Interface {
      // tslint:disable-next-line
      a: Array<boolean>;
    }
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toEqual([]);
  });

  it('should set the default value for a number', () => {
    interface Interface {
      a: Number;
    }
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toBe(0);
  });

  it('should set the default value for a string', () => {
    interface Interface {
      a: String;
    }
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toBe('');
  });

  it('should set the default value for a boolean', () => {
    interface Interface {
      a: Boolean;
    }
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toBe(false);
  });

  it('should set the default value for empty object', () => {
    interface Interface {
      a: object;
    }
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toEqual({});
  });

  it('should set the default value for an Object', () => {
    interface Interface {
      a: Object;
    }
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toEqual({});
  });

  it('should set an empty function for a function', () => {
    interface Interface {
      a: Function;
    }
    const properties: Interface = createMock<Interface>();
    expect(properties.a()).toBeUndefined();
  });

  it('should set an empty array for a ReadOnlyArray', () => {
    interface Interface {
      a: ReadonlyArray<boolean>;
    }
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toEqual([]);
  });

  it('should create a new Date for a Date', () => {
    interface Interface {
      a: Date;
    }

    const properties: Interface = createMock<Interface>();
    expect(properties.a).toBeInstanceOf(Date);
  });

  it('should set a promise resolved for a promise', async () => {
    interface Interface {
      a(): Promise<string>;
    }

    const properties: Interface = createMock<Interface>();

    const interfaceCast: Interface = properties as unknown as Interface;

    const result: string = await interfaceCast.a();
    expect(result).toBe('');
  });

  it('should set a promise resolved for a promise with array', async () => {
    interface Interface {
      a(): Promise<string[]>;
    }

    const properties: Interface = createMock<Interface>();

    const interfaceCast: Interface = properties as unknown as Interface;

    const result: Array<string> = await interfaceCast.a();
    expect(result).toEqual([]);
  });

  it('should set a promise resolved for a promise with more generics', async () => {
    interface WithGenerics<T> {
      generic: T;
    }
    interface Interface {
      a(): Promise<WithGenerics<string>>;
    }

    const properties: Interface = createMock<Interface>();

    const interfaceCast: Interface = properties as unknown as Interface;

    const result: WithGenerics<string> = await interfaceCast.a();
    expect(result).toEqual({
      generic: '',
    });
  });

  it('should set a promise resolved for a promise with more promise', async () => {
    interface WithGenerics {
      generic(): Promise<number>;
    }

    interface Interface {
      a(): Promise<WithGenerics>;
    }

    const properties: Interface = createMock<Interface>();
    const interfaceCast: Interface = properties as unknown as Interface;
    const result: WithGenerics = await interfaceCast.a();
    const secondPromise: number = await result.generic();

    expect(secondPromise).toBe(0);
  });

  it('should set a promise resolved for a promise with more promise with generics', async () => {
    interface WithGenerics<T> {
      generic(): Promise<T>;
      generic2(): Promise<number>;
    }

    interface Interface {
      a(): Promise<WithGenerics<string>>;
    }

    const properties: Interface = createMock<Interface>();
    const interfaceCast: Interface = properties as unknown as Interface;
    const result: WithGenerics<string> = await interfaceCast.a();
    const secondPromise: string = await result.generic();
    const secondPromise2: number = await result.generic2();

    expect(secondPromise).toBe('');
    expect(secondPromise2).toBe(0);
  });

  it('should set a promise resolved for a promise without type', async () => {
    interface Interface {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      method(): Promise;
    }

    const properties: Interface = createMock<Interface>();
    const result: Interface = await properties.method();
    expect(result).toBeUndefined();
  });

  it('should set a promise resolved for a promise with multiple type parameter', async () => {
    interface Interface<T, T2> {
      a: T2;
      method(): Promise<Interface<T, T2>>;
    }

    const properties: Interface<string, number> =
      createMock<Interface<string, number>>();
    const result: Interface<string, number> = await properties.method();
    expect(result.a).toBe(0);
  });

  it('should set different promises resolved for a promise with type parameter', async () => {
    interface Interface<T> {
      method(): Promise<T>;
    }

    createMock<Interface<string>>();
    const propertiesReuse: Interface<number> = createMock<Interface<number>>();
    const result: number = await propertiesReuse.method();
    expect(result).toBe(0);
  });

  it('should set a promise for multiple type reference', async () => {
    type B<T1> = Promise<T1>;
    type A<T> = B<T>;

    interface Interface {
      method(): A<string>;
    }

    const properties: Interface = createMock<Interface>();
    const result: string = await properties.method();
    expect(result).toBe('');
  });

  it('should set a promise resolved for a type mocked directly', async () => {
    type S<T> = Promise<T>;
    const properties: S<string> = createMock<S<string>>();
    const result: string = await properties;
    expect(result).toBe('');
  });

  it('should create a new Map for a Map', () => {
    type S<T> = Map<T, string>;
    type AType = {
      map: Map<number, Number>;
    };
    interface AnInterface {
      map: Map<String, string>;
    }
    const mapMock: S<string> = createMock<S<string>>();
    const aType: AType = createMock<AType>();
    const anInterface: AnInterface = createMock<AnInterface>();
    const realMap: Map<string, string> = new Map();

    expect(mapMock.constructor).toBe(realMap.constructor);
    expect(aType.map.constructor).toBe(realMap.constructor);
    expect(anInterface.map.constructor).toBe(realMap.constructor);
  });

  it('should create a new Set for a Set', () => {
    type S<T> = Set<T>;
    type AType = {
      mySet: Set<number>;
    };
    interface AnInterface {
      mySet: Set<string>;
      doSth(): Set<string>;
    }
    const setMock: S<string> = createMock<S<string>>();
    const aType: AType = createMock<AType>();
    const anInterface: AnInterface = createMock<AnInterface>();
    const realSet: Set<string> = new Set();

    expect(setMock.constructor).toBe(realSet.constructor);
    expect(aType.mySet.constructor).toBe(realSet.constructor);
    expect(anInterface.mySet.constructor).toBe(realSet.constructor);
    expect(anInterface.doSth().constructor).toBe(realSet.constructor);
  });

  it('should set undefined for a not recognized type alias declaration', () => {
    interface WithLiteralTypescriptType {
      prop: InsertPosition;
    }

    const mock: WithLiteralTypescriptType =
      createMock<WithLiteralTypescriptType>();

    expect(mock.prop).toBeUndefined();
  });
});
