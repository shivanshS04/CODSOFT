import { create } from "zustand";
import { persist } from "zustand/middleware";

const useJobStore = create(
  persist(
    (set) => ({
      jobs: [],
      refetch: false,
      setRefetch: () => {
        set((state) => ({
          refetch: !state.refetch,
        }));
      },
      setJobs: (jobList) => {
        set((state) => ({
          jobs: jobList,
        }));
      },
      addJob: (jobDetail) => {
        set((state) => ({
          refetch: !state.refetch,
        }));
      },
      removeJob: (jobId) => {
        set((state) => ({
          refetch: !state.refetch,
        }));
      },
    }),
    {
      name: "job_store",
    }
  )
);

export default useJobStore;
