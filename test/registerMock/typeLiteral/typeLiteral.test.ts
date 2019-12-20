import { createMock, createMockList, registerMock } from 'ts-auto-mock';

describe('registerMock type literal', () => {
  it('should never work', () => {
    registerMock<{prop: string;},{prop: string;}>(() => ({prop: 'mocked one'}));
    
    const mock1: {prop: string} = createMock<{prop: string;}>();
    const mock2: {prop: string}[] = createMockList<{prop: string;}>(1);
    const mock3: { sub: {prop: string}; } = createMock<{ sub: {prop: string}; }>();
    
    interface Interface {
      sub: {prop: string};
    }
    const mock4: Interface = createMock<Interface>();
    
    type Literal = {prop: string;};
    const mock5: Literal = createMock<Literal>();
    
    type Intersection = {prop: string;} & {some: number;};
    const mock6: Intersection = createMock<Intersection>();
    
    expect(mock1.prop).toBe('');
    expect(mock2[0].prop).toBe('');
    expect(mock3.sub.prop).toBe('');
    expect(mock4.sub.prop).toBe('');
    expect(mock5.prop).toBe('');
    expect(mock6.prop).toBe('');
  });
});
