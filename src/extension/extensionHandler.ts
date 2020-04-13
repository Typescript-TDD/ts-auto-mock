import { Extension } from './extension';
import { isFunction } from './method/function';

type AsMockedPropertyHandler<TMockedPropertyHandler, TMock, TPropName extends keyof TMock> = (prop: TMock[TPropName], mock: TMock, propName: TPropName) => TMockedPropertyHandler;

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
    extensionOrPropertyName: Extension<TMock, TMockedPropertyHandler> | TPropName,
    maybePropertyHandler?: AsMockedPropertyHandler<TMockedPropertyHandler, TMock, TPropName>,
  ): TMockedPropertyHandler {
    if (isFunction(extensionOrPropertyName)) {
      return extensionOrPropertyName(this._mock);
    }

    if (!maybePropertyHandler) {
      throw new Error(
        `It looks like you are trying to get an extension for ${extensionOrPropertyName} without specifying the handler.`,
      );
    }

    return maybePropertyHandler(this._mock[extensionOrPropertyName], this._mock, extensionOrPropertyName);
  }
}
