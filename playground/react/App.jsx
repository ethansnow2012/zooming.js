/* eslint-disable no-restricted-globals */
import React from 'react';
import {zooming}  from 'zooming'
import { ZoomingFrameWrapper } from './components/ZoomingFrameWrapper';


const App = () => {
  console.log(zooming) 
  return (
    <div>
        <h2>ZoomingDiv in React </h2>
        <div></div>Jsx can be executed here.
        <div>
          <ZoomingFrameWrapper>
            <div>test</div>
          </ZoomingFrameWrapper>
        </div>

    </div>
  );
};

export default App;
