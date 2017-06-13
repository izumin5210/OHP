// @flow
import remark from 'remark'

export default function factory (
  plugins: { [key:string]: Function },
  optionsByPluginName: { [key:string]: Object },
) {
  return function (remarkReactComponents: { [key:string]: any }) {
    return Object.keys(plugins).reduce(
      (r: any, name: string) => {
        const options = {
          ...(name in optionsByPluginName ? optionsByPluginName[name] : {}),
          ...(name === 'react' ? { remarkReactComponents } : {}),
        }
        return r.use(plugins[name], options)
      },
      remark(),
    )
  }
}
