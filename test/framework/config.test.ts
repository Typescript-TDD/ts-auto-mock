import * as tsAutoMock from "ts-auto-mock";

tsAutoMock.MockFactory.instance.registerFactory((value: any) => {
    return jasmine.createSpy("").and.returnValue(value);
});