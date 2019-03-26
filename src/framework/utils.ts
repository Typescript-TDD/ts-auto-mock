export function isString(cbOrTarget: any): cbOrTarget is string {
    return Object.prototype.toString.call(cbOrTarget) === "[object String]";
}