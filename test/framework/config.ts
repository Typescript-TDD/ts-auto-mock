import { Provider } from 'ts-auto-mock/extension';

// tslint:disable:no-any
Provider.instance.provideMethodWithDeferredValue((name: string, value: () => any) => {
    return jasmine.createSpy(name).and.callFake(value);
});
