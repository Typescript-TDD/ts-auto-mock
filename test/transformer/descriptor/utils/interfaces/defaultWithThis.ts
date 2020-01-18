export declare interface DefaultInterfaceWithThis {
  b: RecursiveInterface;

  a(): this;
}

export interface RecursiveInterface {
  b: DefaultInterfaceWithThis;
}

export default DefaultInterfaceWithThis;
