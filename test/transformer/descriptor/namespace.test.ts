import { createMock } from "../../../src/transformer/create-mock";
import { NameSpaceInterfaceImport } from "./namespace/namespace";
namespace NameSpaceInterface {
    export interface Interface {
        a: boolean;
    }
}

describe('for namespace', () => {
    it('should define the default values', () => {
        const properties: NameSpaceInterface.Interface = createMock<NameSpaceInterface.Interface>();
        expect(properties.a).toBe(false)
    });

    it('should define the default values', () => {
        const properties: NameSpaceInterfaceImport.Interface = createMock<NameSpaceInterfaceImport.Interface>();
        expect(properties.a).toBe("")
    });
});