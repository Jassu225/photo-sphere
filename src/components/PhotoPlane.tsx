"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import * as THREE from "three";

const SPHERE_RADIUS = 4;
const PLANE_WIDTH = 1.2;
const PLANE_HEIGHT = 1.2;
const PLANE_SEGMENTS = 32;

export function PhotoPlane({ position, texture }: { position: THREE.Vector3; texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(
      PLANE_WIDTH,
      PLANE_HEIGHT,
      PLANE_SEGMENTS,
      PLANE_SEGMENTS
    );
    const pos = geom.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      const rSquared = x * x + y * y;
      if (rSquared < SPHERE_RADIUS * SPHERE_RADIUS) {
          const z = SPHERE_RADIUS - Math.sqrt(SPHERE_RADIUS * SPHERE_RADIUS - rSquared);
          pos.setZ(i, z);
      }
    }
    
    geom.computeVertexNormals();
    pos.needsUpdate = true;
    
    return geom;
  }, []);

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
} 