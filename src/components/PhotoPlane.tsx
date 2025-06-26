"use client";

import { useMemo, useRef, useLayoutEffect, useEffect, useState } from "react";
import * as THREE from "three";

const SPHERE_RADIUS = 4;
const PLANE_WIDTH = 1.2;
const PLANE_HEIGHT = 1.2;
const PLANE_SEGMENTS = 32;
const BOUNDING_BOX = 1.2;

export function PhotoPlane({ position, texture }: { position: THREE.Vector3; texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (texture.image && texture.image.width && texture.image.height) {
      const imgW = texture.image.width;
      const imgH = texture.image.height;
      let width = BOUNDING_BOX;
      let height = BOUNDING_BOX;
      if (imgW > imgH) {
        height = (imgH / imgW) * BOUNDING_BOX;
      } else {
        width = (imgW / imgH) * BOUNDING_BOX;
      }
      setDimensions({ width, height });
    }
  }, [texture]);

  const geometry = useMemo(() => {
    if (!dimensions) return null;
    // Center the plane at (0,0,0) for correct bending
    const geom = new THREE.PlaneGeometry(
      dimensions.width,
      dimensions.height,
      PLANE_SEGMENTS,
      PLANE_SEGMENTS
    );
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Bend relative to the center of the plane
      const rSquared = x * x + y * y;
      if (rSquared < SPHERE_RADIUS * SPHERE_RADIUS) {
        const z = SPHERE_RADIUS - Math.sqrt(SPHERE_RADIUS * SPHERE_RADIUS - rSquared);
        pos.setZ(i, z);
      }
    }
    geom.computeVertexNormals();
    pos.needsUpdate = true;
    return geom;
  }, [dimensions]);

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 0, 0);
    }
  }, [geometry]);

  if (!geometry) return null;
  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
} 