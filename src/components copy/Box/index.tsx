import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

const Box = (props: any) => {
    const mesh = useRef<Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // useFrame((_, delta) => {
    //     mesh.current.rotation.x += 1 * delta
    //     mesh.current.rotation.y += 0.5 * delta
    // })

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[100, 100, 100]} />
            <meshStandardMaterial color={hovered ? ('orange') : (props?.color||'green')} />
        </mesh>
    )
}
export default Box
