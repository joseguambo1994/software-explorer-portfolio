import { useLoader } from '@react-three/fiber';
import Box from '../Box';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import galaxyImage from '../../galaxy.jpg'


const Scene2 = () => {

    const colorMap = useLoader(TextureLoader, galaxyImage)


  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight intensity={1} position={[1000, 1000, 1000]} />
      
      <mesh
      
      position={[0, -1000, 0]}
      >
        <sphereGeometry args={[300,300,300]} />
        <meshStandardMaterial map={colorMap} />
     
      </mesh>
        
      <Box position={[100, -400, 100]} color={'purple'} />
      <Box position={[200, -100, 100]} color={'green'} />
      <Box position={[0, -400, -200]} color={'red'} />
      {/* <Box position={[-100, 100, 0]} color={'yellow'} />
      <Box position={[100, -100, 0]}  color={'black'}/>
      <Box position={[-100, -100, 0]}  color={'brown'}/> */}
      </>
  )
}

export default Scene2;
