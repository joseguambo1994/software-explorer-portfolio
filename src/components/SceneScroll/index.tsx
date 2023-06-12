import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll, CameraControls, useScroll, Text, Edges, MeshTransmissionMaterial } from '@react-three/drei'
import  { Mesh, MeshPhongMaterial, MeshStandardMaterial, Vector3} from 'three';
import { Skybox } from '../../App';
import Lights from '../Lights';

interface VectorProps {
    x: number,
    y: number,
    z: number
  }
interface Props {
    url: string,
    scale: number[],
    props: any
}

function Box({color, scale, ...props}:any) {
    const mesh = useRef<Mesh  | undefined >(undefined);
    const [active, setActive] = useState(false)
    
    useFrame(() => {
    //    mesh.current!.rotation.y += 0.01;
        mesh.current!.rotation.x += 0.01;
        mesh.current!.rotation.z -= 0.01;



      });
    
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}>
        <icosahedronGeometry args={[1, 1]} />
        <meshLambertMaterial color={active ? 'hotpink' : color} />
      <Edges  scale={1.1} renderOrder={1000}>
        <meshBasicMaterial color="#333" depthTest={false} />
      </Edges>
      </mesh>
    )
  }

  interface CameraProps {
    isZoom:boolean,
    currentPage:number,
  }

  interface LightProps {
    color:string,
    brightness:number,
    position:VectorProps
  }
  
function KeyLight({ position, brightness, color }: LightProps) {
    return (
      <rectAreaLight
        width={3}
        height={3}
        color={color}
        intensity={brightness}
        position={[position.x +-1, position.y, position.z]}

        castShadow
      />
    );
  }
  function FillLight({ position, brightness, color }: LightProps) {
    return (
      <rectAreaLight
        width={3}
        height={3}
        intensity={brightness}
        color={color}
        position={[position.x, position.y, position.z*-1]}
        castShadow
      />
    );
  }
  
  function RimLight({position, brightness, color }: LightProps) {
    return (
      <rectAreaLight
        width={2}
        height={2}
        intensity={brightness}
        color={color}
        position={[position.x, position.y, position.z]}
        rotation={[0, 180, 0]}
        castShadow
      />
    );
  }


  const CameraDolly = ({isZoom, currentPage}: CameraProps ) => {

    const handlePageChange = (page: number): VectorProps => {
        switch (page) {
            case 1:
              return {
                x: 0,
                y: -10,
                z: -10
              }
            case 2:
                return {
                    x: 10,
                    y: -10,
                    z: 10
                  }
            case 3:
                return {
                    x: -8,
                    y: 0,
                    z: 0
                  }
            default:
                return {
                    x: 0,
                    y: -10,
                    z: -10
                  }
          }
    }
    const vec = new Vector3()
    useFrame((state) => {
      const step = 0.1
    //   const x = isZoom ? 0 : 5
    //   const y = isZoom ? -10 : 5
    //   const z = isZoom ? -10 : 5
        const tempVec = handlePageChange(currentPage);
      state.camera.position.lerp(vec.set(tempVec.x,tempVec.y,tempVec.z), step)
      state.camera.lookAt(0, 0, 0)
      state.camera.updateProjectionMatrix()
    })
  
    return null
  }
  
interface ItemProps {
    onPress: () => void,
    onPageChange: (currentPage: number) => void
}


const Items =(
{onPress}: ItemProps) => {
    const { width: w, height: h } = useThree((state) => state.viewport)

    const [currentPage, setCurrentPage] = useState<1|2|3>(1)
    const deg2rad = (degrees:number) => degrees * (Math.PI / 180);
    const controls = useThree((state) => state.controls)
    const { camera } = useThree();


    const data = useScroll()
  useFrame((state, delta) => {
    // data.offset = current scroll position, between 0 and 1, dampened
    // data.delta = current delta, between 0 and 1, dampened

    // Will be 0 when the scrollbar is at the starting position,
    // then increase to 1 until 1 / 3 of the scroll distance is reached
    const a = data.range(0, 1 / 3)
    // Will start increasing when 1 / 3 of the scroll distance is reached,
    // and reach 1 when it reaches 2 / 3rds.
    const b = data.range(1 / 3, 1 / 3)
    const yAxis = new Vector3(0, 1, 0);
    const xAxis = new Vector3(1, 0, 0);
    if (a < 1) {
        setCurrentPage(1)
    }
    if (a === 1) {
        setCurrentPage(2)
    }
    if (b === 1) {
       
        setCurrentPage(3)
    }
  })

  useEffect(()=>{
    const vec = new Vector3();
    camera.position.lerp(vec.set(2*currentPage,1*currentPage,0*currentPage), 20)
  }, [currentPage])
    return (
      <Scroll>
       
        <Text
        onClick={()=> onPress()}
        scale={[h/12, h/12, h/12]}
        color="black" // default
        anchorX="center" // default
      //  anchorY="middle" // default
        position={[0, 0, 0]}
      >
        Resume
      </Text>
      <Text
        scale={[h/18, h/18, h/18]}
        color="purple" // default
        anchorX="center" // default
        position={[-w / 10, h/12 , 0]}
      >
        Jose Guambo
      </Text>
        <Box color={'red'} position={[-w / 6, -h, 0]} />
        <Box color={'red'} position={[w / 30, -h, 0]} />
        <Box color={'red'} position={[-w / 4, -h * 1, 0]} />
        <Box color={'green'}  position={[w / 4, -h * 1.2, 0]} />
        <Box color={'green'}  position={[w / 10, -h * 1.75, 0]} />
        <Box color={'green'} position={[-w / 4, -h * 2, 0]} />
        <Box color={'purple'}  position={[-w / 4, -h * 2.6, 0]} />
        <Box color={'purple'} position={[w / 4, -h * 3.1, 0]} />
        <Box color={'purple'}  position={[-w / 6, -h * 4.1, 0]} />
     
      </Scroll>
    )
  }


const SceneScroll = () => {
    const [isZoom, setIsZoom] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [color, setColor] = useState('purple');

    const handleLightColor = (page:number):string =>{
        switch (page) {
            case 1:
              return 'red'
            case 2:
                return 'blue'
            case 3:
                return 'green'
            default:
               return 'orange'
          }
    }
    

    const handleCameraPosition = (page:number):VectorProps =>{
        switch (page) {
            case 1:
              return {
                x:10,
                y:10,
                z:10,
              }
            case 2:
                return {
                    x:-20,
                    y: 10,
                    z:-20,
                  }
            case 3:
                return {
                    x:2,
                    y:-2,
                    z:2,
                  }
            default:
                return {
                    x:10,
                    y:10,
                    z:10,
                  }
          }
    }

    const position = handleCameraPosition(currentPage)
    const cameraControlRef = useRef<CameraControls | null>(null);
    const DEG45 = Math.PI / 2;


    return <Canvas orthographic camera={{ zoom: 80,
            near: 0.01,
            far: 10000,
        
    }} gl={{ alpha: false, antialias: false, stencil: false, depth: false }} dpr={[1, 1.5]}>
        				{/* <CameraControls ref={cameraControlRef} /> */}

    <color attach="background" args={['pink']} />
    {/* <Lights /> */}
    <ambientLight intensity={0.2} />


    
    <directionalLight position={[position.x, position.y, position.z]} color={handleLightColor(currentPage)}/>
    <KeyLight position={position}  brightness={5.6} color={"red"} />
        <FillLight  position={position}  brightness={2.6} color={"blue"} />
        <RimLight position={position}  brightness={54} color={"green"} />
    <ScrollControls pages={5}>

      <Items onPress={()=>{setIsZoom(!isZoom)}}
        onPageChange={(current)=> setCurrentPage(current)}
      />
    </ScrollControls>
    <CameraDolly isZoom={isZoom} currentPage={currentPage}/>
  </Canvas>
}

export default SceneScroll;
