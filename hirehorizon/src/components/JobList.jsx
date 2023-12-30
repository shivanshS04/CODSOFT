"use client"
import { getJobs } from "@/appwrite"
import { Suspense, useEffect, useState } from "react"
import JobCard from "./JobCard"
import { Skeleton } from "./ui/skeleton"
import useJobStore from "@/zustand/jobStore"
export default function JobList() {
    // const [loaded, setLoaded] = useState(false)
    const jobs = useJobStore(state => state.jobs)
    const refetch = useJobStore(state => state.refetch)
    const setJobs = useJobStore(state => state.setJobs)
    const fetchJobs = async () => {
        const fetchedJobs = await getJobs();
        if (fetchedJobs)
            setJobs(fetchedJobs)
    }
    useEffect(() => {
        fetchJobs()
    }, [refetch])
    return (
        <div className="flex flex-col items-center">
            {jobs.length == 0 ? <Loading /> :
                <div className="w-full flex flex-col items-center">
                    {
                        jobs.map((data, index) => (
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