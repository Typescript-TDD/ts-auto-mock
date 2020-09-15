import { createMock } from 'ts-auto-mock';

describe('for enum', () => {
  enum Direction {
    Right,
    Left,
  }

  enum DirectionAssign {
    Right = 'Right',
    Left = 'Left',
  }

  enum DirectionAssignNumber {
    Right = 1,
    Left = 3,
  }
  interface Interface {
    a: Direction;
    b: DirectionAssign;
    c: DirectionAssignNumber;
  }

  it('should set the first enum', () => {
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toBe(Direction.Right);
    expect(properties.b).toBe(DirectionAssign.Right);
    expect(properties.c).toBe(DirectionAssignNumber.Right);
  });
});

describe('for enum from a module', () => {
  it('should assign the first enum value', () => {
    const properties: NameSpace.WithEnum = createMock<NameSpace.WithEnum>();

    // We cannot check against the real ENUM because is a d.ts, it cannot be used as a value
    expect(properties.propertyWithoutDefaultValue).toEqual(0);
    expect(properties.propertyWithDefaultValue).toEqual('1');
  });
});

describe('for enum with constant computed values', () => {
  it('should assign the computed enum value of the first member', () => {
    enum DirectionAssignNumber {
      Right = 1 + 1,
      Left = 1 + 5,
    }

    interface Interface {
      a: DirectionAssignNumber;
    }

    const properties: Interface = createMock<Interface>();

    expect(properties.a).toEqual(2);
  });
});
