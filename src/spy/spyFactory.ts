import { Spy } from "./spy";
import { ClassType } from "../class/classType";
import { getMethodNames } from "../object/objectHelper";
import { SpyMethodFactory } from "./SpyMethodFactory";

let globalSpyMethodFactory = null;

export class SpyFactory {
    static setSpyMethod<T>(spyMethodFactory: SpyMethodFactory<T>) {
        globalSpyMethodFactory = spyMethodFactory;
    }

    static forClass<T>(klass: ClassType<T>): Spy<T> {
        const spy: any = {};

        const methods = getMethodNames(klass);

        methods.forEach((methodName: string) => {
           spy[methodName] = globalSpyMethodFactory.create(methodName);
        });

        return spy;
    }
}