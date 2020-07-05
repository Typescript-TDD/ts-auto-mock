import { createMock, registerMock } from 'ts-auto-mock';

describe('registerMock using vars from the scope', () => {
  it('should override standard behaviour of mock creation using values from the scope', () => {
    interface APropInterface {
      internalProp: string;
      call: () => APropInterface;
    }

    interface AParentInterface {
      prop: APropInterface;
    }

    const propInstance: APropInterface = { internalProp: 'whaaat', call: () => propInstance };

    registerMock<APropInterface>(() => propInstance);

    const mock: AParentInterface = createMock<AParentInterface>();

    expect(mock.prop).toBe(propInstance);
    expect(mock.prop.call()).toBe(propInstance);
  });

  it('should override standard behaviour of mock creation using values from createMock', () => {
    interface APropInterface {
      internalProp: string;
      call: () => APropInterface;
    }

    interface AParentInterface {
      prop: APropInterface;
    }

    const propInstance: APropInterface = createMock<APropInterface>();

    registerMock<APropInterface>(() => propInstance);

    const mock: AParentInterface = createMock<AParentInterface>();

    expect(mock.prop).toBe(propInstance);
    expect(mock.prop.call()).toBe(propInstance);
  });
});
