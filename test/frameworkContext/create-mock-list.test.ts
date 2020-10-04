import { createMockList } from 'ts-auto-mock';
import { getTwo } from './utils/function.test';

describe('create-mock-list', () => {
  interface Interface {
    property: string;
    method(): void;
  }

  it('should have different mocks for each item', () => {
    const properties: Interface[] = createMockList<Interface>(2);
    properties[0].method();
    expect(properties[0].method).toHaveBeenCalled();
    expect(properties[1].method).not.toHaveBeenCalled();
  });

  it('should create a list of mocks when the number is calculated from a function', () => {
    function two(): number {
      return 2;
    }

    const mockList: Interface[] = createMockList<Interface>(two());
    expect(mockList.length).toBe(2);
    expect(mockList[1].property).toBe('');
  });

  it('should create a list of mocks when the number is calculated from a function imported', () => {
    const mockList: Interface[] = createMockList<Interface>(getTwo());
    expect(mockList.length).toBe(2);
    expect(mockList[1].property).toBe('');
  });

  it('should create a list of mocks when the number is in a variable', () => {
    const numberOfMocks: number = 3;
    const mockList: Interface[] = createMockList<Interface>(numberOfMocks);
    expect(mockList.length).toBe(3);
    expect(mockList[0].property).toBe('');
  });
});
