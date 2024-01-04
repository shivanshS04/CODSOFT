'use client'

import { getJobDetails } from "@/appwrite";
import ApplyBtn from "@/components/ApplyBtn";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const jobId = useParams();
    const [jobData, setJobData] = useState({});
    const fetchJobDetails = async () => {
        const data = await getJobDetails(jobId.id);
        if (data.success) {
            setJobData(data.res)
        }
        else {
            alert("Invalid Job URL !");
        }
    }
    useEffect(
        () => {
            fetchJobDetails()
        }, []
    )
    return (
        <div>

            <div className="w-full h-32 bg-gradient-to-r from-blue-300 to-blue-900 dark:bg-gradient-to-r dark:from-amber-700 dark:to-zinc-950"></div>
            <div className="mt-5 p-4 flex flex-col mr-10 ml-10">
                {
                    Object.keys(jobData).length == 0 ? <Loading /> :
                        <>

                            <h1 className="scroll-m-20 border-b text-xl font-bold tracking-tight lg:text-4xl">{jobData.job_title}</h1>
                            <div className="mt-6">
                                <h3 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">Highlights :</h3>
                                <p className="text-zinc-500 font-semibold">Company : {jobData.company}</p>
                                <p className="text-zinc-500 font-semibold">Expected Salary : Rs.{jobData.expected_salary}/- per annum</p>
                                <p className="text-zinc-500 font-semibold">Applicants : {jobData.applicants.length}</p>
                            </div>
                            <div className="mt-6">
                                <h3 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">Description :</h3>
                                <p className="text-zinc-500 font-semibold w-10/12 md:w-4/6">{jobData.description}</p>

                            </div>
                            <div className="w-full flex justify-around">
                                <ApplyBtn className="mt-10 drop-shadow-lg" jobData={jobData} />
                            </div>
                        </>
                }
            </div>
        </div >
    )
}

function Loading() {
    return <>
        <Skeleton className="w-full h-12"></Skeleton>
        <Skeleton className="mt-6 w-3/5 h-10">
        </Skeleton>
        <Skeleton className="mt-6 w-4/6 h-10 mb-6"></Skeleton>
        <Skeleton className=" m-auto w-2/4 flex justify-around h-16"></Skeleton>
    </>;
}