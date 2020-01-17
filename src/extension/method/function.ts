// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(functionToCheck: any): functionToCheck is Function {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
