import { Image } from "@/types/ImageProp";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ImageStore = {
  images: Image[];
  addImage: (image: Omit<Image, "id">) => void; // 'id' is auto-generated
  removeImage: (imageId: string) => void;
  updateImage: (imageId: string, imageObj: Partial<Image>) => void;
};

// Define the store creator with proper typing for Zustand middleware
const imageStore = create<ImageStore>()(
  devtools(
    persist(
      (set) => ({
        images: [],
        addImage: (image) => {
          const newImage: Image = { ...image, id: Date.now().toString() };
          set(
            (state) => ({
              images: [newImage, ...state.images],
            }),
            false,
            "addImage" // Action name for devtools
          );
        },
        removeImage: (imageId) => {
          set(
            (state) => ({
              images: state.images.filter((img) => img.id !== imageId), // Fixed: 'courses' → 'images'
            }),
            false,
            "removeImage" // Action name for devtools
          );
        },
        updateImage: (imageId, imageObj) => {
          set(
            (state) => ({
              images: state.images.map((img) =>
                img.id === imageId ? { ...img, ...imageObj } : img
              ),
            }),
            false,
            "updateImage" // Action name for devtools
          );
        },
      }),
      {
        name: "images", // Key for localStorage
      }
    )
  )
);

export default imageStore;