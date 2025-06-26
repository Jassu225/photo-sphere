"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store";
import { PhotoPlane } from "./PhotoPlane";

const MIN_PHOTOS = 30;

export function PhotoSphereGroup() {
  const { photos } = useStore();
  const groupRef = useRef<THREE.Group>(null);

  // Replicate photos if there are not enough to fill the sphere
  let displayPhotos = [...photos];
  if (photos.length > 0 && photos.length < MIN_PHOTOS) {
    const repeats = Math.ceil(MIN_PHOTOS / photos.length);
    displayPhotos = Array(repeats).fill(photos).flat().slice(0, MIN_PHOTOS);
  }

  const textures = useTexture(displayPhotos);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, i) => {
        const phi = Math.acos(-1 + (2 * i) / displayPhotos.length);
        const theta = Math.sqrt(displayPhotos.length * Math.PI) * phi;
        const position = new THREE.Vector3().setFromSphericalCoords(4, phi, theta);
        
        return (
          <PhotoPlane key={i} position={position} texture={texture} />
        );
      })}
    </group>
  );
} 