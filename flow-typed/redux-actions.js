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

  declare type ActionCreator = {
    <+Payload, +Meta, -Arg1, -Arg2, -Arg3>(
      type: string | Symbol,
      payloadCreator?: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Payload,
      metaCreator?: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Meta,
    ): (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Action<Payload, Meta>;

    <+Payload, +Meta, -Arg1, -Arg2>(
      type: string | Symbol,
      payloadCreator?: (arg1: Arg1, arg2: Arg2) => Payload,
      metaCreator?: (arg1: Arg1, arg2: Arg2) => Meta,
    ): (arg1: Arg1, arg2: Arg2) => Action<Payload, Meta>;

    <+Payload, +Meta, -Arg1>(
      type: string | Symbol,
      payloadCreator?: (arg1: Arg1) => Payload,
      metaCreator?: (arg1: Arg1) => Meta,
    ): (arg1: Arg1) => Action<Payload, Meta>;

    <+Payload, +Meta>(
      type: string | Symbol,
      payloadCreator?: () => Payload,
      metaCreator?: () => Meta,
    ): () => Action<Payload, Meta>;
  };

  declare type ActionHandler<State, Payload, Meta> = {
    (state: State, a: Action<Payload, Meta>): State;
    next?: (state: State, a: Action<Payload, Meta>) => State;
    throw?: (state: State, a: Action<Payload, Meta>) => State;
  };

  declare type ActionHandlerCreator = {
    <State, Payload, Meta>(
      type: string,
      reducer: ActionHandler<State, Payload, Meta>,
      defaultState: State,
    ): (state: State, action: Action<Payload, Meta>) => State;
  };

  declare type ReducerMap<State> = {
    [key: string]: (state: State, action: Action<any, any>) => State,
  };

  declare type ActionsHandlerCreator = {
    <State>(
      reducerMap: ReducerMap<State>,
      defaultState: State,
    ): (state: State, action: Action<any, any>) => State;
  };

  declare type ReduxActions = {
    createAction: ActionCreator;
    handleAction: ActionHandlerCreator;
    handleActions: ActionsHandlerCreator;
  };

  declare var exports: ReduxActions;
};
