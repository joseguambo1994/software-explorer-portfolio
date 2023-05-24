import { useLoader } from '@react-three/fiber';
import Box from '../Box';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import galaxyImage from '../../galaxy.jpg'
import { Text } from '@react-three/drei';


const Scene3 = () => {



  return (
    <>
      <pointLight intensity={1} position={[1000, 1000, 1000]} />
     
      <pointLight position={[5, 5, 5]} />
      <Text
        scale={[60, 60, 60]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[0, 400, 100]}
      >
       "Robot Playground" (https://skfb.ly/6QXFq) by Hadrien59 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
      </Text>
      </>
  )
}

export default Scene3;
