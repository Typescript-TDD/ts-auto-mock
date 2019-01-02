import { ClassType } from "../class/classType";
import { SpyFactory } from "./spyFactory";
import { Spy } from "./spy";

export function SpyCreator<T>(klass: ClassType<T>): Spy<T> {
    return SpyFactory.forClass(klass);
}

