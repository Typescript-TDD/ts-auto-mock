export declare interface DefaultInterfaceWithThis {
    a(): this;
    b: RecursiveInterface;
}

export interface RecursiveInterface {
    b: DefaultInterfaceWithThis;
}

export default DefaultInterfaceWithThis;
