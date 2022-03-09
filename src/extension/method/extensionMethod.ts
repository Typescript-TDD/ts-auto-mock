import { Extension } from '../extension';
import { Method } from './method';
import { isString } from './string';

type FunctionReturn<TR> = () => TR;

export function method<TFunctionReturn, TMock>(
  target: keyof TMock
): Extension<TMock, Method<TFunctionReturn>>;

export function method<TFunctionReturn, TMock>(
  cb: (mock: TMock) => FunctionReturn<TFunctionReturn> | Function
): Extension<TMock, Method<TFunctionReturn>>;

export function method<TFunctionReturn, TMock>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cbOrTarget: any
): Extension<TMock, Method<TFunctionReturn>> {
  if (isString(cbOrTarget)) {
    return (mock: TMock): Method<TFunctionReturn> =>
      mock[cbOrTarget] as Method<TFunctionReturn>;
  } else {
    return cbOrTarget as unknown as (mock: TMock) => Method<TFunctionReturn>;
  }
}
