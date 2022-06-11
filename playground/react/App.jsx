/* eslint-disable no-restricted-globals */
import React, { useRef, useEffect } from 'react';
import { zooming } from 'zooming'
import { ZoomingFrameWrapper } from './components/ZoomingFrameWrapper';
import { ZoomingFrame } from './components/ZoomingFrame';
import styled from 'styled-components'

const Styled = styled.div`
  .app-body{
    max-width: 780px;
    margin: auto;
    padding-top: 5vmin;
    padding-bottom: 5vmin;
  }
  .app-body-header{
    font-size: 2em;
    font-weight: bold;
  }
  .playGround1{
    height: 800px;
  }
  .playGround1-wrapper > * + *, .playGround2-wrapper > * + * {
    margin-top: 15px;
  }
  .playGround1-title, .playGround2-title{
    font-weight: bold;
    font-size: 1.1em;
  }
  &  .p-frame-1{
    opacity: 0.5;
    background-color: rgb(224, 212, 42);
  }
  &  .p-frame-2{
    opacity: 0.5;
    background-color: aqua;
  }
  &  .p-frame-3{
    opacity: 0.5;
    background-color: grey;
  }

  [class*="p-block2-"] {
    position: relative;
  }
  .p-block2-1{
    
  }
  .p-block2-2{
    background-color: rgb(224, 212, 42);
  }
  .p-block2-3{
    background-color: aqua;
  }
`

const App = () => {
  const frame1 = useRef(null)
  const frame2 = useRef(null)
  const frame3 = useRef(null)

  const frame2_1 = useRef(null)
  const frame2_2 = useRef(null)
  const frame2_3 = useRef(null)

  console.log('render')

  useEffect(() => {
    if (frame1.current && frame2.current && frame3.current) {
      [frame1.current, frame2.current, frame3.current].forEach((el) => {
        el.addEventListener('click', () => {
          zooming.helper.toggle(el)
        })
      })
    }
  }, [frame1, frame2, frame3])

  useEffect(() => {
    if (frame2_1.current, frame2_2.current, frame2_3.current) {
      [frame2_1.current, frame2_2.current, frame2_3.current].forEach((el) => {
        el.addEventListener('click', () => {
          zooming.helper.toggle(el)
        })
      })
    }
  }, [frame2_1, frame2_2, frame2_3])

  return (
    <Styled>
      <div className="app-body">
        <div className="app-body-header">
          ZoomingDiv in React
        </div>
        <div className="playGround1-wrapper">
          <div className='playGround1-title'>
            Demo Case 1: zooming to absolute wrapper
          </div>
          <ZoomingFrameWrapper className={'playGround1'}>
            <ZoomingFrame
              ref={frame1}
              className={'p-frame-1'}
              frameMetasType={{
                framemetaY: '100px',
                framemetaX: '100px',
                framemetaWidth: '100px',
                framemetaHeight: '100px',
              }}
            >
            </ZoomingFrame>
            <ZoomingFrame
              ref={frame2}
              className={'p-frame-2'}
              frameMetasType={{
                framemetaY: '220px',
                framemetaX: '220px',
                framemetaWidth: '220px',
                framemetaHeight: '220px',
              }}
            ></ZoomingFrame>
            <ZoomingFrame
              ref={frame3}
              className={'p-frame-3'}
              frameMetasType={{
                framemetaY: '300px',
                framemetaX: '320px',
                framemetaWidth: '526px',
                framemetaHeight: '150px',
              }}
            ></ZoomingFrame>
            <div>
              <button className="p-button1">
                Invoke At Once
              </button>
            </div>
          </ZoomingFrameWrapper>

        </div>
        <div className="playGround2-wrapper">
          <div className='playGround2-title'>
            Demo Case 2: zooming in document flow
          </div>
          <ZoomingFrameWrapper className={'playGround2'}>
            <ZoomingFrame
              ref={frame2_1}
              className='p-block2-1'
            >
              AAA
            </ZoomingFrame>
            <ZoomingFrame
              ref={frame2_2}
              className='p-block2-2'
            >
              BBB
            </ZoomingFrame>
            <ZoomingFrame
              ref={frame2_3}
              className='p-block2-3'
            >
              CCC
            </ZoomingFrame>
          </ZoomingFrameWrapper>
        </div>
      </div>





    </Styled >
  );
};

export default App;
