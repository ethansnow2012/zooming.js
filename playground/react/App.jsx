/* eslint-disable no-restricted-globals */
import React from 'react';
import {zooming}  from 'zooming'
import { ZoomingFrameWrapper } from './components/ZoomingFrameWrapper';
import { ZoomingFrame } from './components/ZoomingFrame';

// framemetaY = "framemeta-y",
//     framemetaX = "framemeta-x",
//     framemetaWidth = "framemeta-width",
//     framemetaHeight = "framemeta-height"
const App = () => {
  console.log(zooming) 
  return (
    <div>
        <h2>ZoomingDiv in React </h2>
        <div>Jsx can be executed here.</div>
        <div>
          <ZoomingFrame 
            className = {'p-aaa'}
            frameMetasType={{
              framemetaY: '100px',
              framemetaX: '100px',
              framemetaWidth: '100px',
              framemetaHeight: '100px',
            }}
          >

          </ZoomingFrame>
        </div>

    </div>
  );
};

export default App;
