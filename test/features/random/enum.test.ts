import { createMock } from 'ts-auto-mock';

describe('Random enum', () => {
  it('should have random enum values', () => {
    enum EnumType {
      firstValue = 'firstValue',
      secondValue = 'secondValue',
      thirdValue = 2,
      fourthValue = 3,
    }

    type WithEnum = {
      propertyName1: EnumType;
      propertyName2: EnumType;
      propertyName3: EnumType;
      propertyName4: EnumType;
    };

    const firstMock: WithEnum = createMock<WithEnum>();
    const secondMock: WithEnum = createMock<WithEnum>();
    const thirdMock: WithEnum = createMock<WithEnum>();

    const mockValues: EnumType[] = [
      firstMock.propertyName1,
      firstMock.propertyName2,
      firstMock.propertyName3,
      firstMock.propertyName4,
      secondMock.propertyName1,
      secondMock.propertyName2,
      secondMock.propertyName3,
      secondMock.propertyName4,
      thirdMock.propertyName1,
      thirdMock.propertyName2,
      thirdMock.propertyName3,
      thirdMock.propertyName4,
    ];

    expect(mockValues.every((it: EnumType) => it === EnumType.firstValue)).toBe(false);
    expect(mockValues.every((it: EnumType) => it === EnumType.secondValue)).toBe(false);
    expect(mockValues.every((it: EnumType) => it === EnumType.thirdValue)).toBe(false);
    expect(mockValues.every((it: EnumType) => it === EnumType.fourthValue)).toBe(false);
  });
});
