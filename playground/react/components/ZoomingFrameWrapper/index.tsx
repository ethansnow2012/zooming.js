import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`

`

export function ZoomingFrameWrapper({children}){
    return (
        <Styled >
            {children}
        </Styled>
    )
}