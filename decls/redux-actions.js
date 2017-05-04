declare module 'redux-actions' {

  declare type Action<P, M> =
    {
      type: string,
      payload: P,
      meta: M,
      error: false | null,
    } |
    {
      type: string,
      payload: Error | P,
      meta: M,
      error: true,
    };

  declare class ActionCreator<-PI, +PO, +M> {
    (payload: PI): Action<PO, M>;
    toString(): string;
  }

  declare function createAction<-PI, +PO, +M>(
    type: string | Symbol,
    payloadCreator?: (payload: PI) => PO,
    metaCreator?: (payload: PI) => M,
  ): ActionCreator<PI, PO, M>;

  declare function handleAction(type: string, reducer: Object | Function): Function;
  declare function handleActions(reducerMap: Object, defaultState?: Object | string): Function;
}
