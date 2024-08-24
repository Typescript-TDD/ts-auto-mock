/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export type ConditionalType<T> = T extends string
  ? 'string'
  : T extends number
    ? 'number'
    : T extends boolean
      ? 'boolean'
      : T extends undefined
        ? 'undefined'
        : T extends Function
          ? 'function'
          : 'object';
/* eslint-enable @typescript-eslint/no-unsafe-function-type */
