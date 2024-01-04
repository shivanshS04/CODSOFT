"use client"
import { getJobs } from "@/appwrite"
import { Suspense, useEffect, useState } from "react"
import JobCard from "./JobCard"
import { Skeleton } from "./ui/skeleton"
import useJobStore from "@/zustand/jobStore"
import useAuthStore from "@/zustand/authStore"
import useFilterStore from "@/zustand/filterStore"
export default function JobList() {
    const [isClient, setIsClient] = useState(false)
    const filterState = useFilterStore(state => state.filterState);
    const filterTitle = useFilterStore(state => state.filterTitle);
    const user = useAuthStore(state => state.user);
    const jobs = useJobStore(state => state.jobs)
    const refetch = useJobStore(state => state.refetch)
    const setJobs = useJobStore(state => state.setJobs)
    const fetchJobs = async () => {
        const fetchedJobs = await getJobs();
        if (fetchedJobs)
            setJobs(fetchedJobs)
    }
    useEffect(() => {
        setIsClient(true)
        fetchJobs()
    }, [refetch])
    return (
        <div className="flex flex-col items-center">
            {isClient && jobs.length == 0 ? <Loading /> :
                <div className="w-full flex flex-col items-center">
                    {isClient &&
                        jobs
                            .filter((item) => item.owner != user?.email)
                            .filter((item) => item.job_title.toLowerCase().includes(filterTitle))
                            .filter((item) => (filterState && item.location == filterState) || !filterState)
                            .map((data, index) => (
                                <JobCard data={data} key={index} />
                            ))
                    }
                </div>
            }
        </div>
    )
}
function Loading() {
    return <Skeleton className="h-24 w-2/3 rounded-lg" />;
}