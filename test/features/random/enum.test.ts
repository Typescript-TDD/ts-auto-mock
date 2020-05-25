import { createMock } from 'ts-auto-mock';

describe('Random enum', () => {
  it('should have random enum values', () => {
    enum EnumType {
      firstValue = 'firstValue',
      secondValue = 'secondValue',
      thirdValue = 2,
    }

    type WithEnum = {
      propertyName: EnumType;
    };

    const spy: jasmine.Spy = spyOn(Math, 'floor');

    spy.and.returnValue(0);
    const firstMock: WithEnum = createMock<WithEnum>();

    expect(firstMock.propertyName).toBe(EnumType.firstValue);

    spy.and.returnValue(1);
    const secondMock: WithEnum = createMock<WithEnum>();

    expect(secondMock.propertyName).toBe(EnumType.secondValue);

    spy.and.returnValue(2);
    const thirdMock: WithEnum = createMock<WithEnum>();

    expect(thirdMock.propertyName).toBe(EnumType.thirdValue);

    // Should have 0, when does't have value in array
    spy.and.returnValue(100);
    const fourthMock: WithEnum = createMock<WithEnum>();

    expect(fourthMock.propertyName).toBe(0);
  });

  it('should have 0 value, when enum empty', () => {
    enum EmptyEnum {}

    type WithEmptyEnum = {
      propertyName: EmptyEnum;
    };

    const mock: WithEmptyEnum = createMock<WithEmptyEnum>();

    expect(mock.propertyName).toBe(0);
  });
});
