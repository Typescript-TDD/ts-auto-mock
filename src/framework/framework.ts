import { FrameworkSpy } from "./frameworkSpy";

export class Framework {
    static createSpy(name: string): FrameworkSpy {
        return {
            spyName: name
        }
    }
}