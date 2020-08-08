export function isFunction(
  functionToCheck: unknown
): functionToCheck is Function {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}
