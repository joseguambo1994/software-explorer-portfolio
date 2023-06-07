
import { OrbitControls, CameraControls} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Skybox } from "../../App";
import Particles from "../particle";
import { RobotAnimated } from "../robotAnimated";
import PersonalData from "../personalData";
import { Vector3 } from "three";
import { useRef, useState } from "react";


const PersonalDataScene =()=> {
  const camera = useThree((state) => state.camera)

  const tempVector3: Vector3 = new Vector3 (10,10,10)
  const deg2rad = (degrees:number) => degrees * (Math.PI / 180);
	const cameraControlRef = useRef<CameraControls | null>(null);
  const DEG45 = Math.PI / 6;
   return (
   
       
    <>
     <ambientLight intensity={0.5} />
     <CameraControls ref={cameraControlRef} />
        <directionalLight position={[-2.5, 4, 5]} />
        <Skybox />
        <Particles />
        <RobotAnimated  />
        <PersonalData position={[2, 2, 2]} onPress={()=> {
         cameraControlRef.current?.rotateTo(deg2rad(20)
         , deg2rad(60), true)
        }} />
        <OrbitControls
        />
    </>
  
  
     
  )
}

export default PersonalDataScene