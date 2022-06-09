import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`

`

export function ZoomingFrameWrapper({ className, children }) {
    return (
        <Styled className={`${'zooming-frame-wrapper'}${className?(" "+className):""}`}>
            {children}
        </Styled>
    )
}