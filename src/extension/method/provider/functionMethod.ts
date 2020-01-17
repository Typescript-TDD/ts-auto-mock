// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function functionMethod(name: string, value: () => any): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): any => value();
}
