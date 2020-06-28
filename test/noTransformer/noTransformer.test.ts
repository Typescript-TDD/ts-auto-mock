import { createMock, createMockList, registerMock } from 'ts-auto-mock';

interface MyInterface {
  a: string;
  b: number;
}

describe('when using placeholder functions without installing the transformer', () => {
  it('should throw an error linking the installation guide', () => {
    expect(() => createMock<MyInterface>()).toThrowError(/https:\/\/typescript-tdd.github.io\/ts-auto-mock\/installation/);
    expect(() => createMockList<MyInterface>(2)).toThrowError(/https:\/\/typescript-tdd.github.io\/ts-auto-mock\/installation/);
    expect(() => registerMock<MyInterface>(() => ({ a: '', b: 4 }))).toThrowError(/https:\/\/typescript-tdd.github.io\/ts-auto-mock\/installation/);
  });
});
