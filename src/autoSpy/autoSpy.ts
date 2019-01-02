import { ClassType } from "../class/classType";
import { Spy } from "../spy/spy";
import { SpyFactory } from "../spy/spyFactory";

export const SpyCreator = <T>(klass: ClassType<T>): Spy<T> => {
    return SpyFactory.forClass(klass);
};

