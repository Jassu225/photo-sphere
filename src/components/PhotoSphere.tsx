"use client";
import { useRef, useState, ChangeEvent, PointerEvent } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useStore } from "@/store";
import { CameraController } from "./CameraController";
import { PhotoSphereGroup } from "./PhotoSphereGroup";
import { ZoomSlider } from "./ZoomSlider";
import { Vector3 } from "three";

const MIN_DISTANCE = 4;
const MAX_DISTANCE = 20;

export default function PhotoSphere() {
  const { photos, setPhotos } = useStore();
  const [zoom, setZoom] = useState((MAX_DISTANCE + MIN_DISTANCE) - 12);
  const controlsRef = useRef<any>(null);
  const isDraggingSlider = useRef(false);

  const handleBack = () => {
    photos.forEach(URL.revokeObjectURL);
    setPhotos([]);
  };

  const handleZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sliderValue = parseFloat(event.target.value);
    setZoom(sliderValue);

    if (controlsRef.current) {
      const newDistance = (MAX_DISTANCE + MIN_DISTANCE) - sliderValue;
      const currentPosition = controlsRef.current.object.position;
      const newPosition = new Vector3().copy(currentPosition).setLength(newDistance);
      controlsRef.current.object.position.copy(newPosition);
      controlsRef.current.update();
    }
  };

  const handleSliderPointerDown = (e: PointerEvent<HTMLInputElement>) => {
    isDraggingSlider.current = true;
  };
  
  const handleSliderPointerUp = (e: PointerEvent<HTMLInputElement>) => {
    isDraggingSlider.current = false;
  };

  const handleControlsChange = () => {
    if (controlsRef.current && !isDraggingSlider.current) {
      const distance = controlsRef.current.getDistance();
      const newSliderValue = (MAX_DISTANCE + MIN_DISTANCE) - distance;
      setZoom(newSliderValue);
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* App Bar */}
      <header className="fixed top-0 left-0 w-full z-30 bg-[#1E1E1E] flex items-center h-16 px-4 shadow-md">
        <button
          onClick={handleBack}
          className="flex items-center text-white text-2xl mr-2 focus:outline-none"
          aria-label="Back"
        >
          <span className="material-icons text-3xl">arrow_back</span>
        </button>
        <h1 className="text-white text-xl font-bold ml-1">Memories</h1>
      </header>

      {/* Sphere Canvas */}
      <main className="py-16 w-full h-full">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full max-w-2xl aspect-square mx-auto">
            <Canvas camera={{ fov: 75, position: [0, 0, 12] }} className="w-full h-full">
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} />
              {photos.length > 0 ? (
                <>
                  <PhotoSphereGroup />
                  <OrbitControls 
                    ref={controlsRef} 
                    enablePan={false} 
                    minDistance={MIN_DISTANCE} 
                    maxDistance={MAX_DISTANCE} 
                    onChange={handleControlsChange}
                    zoomSpeed={0.5}
                  />
                </>
              ) : (
                <Text position={[0, 0, 0]} fontSize={0.3} color="black" anchorX="center" anchorY="middle">
                  Select photos to render the sphere
                </Text>
              )}
            </Canvas>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-30 bg-[#232323] rounded-t-2xl shadow-2xl px-6 py-4 flex items-center justify-center">
        <ZoomSlider 
          min={MIN_DISTANCE} 
          max={MAX_DISTANCE} 
          step={0.1} 
          value={zoom} 
          onChange={handleZoomChange} 
          onPointerDown={handleSliderPointerDown}
          onPointerUp={handleSliderPointerUp}
        />
      </footer>
    </div>
  );
} 