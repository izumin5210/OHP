// @flow
import type { Element } from 'react'

type Props = {
  children: any,
}

export default function ExternalLink ({ children, ...rest }: Props): Element<*> {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      {...rest}
    >
      { children }
    </a>
  )
}
