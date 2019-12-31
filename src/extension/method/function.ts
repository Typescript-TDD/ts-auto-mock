// tslint:disable-next-line:no-any
export function isFunction(functionToCheck: any): functionToCheck is Function {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
