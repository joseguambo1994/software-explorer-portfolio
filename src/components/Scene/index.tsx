import { useLoader } from '@react-three/fiber';
import Box from '../Box';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import galaxyImage from '../../galaxy.jpg'


const Scene = () => {

    const colorMap = useLoader(TextureLoader, galaxyImage)


  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight intensity={1} position={[1000, 1000, 1000]} />
     
      <mesh
      
      position={[0, 400, 0]}
      >
        <sphereGeometry args={[100,100,100]} />
        <meshStandardMaterial map={colorMap} />
     
      </mesh>
        
      <Box position={[0, 0, 0]} color={'blue'} />
      <Box position={[200, 0, 0]} color={'red'} />
      <Box position={[0, 200, 0]} color={'green'} />
      <Box position={[0, 0, 200]} color={'yellow'} />
      <Box position={[200, 0, 200]} color={'gray'} />
      <Box position={[0, 200, 200]} color={'orange'} />
      {/* <Box position={[-100, 100, 0]} color={'yellow'} />
      <Box position={[100, -100, 0]}  color={'black'}/>
      <Box position={[-100, -100, 0]}  color={'brown'}/> */}
      </>
  )
}

export default Scene;
