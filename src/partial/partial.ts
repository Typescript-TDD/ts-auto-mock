import type { BuiltIns } from './internal';

export type PartialDeep<T> = T extends BuiltIns
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? PartialMapDeep<KeyType, ValueType>
  : T extends Set<infer ItemType>
  ? PartialSetDeep<ItemType>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? PartialReadonlyMapDeep<KeyType, ValueType>
  : T extends ReadonlySet<infer ItemType>
  ? PartialReadonlySetDeep<ItemType>
  : T extends (...args: any[]) => unknown // eslint-disable-line @typescript-eslint/no-explicit-any
  ? T | undefined
  : T extends object
  ? T extends ReadonlyArray<infer ItemType> // Test for arrays/tuples, per https://github.com/microsoft/TypeScript/issues/35156
    ? ItemType[] extends T // Test for arrays (non-tuples) specifically
      ? readonly ItemType[] extends T // Differentiate readonly and mutable arrays
        ? ReadonlyArray<PartialDeep<ItemType | undefined>>
        : Array<PartialDeep<ItemType | undefined>>
      : PartialObjectDeep<T>
    : PartialObjectDeep<T>
  : unknown;

type PartialMapDeep<KeyType, ValueType> = {} & Map<
  PartialDeep<KeyType>,
  PartialDeep<ValueType>
>;

type PartialSetDeep<T> = {} & Set<PartialDeep<T>>;

type PartialReadonlyMapDeep<KeyType, ValueType> = {} & ReadonlyMap<
  PartialDeep<KeyType>,
  PartialDeep<ValueType>
>;

type PartialReadonlySetDeep<T> = {} & ReadonlySet<PartialDeep<T>>;

type PartialObjectDeep<ObjectType extends object> = {
  [KeyType in keyof SuppressObjectPrototypeOverrides<ObjectType>]?: PartialDeep<
    SuppressObjectPrototypeOverrides<ObjectType>[KeyType]
  >;
};

type SuppressObjectPrototypeOverrides<ObjectType> = Pick<
  ObjectType,
  Exclude<keyof ObjectType, keyof Object>
> &
  Pick<Object, Extract<keyof Object, keyof ObjectType>>;
