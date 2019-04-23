import { Extension } from './extension';

export class ExtensionHandler<TMock> {
    private readonly _mock: TMock;

    constructor(mock: TMock) {
        this._mock = mock;
    }

    public get<TRequestedOverriddenMock>(extension: Extension<TMock, TRequestedOverriddenMock>): TRequestedOverriddenMock {
        return extension(this._mock);
    }
}
