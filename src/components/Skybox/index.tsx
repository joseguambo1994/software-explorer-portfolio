import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber'
import { useCubeTexture, useScroll } from '@react-three/drei';


const SkyBox = () => {
  const { scene } = useThree();
  const texture = useCubeTexture([
    'galaxy.jpg',
    'galaxy.jpg',
    'galaxy.jpg',
    'galaxy.jpg',
    'galaxy.jpg',
    'galaxy.jpg',
  ], { path: '/' })

  
  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}
export default SkyBox;