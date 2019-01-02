import { SpyMethodFactory } from "../spy/SpyMethodFactory";
import Spy = jasmine.Spy;

export class JasmineSpyMethodFactory implements SpyMethodFactory<Spy> {
    create(name: string): jasmine.Spy {
        return jasmine.createSpy(name);
    }

}