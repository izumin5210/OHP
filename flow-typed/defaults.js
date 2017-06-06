declare module 'defaults' {
  declare type defaults = <Options, Defaults>(options: Options, defaults: Defaults) => Defaults & Options;
  declare module.exports: defaults;
}
