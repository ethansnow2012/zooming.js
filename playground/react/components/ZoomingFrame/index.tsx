import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { zooming } from 'zooming'

// duplication of types!!!! To be refactored in the future
enum frameMetas {
    framemetaY = "framemeta-y",
    framemetaX = "framemeta-x",
    framemetaWidth = "framemeta-width",
    framemetaHeight = "framemeta-height"
}
enum frameMetas$map$cssVariable {
    framemetaY = "---y",
    framemetaX = "---x",
    framemetaWidth = "---width",
    framemetaHeight = "---height"
}

// derived type
type frameMetasKeys = keyof typeof frameMetas;
type FrameMetasType = { [key in frameMetasKeys]: string }


const Styled = styled.div`

`


export const ZoomingFrame = forwardRef((
        { className, children, frameMetasType }
            : { className: any, children: any, frameMetasType?: FrameMetasType },
        ref
    ) => {
    const inlineStyle = Object.keys(frameMetasType??{})
        .reduce((acc, current) => {
            const currentKey = frameMetas$map$cssVariable[current]
            const currentValue = frameMetasType[current]
            acc[currentKey] = currentValue;
            return acc
        }, {})
    const react$frameMetasType = Object.keys(frameMetasType??{})
        .reduce((acc, current) => {
            const currentKey = 'data-' + (current.replace(/([A-Z])/g, "-$1").toLowerCase())
            const currentValue = frameMetasType[current]
            acc[currentKey] = currentValue;
            return acc
        }, {})
    return (
        <div ref={ref}
            className={`${'zooming-frame'}${className ? (" " + className) : ""}`}
            {...react$frameMetasType}
            style={inlineStyle}
        >
            <Styled >
                {children}
            </Styled>
        </div>
    )
})