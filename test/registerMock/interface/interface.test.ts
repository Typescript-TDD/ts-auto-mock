import { createMock, registerMock } from 'ts-auto-mock';

describe('registerMock for interface', () => {
  it('should override standard behaviour of mock creation', () => {
    interface APropInterface {
      internalProp: string;
    }

    interface AParentInterface {
      prop: APropInterface;
    }

    registerMock<APropInterface>(() => ({ internalProp: 'whaaat' }));
    const mock: AParentInterface = createMock<AParentInterface>();

    expect(mock.prop.internalProp).toBe('whaaat');
  });
});
