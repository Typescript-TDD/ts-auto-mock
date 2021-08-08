import { createMock } from 'ts-auto-mock';
import { ClassThatUseDifferentCreateMock } from './utilities/class';

describe('create-mock', () => {
  describe('when there is another function called createMock', () => {
    it('should not be affected by createMock', () => {
      const h: ClassThatUseDifferentCreateMock =
        new ClassThatUseDifferentCreateMock();
      expect(h.propertyGenerated).toBe('property');
      const properties: ClassThatUseDifferentCreateMock =
        createMock<ClassThatUseDifferentCreateMock>();
      expect(properties.property).toBe('');
    });
  });
});
