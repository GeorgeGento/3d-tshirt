import { easing } from "maath"
import { useSnapshot } from "valtio"
import { useFrame } from "@react-three/fiber"
import { Decal, useGLTF, useTexture } from "@react-three/drei"

import state from "@/store"

const Shirt = () => {
    const snap = useSnapshot(state);
    //@ts-ignore
    const { nodes, materials } = useGLTF("/shirt_baked.glb");
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    //@ts-ignore
    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, .25, delta));
    const stateString = JSON.stringify(snap);

    return (
        <group key={stateString}>
            <mesh
                castShadow dispose={null}
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
            >
                {snap.isLogoTexture && (
                    <Decal
                        position={[0, .04, .15]}
                        rotation={[0, 0, 0]}
                        scale={.15}
                        map={logoTexture}
                    />
                )}

                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}
            </mesh>
        </group>
    )
}

export default Shirt