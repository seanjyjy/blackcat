// reference https://stackoverflow.com/questions/35482241/how-to-type-redux-actions-and-redux-reducers-in-typescript
export type Action<TPayload> = {
  type: string;
  payload?: TPayload;
};

export interface IActionCreator<P> {
  type: string;
  (payload: P): Action<P>;
}

export function actionCreator<P>(type: string): IActionCreator<P> {
  return Object.assign((payload: P) => ({ type, payload }), { type });
}

export function isType<P>(
  action: Action<any>,
  actionCreator: IActionCreator<P>
): action is Action<P> {
  return action.type === actionCreator.type;
}

export function createRequestTypes<R, S, F>(action: string) {
  return {
    REQUEST: actionCreator<R>(`${action}_REQUEST`),
    SUCCESS: actionCreator<S>(`${action}_SUCCESS`),
    FAILURE: actionCreator<F>(`${action}_FAILURE`),
  };
}
