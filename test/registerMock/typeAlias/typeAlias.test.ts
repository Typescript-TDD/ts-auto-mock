import { createMock, registerMock } from 'ts-auto-mock';

describe('registerMock for type alias', () => {
  it('should override standard behaviour of mock creation', () => {
    type APropType = {
      internalProp: string;
    }

    interface AParentInterface {
      prop: APropType;
    }

    registerMock<APropType, APropType>(() => ({ internalProp: 'whaaat' }));
    const mock: AParentInterface = createMock<AParentInterface>();

    expect(mock.prop.internalProp).toBe('whaaat');
  });
  
  it('should override standard behaviour of mock creation for intersection', () => {
    type APropType = { internalProp: string; } & { else: number; }

    interface AParentInterface {
      prop: APropType;
    }

    registerMock<APropType, APropType>(() => ({ internalProp: 'whaaat', else: 53 }));
    const mock: AParentInterface = createMock<AParentInterface>();

    expect(mock.prop.internalProp).toBe('whaaat');
    expect(mock.prop.else).toBe(53);
  });
});
