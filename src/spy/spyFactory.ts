import { Spy } from "./spy";
import { ClassType } from "../class/classType";
import { getMethodNames } from "../object/objectHelper";
import { SpyMethodFactory } from "./spyMethodFactory";

export class SpyFactory {
    static forClass<T, TSpy>(klass: ClassType<T>, spyMethodFactory: SpyMethodFactory<TSpy>): Spy<T, TSpy> {
        const spy: any = {};

        const methods = getMethodNames(klass);

        methods.forEach((methodName: string) => {
           spy[methodName] = spyMethodFactory.create(methodName);
        });

        return spy;
    }
}