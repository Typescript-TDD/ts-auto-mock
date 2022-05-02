export const getObjectKeyValues: <T>(object: T) => T = <T>(object) =>
  Object.getOwnPropertyNames(object).reduce((acc, property) => {
    acc[property] = object[property];
    return acc;
  }, {} as T);
