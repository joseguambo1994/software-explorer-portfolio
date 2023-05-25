import { useFrame, useLoader } from '@react-three/fiber';
import Box from '../Box';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import galaxyImage from '../../galaxy.jpg'
import { OrbitControls, Text } from '@react-three/drei';
import { Model } from '../../Duck';
import { useRef, useState } from 'react';
import { Mesh } from 'three';


const SceneModel = () => {



  return (
    <>
    <OrbitControls />
      <pointLight intensity={1} position={[1000, 1000, 1000]} />
     
      <pointLight position={[5, 5, 5]} />
      <Model position={[0, -400, 5]}/>
      </>
  )
}

export default SceneModel;
