"use client";
import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const MIN_ZOOM = 8;

export function CameraController() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / size.height;
      const sphereRadius = 4;
      const fov = camera.fov * (Math.PI / 180);
      const distance = aspect < 1 
        ? (sphereRadius * 2) / Math.tan(fov / 2) // Portrait
        : sphereRadius / Math.tan(fov / 2); // Landscape
      
      camera.position.z = Math.max(distance, MIN_ZOOM);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);

  return null;
} 