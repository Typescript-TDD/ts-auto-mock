import { functionMethod } from './functionMethod';
// tslint:disable-next-line:no-any
type Method = (name: string, value: any) => () => any;
// tslint:disable-next-line:no-any
type MethodWithDeferredValue = (name: string, value: () => any) => () => any;

export class Provider {
    private _method: Method;
    private _isUsingDeprecatedProvideMethod: boolean;

    private constructor() {
        this._isUsingDeprecatedProvideMethod = false;
    }

    private static _instance: Provider;

    public static get instance(): Provider {
        this._instance = this._instance || new Provider();
        return this._instance;
    }

    /**
     * @deprecated ts-auto-mock will disable this functionality from version 2 because is not fully compatible with
     * call signatures. It will cause an maximum call stack exceeded error.
     * @see (https://github.com/uittorio/ts-auto-mock/blob/master/test/framework/recursive/recursive.deprecated.ts)
     *
     * Please use provideMethodWithDeferredValue instead
     *
     * @see [Extension](https://github.com/uittorio/ts-auto-mock/blob/master/docs/EXTENSION.md)
     */
    public provideMethod(method: Method): void {
        this._isUsingDeprecatedProvideMethod = true;
        this._method = method;
    }

    public provideMethodWithDeferredValue(method: MethodWithDeferredValue): void {
        this._method = method;
    }

    // tslint:disable-next-line:no-any
    public getMethod(name: string, value: () => any): Method {
        this._method = this._method || functionMethod;

        if (this._isUsingDeprecatedProvideMethod) {
            return this._method(name, value());
        }

        return this._method(name, value);
    }
}
