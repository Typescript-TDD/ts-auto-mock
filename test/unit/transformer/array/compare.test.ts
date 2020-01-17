import { ArrayHelper } from '../../../../src/transformer/array/array';

describe('when comparing', () => {
  it('should be true for 2 empty arrays', () => {
    expect(ArrayHelper.AreEqual([], [])).toBe(true);
  });

  it('should be false for arrays with different lengths', () => {
    expect(ArrayHelper.AreEqual(['a'], [])).toBe(false);
  });

  it('should be true when contains exactly the same elements', () => {
    expect(ArrayHelper.AreEqual(['a', 'b'], ['a', 'b'])).toBe(true);
  });

  it('should be false when containing different elements', () => {
    expect(ArrayHelper.AreEqual(['a', 'c'], ['a', 'b'])).toBe(false);
  });

  it('should be true when contains same elements in different positions', () => {
    expect(ArrayHelper.AreEqual(['a', 'b'], ['b', 'a'])).toBe(true);
  });

  it('should be false when one element is not present in the second array', () => {
    expect(ArrayHelper.AreEqual(['a', 'b'], ['a', 'a'])).toBe(false);
  });

  it('should be false when all element present in first array are in the second array', () => {
    expect(ArrayHelper.AreEqual(['a', 'a'], ['a', 'b'])).toBe(false);
  });
});
