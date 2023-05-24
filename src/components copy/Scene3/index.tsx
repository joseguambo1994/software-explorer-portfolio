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
        scale={[300, 300, 300]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        HELLO WORLD
      </Text>
      </>
  )
}

export default Scene3;
