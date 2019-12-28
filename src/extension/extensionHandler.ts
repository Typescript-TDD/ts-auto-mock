import { Extension } from './extension';
import { isFunction } from './method/function';

type AsMockedPropertyHandler<TMockedPropertyHandler, TMock, TPropName extends keyof TMock> = (mock: TMock, propName: TPropName, prop: TMock[TPropName]) => TMockedPropertyHandler;

export class ExtensionHandler<TMock> {
    private readonly _mock: TMock;

    constructor(mock: TMock) {
        this._mock = mock;
    }

    public get<TPropName extends keyof TMock, TMockedPropertyHandler>(
        propertyName: TPropName,
        asMockedPropertyHandler: AsMockedPropertyHandler<TMockedPropertyHandler, TMock, TPropName>,
    ): TMockedPropertyHandler;
    public get<TMockedPropertyHandler>(
        extension: Extension<TMock, TMockedPropertyHandler>,
    ): TMockedPropertyHandler;
    public get<TPropName extends keyof TMock, TMockedPropertyHandler>(
        extensionOrPropertyName: Function | TPropName,
        maybePropertyHandler?: AsMockedPropertyHandler<TMockedPropertyHandler, TMock, TPropName>,
    ): TMockedPropertyHandler {
        if (isFunction(extensionOrPropertyName)) {
            return extensionOrPropertyName(this._mock);
        }

        return maybePropertyHandler(this._mock, extensionOrPropertyName, this._mock[extensionOrPropertyName]);
    }
}
