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
  
  it('should return an extension to access the extended version of the mocked property', () => {
    interface APropInterface {
      internalProp: string;
    }

    interface AParentInterface {
      prop: APropInterface;
    }

    const asWithSomethingElse = registerMock<APropInterface, APropInterface & { somethingElse: number; }>(() => ({ internalProp: 'whaaat', somethingElse: 54 }));
    const mock: AParentInterface = createMock<AParentInterface>();

    expect(On(mock).get("prop", asWithSomethingElse).somethingElse).toBe(54);
  });
});
