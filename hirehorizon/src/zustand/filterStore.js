import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useFilterStore = create(
  devtools(
    persist(
      (set) => ({
        filterState: null,
        setFilterState: (selectedState) => {
          set((state) => ({
            filterState: selectedState,
          }));
        },
      }),
      {
        name: "hirehorizons_filters_store",
      }
    )
  )
);

export default useFilterStore;
