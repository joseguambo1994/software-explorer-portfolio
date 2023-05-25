import { useCubeTexture } from "@react-three/drei";
import { useLoader, useThree , } from "@react-three/fiber"
import React from "react"
import { CubeTextureLoader } from "three"
export default function CubeMap() {
  const { scene } = useThree()
  const envMap = useCubeTexture(
    [
      "galaxy.jpg",
      "galaxy.jpg",
      "galaxy.jpg",
      "galaxy.jpg",
      "galaxy.jpg",
      "galaxy.jpg",
    ],
    { path: "background/" }
  );
  scene.background = envMap
  return <React.Fragment>{null}</React.Fragment>
}