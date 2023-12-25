import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (userDetails) => {
          set((state) => ({
            user: userDetails,
          }));
        },
        removeUser: () => {
          set((state) => ({
            user: null,
          }));
        },
      }),
      {
        name: "hirehorizons_store",
      }
    )
  )
);

export default useAuthStore;
