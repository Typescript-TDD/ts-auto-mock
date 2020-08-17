type Primitive = null | undefined | string | number | boolean | symbol | bigint;

export type PartialDeep<T> = T extends Primitive
  ? Partial<T>
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
  ? PartialObjectDeep<T>
  : unknown;

/**
 Same as `PartialDeep`, but accepts only `Map`s and  as inputs. Internal helper for `PartialDeep`.
 */
interface PartialMapDeep<KeyType, ValueType>
  extends Map<PartialDeep<KeyType>, PartialDeep<ValueType>> {}

/**
 Same as `PartialDeep`, but accepts only `Set`s as inputs. Internal helper for `PartialDeep`.
 */
interface PartialSetDeep<T> extends Set<PartialDeep<T>> {}

/**
 Same as `PartialDeep`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `PartialDeep`.
 */
interface PartialReadonlyMapDeep<KeyType, ValueType>
  extends ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>> {}

/**
 Same as `PartialDeep`, but accepts only `ReadonlySet`s as inputs. Internal helper for `PartialDeep`.
 */
interface PartialReadonlySetDeep<T> extends ReadonlySet<PartialDeep<T>> {}

/**
 Same as `PartialDeep`, but accepts only `object`s as inputs. Internal helper for `PartialDeep`.
 */
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
