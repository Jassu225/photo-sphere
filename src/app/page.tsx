"use client";
import { useRef } from "react";
import { useStore } from "@/store";
import PhotoSphere from "@/components/PhotoSphere";

export default function Home() {
  const { photos, setPhotos } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFiles = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
      const newPhotoUrls = imageFiles.map(file => URL.createObjectURL(file));
      setPhotos(newPhotoUrls);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (photos.length > 0) {
    return <PhotoSphere />;
  }

  return (
    <div className="dark bg-dark-bg text-dark-on-surface min-h-screen flex flex-col">
      <header className="py-8 px-6 text-center">
        <h1 className="text-4xl font-bold text-dark-primary">Photo Sphere</h1>
        <p className="mt-2 text-lg text-dark-on-surface/80">Turn your memories into a mesmerizing 3D globe, right in your browser.</p>
      </header>
      <main className="flex-grow px-6 py-8">
        <div className="text-center mb-12">
          <button
            className="bg-dark-primary hover:bg-dark-primary/90 text-dark-bg font-medium py-3 px-6 rounded-lg inline-flex items-center shadow-md transition-colors"
            onClick={handleButtonClick}
          >
            <span className="material-icons mr-2">collections</span>
            Select Photos
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-dark-on-surface">Why You'll Love It</h2>
          <div className="space-y-10">
            <div className="flex flex-col items-center text-center p-6 bg-dark-surface rounded-xl shadow-lg">
              <span className="material-icons text-4xl text-dark-secondary mb-4">3d_rotation</span>
              <h3 className="text-xl font-medium mb-2 text-dark-on-surface">Interactive 3D</h3>
              <p className="text-dark-on-surface/70">Pan, zoom, and rotate your photo sphere with intuitive controls.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-dark-surface rounded-xl shadow-lg">
              <span className="material-icons text-4xl text-dark-secondary mb-4">lock</span>
              <h3 className="text-xl font-medium mb-2 text-dark-on-surface">Local & Private</h3>
              <p className="text-dark-on-surface/70">Your photos are processed on your device and are never uploaded.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-dark-surface rounded-xl shadow-lg">
              <span className="material-icons text-4xl text-dark-secondary mb-4">devices</span>
              <h3 className="text-xl font-medium mb-2 text-dark-on-surface">Fully Responsive</h3>
              <p className="text-dark-on-surface/70">Enjoy the same beautiful experience on any screen size.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 px-6 text-center border-t border-dark-surface/50">
        <div className="flex items-center justify-center space-x-2 text-dark-on-surface/70">
          <div className="w-8 h-8 bg-dark-primary rounded-full flex items-center justify-center text-dark-bg font-semibold text-sm">N</div>
          <span>Created with</span>
          <span className="material-icons text-red-500 text-xl">favorite</span>
          <span>by Gemini</span>
        </div>
      </footer>
    </div>
  );
}
