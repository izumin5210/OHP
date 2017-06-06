declare module 'defaults' {
  declare function defaults<Options, Defaults>(options: Options, defaults: Defaults): Defaults & Options;
  declare module.expots: defaults;
}
