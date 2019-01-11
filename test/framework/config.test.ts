import * as tsAutoMock from "ts-auto-mock";

tsAutoMock.MockFactory.instance.registerFactory((name: string, value: any) => {
    return jasmine.createSpy(name).and.returnValue(value);
});