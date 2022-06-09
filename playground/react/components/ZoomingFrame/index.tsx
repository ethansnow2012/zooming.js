import React from 'react'
import styled from 'styled-components'
import { zooming }  from 'zooming'

// duplication of types!!!! To be refactored in the future
enum frameMetas {
    framemetaY = "framemeta-y",
    framemetaX = "framemeta-x",
    framemetaWidth = "framemeta-width",
    framemetaHeight = "framemeta-height"
}
enum frameMetas$map$dimensionKey {
    framemetaY = "top",
    framemetaX = "left",
    framemetaWidth = "width",
    framemetaHeight = "height"
}
// derived type
type frameMetasKeys = keyof typeof frameMetas;
type FrameMetasType = { [key in frameMetasKeys]: string }


const Styled = styled.div`

`


export function ZoomingFrame({ className, children, frameMetasType }: { className: any, children: any, frameMetasType: FrameMetasType }) {
    const inlineStyle = Object.keys(frameMetasType)
        .reduce((acc, current) => {
            const currentKey = '---' + frameMetas$map$dimensionKey[current]
            const currentValue = frameMetasType[current]
            acc[currentKey] = currentValue;
            return acc
        }, {})
    const react$frameMetasType = Object.keys(frameMetasType)
        .reduce((acc, current) => {
            const currentKey = 'data-' + (current.replace(/([A-Z])/g, "-$1").toLowerCase())
            const currentValue = frameMetasType[current]
            acc[currentKey] = currentValue;
            return acc
        }, {})
    return (
        <Styled >
            <div
                className={`${'zooming-frame'} ${className}`}
                {...react$frameMetasType}
                style={inlineStyle}
            >
                {children}
            </div>
        </Styled>
    )
}