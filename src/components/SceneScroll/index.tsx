import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll, CameraControls, useScroll } from '@react-three/drei'
import { Mesh } from 'three';
import { Skybox } from '../../App';

interface Props {
    url: string,
    scale: number[],
    props: any
}

function Box({scale, ...props}:any) {
    const mesh = useRef<Mesh  | undefined >(undefined);
    const [active, setActive] = useState(false)
    
    useFrame(() => {
        mesh.current!.rotation.y += 0.01;
        mesh.current!.rotation.x += 0.01;



      });
    
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={active ? 'hotpink' : 'green'} />
      </mesh>
    )
  }

function Items() {
    const { width: w, height: h } = useThree((state) => state.viewport)
    const {offset} = useScroll()
    

    return (
      <Scroll>
        
        <Box  position={[-w / 6, 0, 0]} />
        <Box position={[w / 30, -h, 0]} />
        <Box position={[-w / 4, -h * 1, 0]} />
        <Box  position={[w / 4, -h * 1.2, 0]} />
        <Box  position={[w / 10, -h * 1.75, 0]} />
        <Box position={[-w / 4, -h * 2, 0]} />
        <Box  position={[-w / 4, -h * 2.6, 0]} />
        <Box position={[w / 4, -h * 3.1, 0]} />
        <Box  position={[-w / 6, -h * 4.1, 0]} />
      </Scroll>
    )
  }
const SceneScroll = () => {
    const cameraControlRef = useRef<CameraControls | null>(null);

    return <Canvas orthographic camera={{ zoom: 80 }} gl={{ alpha: false, antialias: false, stencil: false, depth: false }} dpr={[1, 1.5]}>
    <color attach="background" args={['#f0f0f0']} />
    <ambientLight />
    <directionalLight color="green" position={[0, 3,3]} intensity={1} />
    
    <ScrollControls  pages={5}>

      <Items />
    </ScrollControls>
    
  </Canvas>
}

export default SceneScroll;
