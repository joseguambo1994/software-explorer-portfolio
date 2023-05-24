import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import Box from './components/Box';
import { Environment, OrbitControls, OrthographicCamera, Scroll, ScrollControls, Sky, useTexture } from '@react-three/drei';
import Scene from './components/Scene';
import Cube from './components/Cube';
import Scene2 from './components/Scene2';
import Scene3 from './components/Scene3';
import { Model } from './Duck';
import SceneModel from './components/SceneModel';
import { TextureLoader } from 'three';
import galaxyImage from './galaxy.jpg'
import SkyBox from './components/Skybox';


function App() {
 

  return (
    <div className="container"  >
    <Canvas shadows dpr={[1, 2]} camera={{ position: [600, 600, 600], fov: 100 }}
  
    >
     
    {/* <Environment
        files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr"
        background
        blur={0.9}
      /> */}
      {/* <Suspense fallback={null}>
       <Scene />
      </Suspense> */}

{/* <OrbitControls /> */}

<ScrollControls pages={3} damping={0.1}>
  {/* Canvas contents in here will *not* scroll, but receive useScroll! */}
 
  <Scroll>
    <Scene3 />
  </Scroll>
  <Scroll>
    <Scene2 />
  </Scroll>
  <Scroll>
    <Scene3 />
  </Scroll>
  <Scroll>
    <Scene />
  </Scroll>
  <Scroll>
   <SceneModel />
  </Scroll>
</ScrollControls>
      <axesHelper args={[500]} />
      <ambientLight />
      <Sky
             distance={450000}
             sunPosition={[5, 1, 8]}
             inclination={0}
             azimuth={0.25}
           
         />
      </Canvas>
    </div>
  )
}

export default App;
