// @flow
import SplitPane from 'react-split-pane'
import styled from 'styled-components'

import type { Element } from 'react'

import * as colors from 'settings/colors'

const resizerClassName = 'resizer'

const PanesWrapper = styled.div`
  .${resizerClassName} {
    background: #000;
    opacity: 0.2;
    z-index: 1;
    box-sizing: border-box;
    background-clip: padding-box;

    &:hover {
      transition: all 2s ease;
    }

    &.horizontal {
      height: 11px;
      margin: -5px 0;
      border-top: 5px solid ${colors.white};
      border-bottom: 5px solid ${colors.white};
      cursor: row-resize;
      width: 100%;

      &:hover {
        border-top: 5px solid ${colors.blackForeground500};
        border-bottom: 5px solid ${colors.blackForeground500};
      }
    }

    &.vertical {
      width: 11px;
      margin: 0 -5px;
      border-left: 5px solid ${colors.white};
      border-right: 5px solid ${colors.white};
      cursor: col-resize;

      &:hover {
        border-left: 5px solid ${colors.blackForeground500};
        border-right: 5px solid ${colors.blackForeground500};
      }
    }

    &.disabled {
      cursor: not-allowed;

      &:hover {
        border-color: ${colors.transparent};
      }
    }
  }
`

type Props = {
  split: 'vertical' | 'horizontal',
  children?: Element<*> | Array<Element<*>>,
}

export default function Panes ({ children, ...rest }: Props) {
  return (
    <PanesWrapper>
      <SplitPane
        {...{ resizerClassName, ...rest }}
        paneStyle={{ overflowY: 'auto' }}
      >
        { children }
      </SplitPane>
    </PanesWrapper>
  )
}
