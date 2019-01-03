import { ClassType } from "../class/classType";

export function getMethodNames<T>(klass: ClassType<T>): any {
    let methods: Array<string> = [];
    let proto = klass.prototype;

    do {
        const keys = Object.keys(proto);
        methods = methods.concat(keys);
        proto = Object.getPrototypeOf(proto);
    } while (proto);

    const constructorIndex = methods.indexOf('constructor');
    if (constructorIndex >= 0) {
        methods.splice(constructorIndex, 1);
    }

    return methods;
}