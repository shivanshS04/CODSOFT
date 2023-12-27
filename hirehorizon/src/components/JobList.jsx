"use client"
import { getJobs } from "@/appwrite"
import { Suspense, useEffect, useState } from "react"
import JobCard from "./JobCard"
export default function JobList() {
    const [jobs, setJobs] = useState([])
    const fetchJobs = async () => {
        const fetchedJobs = await getJobs();
        setJobs(fetchedJobs)
    }
    useEffect(() => {
        fetchJobs()
    }, [])
    return (
        <div className="flex flex-col items-center">
            <Suspense fallback={<Loading />}>
                {
                    jobs.map((data, index) => (
                        <JobCard data={data} key={index} />
                    ))
                }
            </Suspense>
        </div>
    )
}
function Loading() {
    return <h2>🌀 Loading...</h2>;
}