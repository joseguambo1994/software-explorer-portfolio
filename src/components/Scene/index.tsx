import { useLoader, useThree } from '@react-three/fiber';
import Box from '../Box';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls, useCubeTexture} from '@react-three/drei';


const Scene = () => {
  const { scene } = useThree();


  const colorMap = useLoader(TextureLoader,'galaxy.jpg' )

   


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
    
      <ambientLight intensity={0.25} />
      <directionalLight color="red" position={[0, 0, 5]} />

     
      <mesh
      
      position={[200, 400, 200]}
      >
        <sphereGeometry args={[100,100,100]} />
        <meshStandardMaterial map={colorMap} />
     
      </mesh>
        

      {/* <Box position={[-100, 100, 0]} color={'yellow'} />
      <Box position={[100, -100, 0]}  color={'black'}/>
      <Box position={[-100, -100, 0]}  color={'brown'}/> */}
      </>
  )
}

export default Scene;
