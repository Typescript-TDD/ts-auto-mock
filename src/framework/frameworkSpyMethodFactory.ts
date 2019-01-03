import { SpyMethodFactory } from "../spy/spyMethodFactory";
import { Framework } from "./framework";
import { FrameworkSpy } from "./frameworkSpy";

export class FrameworkSpyMethodFactory implements SpyMethodFactory<FrameworkSpy> {
    create(name: string): FrameworkSpy {
        return Framework.createSpy(name);
    }
}