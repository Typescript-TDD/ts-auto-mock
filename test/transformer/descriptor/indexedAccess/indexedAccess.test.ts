import { createMock } from 'ts-auto-mock';
import { Interface } from '../utils/interfaces/basic';
import { LiteralA } from '../utils/types/literals';

describe('indexedAccess', () => {
  interface A {
    a: string;
    b: number;
  }

  it('should work with key in keyof', () => {
    type AType = {[key in keyof A]: A[key]};
    const mock: AType = createMock<AType>();
    expect(mock.a).toEqual('');
    expect(mock.b).toEqual(0);
  });

  it('should work with key in literal', () => {
    type AType = {[key in 'a']: A[key]};
    const mock: AType = createMock<AType>();
    expect(mock.a).toEqual('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock as any).b).toBeUndefined();
  });

  it('should work with key in keyof with literal index', () => {
    type AType = {[key in keyof A]: A['b']};
    const mock: AType = createMock<AType>();
    expect(mock.a).toEqual(0);
    expect(mock.b).toEqual(0);
  });

  it('should work with key in keyof with imported literal index', () => {
    type AType = {[key in keyof A]: A[LiteralA]};
    const mock: AType = createMock<AType>();
    expect(mock.a).toEqual('');
    expect(mock.b).toEqual('');
  });

  it('should work with key in keyof with imported interface and literal index', () => {
    type AType = {[key in keyof Interface]: Interface[LiteralA]};
    const mock: AType = createMock<AType>();
    expect(mock.a).toEqual('');
    expect(mock.b).toEqual('');
  });

  it('should work with key in keyof with interface having complex properties', () => {
    interface InterfaceWithComplex {
      a: A;
      b: string;
      c: InterfaceWithComplex;
    }

    type InterfaceType = {[key in keyof InterfaceWithComplex]: InterfaceWithComplex[key]};
    const mock: InterfaceType = createMock<InterfaceType>();
    expect(mock.a.a).toEqual('');
    expect(mock.a.b).toEqual(0);
    expect(mock.b).toEqual('');
    expect(mock.c.a.a).toEqual('');
    expect(mock.c.a.b).toEqual(0);
    expect(mock.c.b).toEqual('');
  });
});
