"use client"

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';


export default function Shapes(){
    return (
        <div className='row-span-1, row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0'>
            <Canvas className='z-0' shadows gl={{antialias:false}} dpr={[1, 1.5]} camera={{position: [0, 0, 25],
                fov: 30, near:1, far: 40}}>
                <Suspense fallback={null}>
                    <Geometries/>
                    <ContactShadows
                    position={[0, -3.5, 0]}
                    opacity={0.65}
                    scale={40}
                    blur={1}
                    for={9}/>
                </Suspense>
                <Environment preset='sunset'/>
            </Canvas>
        </div>
    )
}

function Geometries() {
    const geometries = [
        {
            position: [0,0,0],
            r: 0.3,
            geometry: new THREE.IcosahedronGeometry(3) //Gem
        },
        {
            position: [1, -0.75, 4],
            r: 0.4,
            geometry: new THREE.CapsuleGeometry(0.6, 1.6, 16) //Pill
        },
        {
            position: [-1.4, 2, -4],
            r: 0.6,
            geometry: new THREE.DodecahedronGeometry(1.5) //Ball
        },
        {
            position: [-0.8, -0.75, 5],
            r: 0.5,
            geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32) // Donut
        },
        {
            position: [1.6, 1.6, -4],
            r: 0.7,
            geometry: new THREE.OctahedronGeometry(3) //Diamond
        }
    ]

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color:0x2ecc71, roughness:0 }),
        new THREE.MeshStandardMaterial({ color:0x023047, roughness:0.1}),
        new THREE.MeshStandardMaterial({ color:0x219ebc, roughness:2 }),
        new THREE.MeshStandardMaterial({ color:0xfb6f92, roughness:2 }),
        new THREE.MeshStandardMaterial({ color:0x57cc99, roughness:0.1, metalness:0.5}),
        new THREE.MeshStandardMaterial({ color:0xe36414, roughness:2 }),
    ]

    const soundEffects = [
        new Audio("/sounds/interact1.ogg"),
        new Audio("/sounds/interact2.ogg"),
        new Audio("/sounds/interact3.ogg"),
        new Audio("/sounds/interact4.ogg"),
    ]

   return geometries.map(({position, r, geometry})=> (
        <Geometry
        key={JSON.stringify(position)}
        position={position.map((p)=>p*2)}
        geometry={geometry}
        materials={materials}
        soundEffects={soundEffects}
        r={r}
        />
   ))
}

function Geometry({r, position, geometry, materials, soundEffects}){
    const meshRef = useRef()
    const [visible, setVisible] = useState(false)
    const startingMaterial = getRandomMaterial()

    function getRandomMaterial(){
        return gsap.utils.random(materials)
    }

    function handleClick(e){
        const mesh = e.object

        gsap.utils.random(soundEffects).play()

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0,2)}`,
            y: `+=${gsap.utils.random(0,2)}`,
            z: `+=${gsap.utils.random(0,2)}`,
            duration: 1.3,
            ease: 'elastic.out(1, 0.3)',
            yoyo: true
        })

        mesh.material = getRandomMaterial()
    }

    const handlePointerOver = () =>{
        document.body.style.cursor = "pointer"
    };
    const handlePointerOut = () =>{
        document.body.style.cursor = "default"
    };

    useEffect(() => {
    let ctx = gsap.context(()=>{
            setVisible(true)
            gsap.from(meshRef.current.scale,
                {
                    x:0,
                    y:0,
                    z:0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)",
                    delay: 0.3
                })
        })
        return () => ctx.revert();
    }, [])

    return(
        <group position={position} ref={meshRef}>
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                <mesh
                geometry={geometry}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                visible={visible}
                material={startingMaterial}
                />
            </Float>
        </group>
    )
}