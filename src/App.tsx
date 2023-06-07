import React, { Suspense, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas, useLoader, useThree,extend , useFrame, Vector3 } from '@react-three/fiber'
import Box from './components/Box';
import { Environment, OrbitControls, OrthographicCamera, Scroll, ScrollControls, Sky, View, useCubeTexture, useTexture } from '@react-three/drei';
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
import Particles from './components/particle';
import PersonalData from './components/personalData';
import { RobotAnimated } from './components/robotAnimated';
import PersonalDataScene from './components/PersonalDataScene';

extend({ OrbitControls });
const getBox = () =>{
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 28 }}>
    <color attach="background" args={['#151520']} />
    <directionalLight position={[-2.5, 4, 5]} castShadow intensity={1} shadow-bias={-0.00001} shadow-mapSize={[1024, 1024]} />
    <group position={[0, -0.75, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <mesh receiveShadow rotation-x={-Math.PI / 2} scale={1} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="pink" envMapIntensity={0.5} roughness={0} metalness={0} />
      </mesh>
    </group>
    <OrbitControls />
  </Canvas>
  )
}

const getModel = () =>{
  return (
    <Canvas>
      
    <Suspense fallback={<></>}>
    <directionalLight position={[-2.5, 4, 5]} />

      <Model />
      <OrbitControls />
    </Suspense>
  </Canvas>
  )
}


export const Skybox = () => {
  const {scene} = useThree();
  const envMap = useCubeTexture([
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    
], { path: '/' })
scene.background = envMap
return null
}


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

  const [position, setPosition] = useState<Vector3>([3,3,3]); 

  
 return <html lang="en" >
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body >
    <Canvas>
 <PersonalDataScene />
 </Canvas>
    {
    getBox()
  }
  {
    getModel()
  }
  
    
  </body>
</html>
}

export default App;
