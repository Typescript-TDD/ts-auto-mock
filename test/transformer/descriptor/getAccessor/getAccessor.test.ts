import { createMock } from 'ts-auto-mock';

describe('getAccessor', () => {
  class AClass {
    public get prop1(): number {
      return 4;
    }

    public get prop2(): string {
      return '42';
    }

    public get prop3(): AClass {
      return new AClass();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public get prop4() {
      return 123;
    }
  }

  it('should mock the correct explicit type', () => {
    const mock: AClass = createMock<AClass>();
    expect(mock.prop1).toBe(0);
    expect(mock.prop2).toBe('');
    expect(mock.prop3.prop3.prop3.prop1).toBe(0);
  });

  it('should mock the correct type inferred from the body', () => {
    const mock: AClass = createMock<AClass>();
    expect(mock.prop4).toBe(123);
  });

  describe('when setter is defined', () => {
    it('should ignore it', () => {
      class AClassWithSetter {
        private aValue: string;

        public set a(value: string) {
          this.aValue = value;
        }

        public get a(): string {
          return '';
        }

        public get b(): string {
          return '';
        }

        public set b(value: string) {
          this.aValue = value;
        }
      }

      const mock: AClassWithSetter = createMock<AClassWithSetter>();

      expect(mock.a).toBe('');
      expect(mock.b).toBe('');
    });
  });
});
