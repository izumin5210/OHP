declare module 'react-measure' {
  declare export type Client = {
    top: number,
    left: number,
    width: number,
    height: number,
  }

  declare export type Offset = {
    top: number,
    left: number,
    width: number,
    height: number,
  }

  declare export type Scroll = {
    top: number,
    left: number,
    width: number,
    height: number,
  }

  declare export type Bounds = {
    width: number,
    height: number,
    top: number,
    right: number,
    bottom: number,
    left: number,
  }

  declare export type Margin = {
    top: number,
    right: number,
    bottom: number,
    left: number,
  }

  declare export type ContentRect = {
    entry: Object,
    client: {} | Client,
    offset: {} | Offset,
    scroll: {} | Scroll,
    bounds: {} | Bounds,
    margin: {} | Margin,
  }

  declare module.exports: any
}
