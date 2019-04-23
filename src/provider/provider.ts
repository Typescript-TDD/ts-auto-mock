import { functionMethod } from './functionMethod';
import { Method } from './method';

export class Provider {
    private _method: Method;

    private constructor() {}

    private static _instance: Provider;

    public static get instance(): Provider {
        this._instance = this._instance || new Provider();
        return this._instance;
    }

    public provideMethod(method: Method): void {
        this._method = method;
    }

    // tslint:disable-next-line:no-any
    public getMethod(name: string, value: any): Method {
        this._method = this._method || functionMethod;

        return this._method(name, value);
    }
}
