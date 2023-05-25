import React, { Suspense, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas, useLoader, useThree,extend , useFrame } from '@react-three/fiber'
import Box from './components/Box';
import { Environment, OrbitControls, OrthographicCamera, Scroll, ScrollControls, Sky, View, useTexture } from '@react-three/drei';
import Scene from './components/Scene';
import Cube from './components/Cube';
import Scene2 from './components/Scene2';
import Scene3 from './components/Scene3';
import { Model } from './Duck';
import SceneModel from './components/SceneModel';
import { TextureLoader } from 'three';
import galaxyImage from './galaxy.jpg'

import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBAFormat,
  LinearMipmapLinearFilter
} from "three";

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  return (
    <OrbitControls
    />
  );
};

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg"
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

// Geometry
function Sphere() {
  const { scene, gl } = useThree();
  // The cubeRenderTarget is used to generate a texture for the reflective sphere.
  // It must be updated on each frame in order to track camera movement and other changes.
  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBAFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter
  });
   const cubeCamera = new CubeCamera(1, 4000, cubeRenderTarget);
    cubeCamera.position.set(100, 200, 200);
    scene.add(cubeCamera);

  // Update the cubeCamera with current renderer and scene.
 useFrame(() => cubeCamera.update(gl, scene));

  return (
    <mesh visible position={[0, 90, 0]} rotation={[0, 0, 0]} castShadow>
      <directionalLight intensity={0.5} />
      <sphereGeometry attach="geometry" args={[20, 320, 320]} />
      <meshBasicMaterial
        attach="material"
        envMap={cubeCamera.renderTarget.texture}
        color="white"
      />
    </mesh>
  );
}

// Lights
function App() {
  return (
    <Canvas className="canvas" shadows dpr={[1, 2]} camera={{ position: [200, 200, 0], fov: 100 }}>
      <SkyBox />
      <ScrollControls pages={3} damping={0.1}>
  {/* Canvas contents in here will *not* scroll, but receive useScroll! */}
  <Sphere />
  <Scroll>
    <Scene />
  </Scroll>

  <Scroll>
   <SceneModel />
  </Scroll>
</ScrollControls>
      <axesHelper args={[500]} />
      {/* <CameraControls /> */}
     
      
    </Canvas>
  );
}

export default App;
