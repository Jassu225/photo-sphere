import { create } from "zustand";

interface StoreState {
  photos: string[];
  setPhotos: (photos: string[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  photos: [],
  setPhotos: (photos) => set({ photos }),
})); 