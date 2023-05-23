import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber'
import Box from './components/Box';
import { OrbitControls, OrthographicCamera, Scroll, ScrollControls } from '@react-three/drei';
import Scene from './components/Scene';

function App() {
  return (
    <div className="container">
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, -100, 200], fov: 100 }}>
      {/* <Suspense fallback={null}>
       <Scene />
      </Suspense> */}

      <OrbitControls />


<ScrollControls pages={3} damping={0.1}>
  {/* Canvas contents in here will *not* scroll, but receive useScroll! */}
  
  <Scroll>
    {/* Canvas contents in here will scroll along */}
   <Scene />
  </Scroll>
  <Scroll html>
    {/* DOM contents in here will scroll along */}
    <h1>html in here (optional)</h1>
    <h1 style={{ top: '100vh' }}>second page</h1>
    <h1 style={{ top: '200vh' }}>third page</h1>
  </Scroll>
</ScrollControls>
      <axesHelper args={[500]} />
      </Canvas>
    </div>
  )
}

export default App;
