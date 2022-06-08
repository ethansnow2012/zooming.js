import React from 'react'
import styled from 'styled-components'
import zooming from 'zooming'


const Styled = styled.div`

`

export function ZoomingFrame({children}){
    return (
        <Styled >
            {children}
        </Styled>
    )
}