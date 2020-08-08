import { createMock } from 'ts-auto-mock';

describe('when variables are created in a for', () => {
  it('should not have conflicts with ts auto mock imports', () => {
    interface MyInterface {
      a: string;
    }

    createMock<MyInterface>();
    const a: string[] = ['hello', 'world'];

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty
      for (const c of a) {
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty
      for (const d of a) {
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty
      for (const e of a) {
      }
    }).not.toThrow();
  });
});

describe('when there are variables with the same name as ts auto mock private identifiers', () => {
  it('should have conflicts with ts auto mock imports', () => {
    // eslint-disable-next-line @typescript-eslint/typedef,@typescript-eslint/no-unused-vars
    const ɵRepository = 'test';
    interface MyInterface {
      a: string;
    }

    expect(() => {
      createMock<MyInterface>();
    }).toThrow();
  });
});
