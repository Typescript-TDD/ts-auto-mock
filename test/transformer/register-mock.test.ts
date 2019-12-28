import { createMock, registerMock } from 'ts-auto-mock';
import { On } from 'ts-auto-mock/extension';

describe('register-mock', () => {
  it('should override standard behaviour of mock creation', () => {
    interface APropInterface {
      internalProp: string;
    }

    interface AParentInterface {
      prop: APropInterface;
    }

    registerMock<APropInterface, APropInterface>(() => ({ internalProp: 'whaaat' }));
    const mock: AParentInterface = createMock<AParentInterface>();

    expect(mock.prop.internalProp).toBe('whaaat');
  });
});
