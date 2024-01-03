import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useFilterStore = create(
  devtools(
    persist(
      (set) => ({
        filterTitle: "",
        filterState: null,
        setFilterState: (selectedState) => {
          set((state) => ({
            filterState: selectedState,
          }));
        },
        setFilterTitle: (search) => {
          set((state) => ({
            filterTitle: search,
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
