"use client"
import { getJobs } from "@/appwrite"
import { Suspense, useEffect, useState } from "react"
import JobCard from "./JobCard"
import { Skeleton } from "./ui/skeleton"
export default function JobList() {
    const [jobs, setJobs] = useState([])
    const fetchJobs = async () => {
        const fetchedJobs = await getJobs();
        if (fetchedJobs)
            setJobs(fetchedJobs)
    }
    useEffect(() => {
        fetchJobs()
    }, [])
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