import { createMock } from 'ts-auto-mock';

describe('Random enum', () => {
  it('should have random enum values', () => {
    enum EnumType {
      FirstValue = 'FirstValue',
      SecondValue = 'SecondValue',
      ThirdValue = 2,
    }

    type WithEnum = {
      propertyName: EnumType;
    };

    const spy: jasmine.Spy = spyOn(Math, 'floor');

    spy.and.returnValue(0);
    const firstMock: WithEnum = createMock<WithEnum>();

    expect(firstMock.propertyName).toBe(EnumType.FirstValue);

    spy.and.returnValue(1);
    const secondMock: WithEnum = createMock<WithEnum>();

    expect(secondMock.propertyName).toBe(EnumType.SecondValue);

    spy.and.returnValue(2);
    const thirdMock: WithEnum = createMock<WithEnum>();

    expect(thirdMock.propertyName).toBe(EnumType.ThirdValue);
  });

  it('should have 0 value, when enum empty', () => {
    enum EmptyEnum {}

    type WithEmptyEnum = {
      propertyName: EmptyEnum;
    };

    const mock: WithEmptyEnum = createMock<WithEmptyEnum>();

    expect(mock.propertyName).toBe(0);
  });

  describe('for enum from a module', () => {
    it('should assign correct random value', () => {
      // We cannot check against the real ENUM because is a d.ts, it cannot be used as a value
      const spy: jasmine.Spy = spyOn(Math, 'floor');
      spy.and.returnValue(0);

      const mock1: NameSpace.WithEnum = createMock<NameSpace.WithEnum>();

      expect(mock1.propertyWithoutDefaultValue).toBe(0);
      expect(mock1.propertyWithDefaultValue).toBe('1');

      spy.and.returnValue(1);
      const mock2: NameSpace.WithEnum = createMock<NameSpace.WithEnum>();

      expect(mock2.propertyWithoutDefaultValue).toBe(1);
      expect(mock2.propertyWithDefaultValue).toBe('2');
    });
  });

  it('const enum declaration should work correctly with random', () => {
    const enum Direction {
      Up,
      Down,
      None = 'Nothing',
    }

    interface Movement {
      direction: Direction;
    }

    const spy: jasmine.Spy = spyOn(Math, 'floor');

    spy.and.returnValue(0);
    const firstMock: Movement = createMock<Movement>();

    expect(firstMock.direction).toBe(Direction.Up);

    spy.and.returnValue(1);
    const secondMock: Movement = createMock<Movement>();

    expect(secondMock.direction).toBe(Direction.Down);

    spy.and.returnValue(2);
    const thirdMock: Movement = createMock<Movement>();

    expect(thirdMock.direction).toBe(Direction.None);
  });

  it('should get the correct const enum member computed property', () => {
    const enum WithComputed {
      Computed = 1 + 4,
    }

    interface IWithComputed {
      computed: WithComputed;
    }

    const spy: jasmine.Spy = spyOn(Math, 'floor');

    spy.and.returnValue(0);
    const mock1: IWithComputed = createMock<IWithComputed>();

    expect(mock1.computed).toBe(5);
  });

  it('should get the correct enum member computed property for constant expression', () => {
    enum WithComputed {
      Computed = 1 + 4,
    }

    interface IWithComputed {
      computed: WithComputed;
    }

    const spy: jasmine.Spy = spyOn(Math, 'floor');

    spy.and.returnValue(0);
    const mock1: IWithComputed = createMock<IWithComputed>();

    expect(mock1.computed).toBe(5);
  });

  it('should have position of non constant "computed" property, because transformer don\'t support non constant computed Enum values', () => {
    // Issue https://github.com/Typescript-TDD/ts-auto-mock/issues/339
    function getComputed(): number {
      return 12;
    }

    enum WithComputed {
      NonComputed,
      Computed = getComputed(),
      Computed1 = getComputed(),
    }

    interface IWithComputed {
      computed: WithComputed;
    }

    const spy: jasmine.Spy = spyOn(Math, 'floor');

    spy.and.returnValue(1);
    const mock1: IWithComputed = createMock<IWithComputed>();

    expect(mock1.computed).toBe(1);

    spy.and.returnValue(2);
    const mock2: IWithComputed = createMock<IWithComputed>();

    expect(mock2.computed).toBe(2);
  });
});
