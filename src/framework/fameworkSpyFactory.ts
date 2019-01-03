import { ClassType } from "../class/classType";
import { SpyFactory } from "../spy/spyFactory";
import { FrameworkSpyMethodFactory } from "./frameworkSpyMethodFactory";
import { FrameworkAutoSpy } from "./frameworkAutoSpy";

export class FameworkSpyFactory {
    static forClass<T>(klass: ClassType<T>): FrameworkAutoSpy<T> {
        return SpyFactory.forClass(klass, new FrameworkSpyMethodFactory());
    }
}