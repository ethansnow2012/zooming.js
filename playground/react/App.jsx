/* eslint-disable no-restricted-globals */
import React, { useRef, useEffect } from 'react';
import { zooming } from 'zooming'
import { ZoomingFrameWrapper } from './components/ZoomingFrameWrapper';
import { ZoomingFrame } from './components/ZoomingFrame';
import styled from 'styled-components'

const Styled = styled.div`
  .playGround1{
    height: 800px;
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
`

const App = () => {
  const frame1 = useRef(null)
  const frame2 = useRef(null)
  const frame3 = useRef(null)

  console.log('render')

  useEffect(() => {
    if (frame1.current && frame2.current && frame3.current) {
      [frame1.current, frame2.current, frame3.current].forEach((el)=>{
        el.addEventListener('click', ()=>{
          zooming.helper.toggle(el)
        })
      })
    }
  }, [frame1, frame2, frame3])

  return (
    <Styled>
      <h2>ZoomingDiv in React </h2>
      <div>Jsx can be executed here.</div>
      <div>
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
        </ZoomingFrameWrapper>
      </div>

    </Styled>
  );
};

export default App;
