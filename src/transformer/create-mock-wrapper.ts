import { createMock } from "./create-mock";

export const createMockWrapper = <TClass extends object>() => {
    return createMock<TClass>()
};