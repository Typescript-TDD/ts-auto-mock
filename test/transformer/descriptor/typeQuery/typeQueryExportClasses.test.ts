import { createMock } from 'ts-auto-mock';
import exportEqual = require('../utils/export/exportEqual');

describe('TypeQuery export equal classes', () => {
  it('should exclude the class and not fail', () => {
    // When transforming typeof a module there are some scenario that are not playing nicely with ts-auto-mock implementation
    // Ts auto mock uses typeChecker getExportsOfModule functionality to find symbols
    // When the module uses export = ClassName ts auto mock will find the prototype but it will not be able to find the original declaration.
    const mock: typeof exportEqual = createMock<typeof exportEqual>();

    expect(mock).toBeDefined();
  });
});
