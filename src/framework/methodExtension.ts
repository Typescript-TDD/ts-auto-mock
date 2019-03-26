import {Extension} from "./extension";
import {MockMethod} from "ts-auto-mock";
import {isString} from "./utils";

type FunctionReturn<TR> = () => TR;

export function method<TFunctionReturn, TMock>(target: keyof TMock): Extension<TMock, MockMethod<TFunctionReturn>>;
export function method<TFunctionReturn, TMock>(cb: (mock: TMock) => (FunctionReturn<TFunctionReturn> | Function)): Extension<TMock, MockMethod<TFunctionReturn>>;
export function method<TFunctionReturn, TMock>(cbOrTarget: any): Extension<TMock, MockMethod<TFunctionReturn>> {
    if (isString(cbOrTarget)) {
        return (mock: TMock) => mock[cbOrTarget] as MockMethod<TFunctionReturn>;
    } else {
        return cbOrTarget as unknown as (mock: TMock) => MockMethod<TFunctionReturn>;
    }
}