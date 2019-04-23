// tslint:disable:no-any
export function functionMethod(name: string, value: any): any {
    return (): any => {
        return value;
    };
}
