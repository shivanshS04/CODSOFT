'use client'

import { getUserRecord } from "@/appwrite";
import ApplicantCard from "@/components/ApplicantCard";
import { Skeleton } from "@/components/ui/skeleton";
import useJobStore from "@/zustand/jobStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const jobs = useJobStore(state => state.jobs);
    const jobDetails = jobs.filter(item => item.$id == params.id)[0].applicants;
    const [applicants, setApplicants] = useState([])
    const fetchApplicantDetails = async () => {
        jobDetails.forEach(async (item) => {
            const user = await getUserRecord(item);
            setApplicants([...applicants, user.res])
        })
    }

    useEffect(() => {
        fetchApplicantDetails();
    }, [])

    return (
        <div>

            <div className="w-full h-32 bg-gradient-to-r from-blue-300 to-blue-900 dark:bg-gradient-to-r dark:from-amber-700 dark:to-zinc-950"></div>
            <div className="mt-5 p-4 flex flex-col items-center mr-10 ml-10">
                {
                    jobDetails ?
                        <>

                            <h1 className="scroll-m-20 border-b text-xl font-bold tracking-tight lg:text-4xl mb-6">Applicants : {applicants.length}</h1>
                            {
                                applicants.map((item, index) => (
                                    <ApplicantCard key={index} data={item} />
                                ))
                            }
                        </> :
                        <Loading />
                }
            </div>
        </div >
    )
}

function Loading() {
    return <>
        <Skeleton className="w-full h-12"></Skeleton>
        <Skeleton className="mt-6 w-3/5 h-10"></Skeleton>
        <Skeleton className="mt-6 w-4/6 h-10"></Skeleton>
        <Skeleton className="mt-6 w-3/5 h-10"></Skeleton>

    </>;
}