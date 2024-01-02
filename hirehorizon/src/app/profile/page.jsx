"use client"

import JobCard from "@/components/JobCard";
import LoginBtn from "@/components/LoginBtn";
import useAuthStore from "@/zustand/authStore"
import useJobStore from "@/zustand/jobStore";

export default function Profile() {
    const user = useAuthStore(state => state.user);
    const jobData = useJobStore(state => state.jobs)
    return (
        <div>
            {
                user ? (<>
                    <div className="w-full h-32 bg-gradient-to-r from-blue-300 to-blue-900 dark:bg-gradient-to-r dark:from-amber-700 dark:to-zinc-950"></div><div className="mt-5 p-4">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Profile</h1>
                        <h2 className="mt-5 text-zinc-700 dark:text-zinc-300 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                            {user.email}
                        </h2>
                        <h3 className="mt-5 text-zinc-700 dark:text-zinc-300 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                            Your Postings
                        </h3>
                        {jobData && jobData.filter(item => item.owner == user.email).map((item, index) => (
                            <div className="mb-7 flex flex-col ">
                                <JobCard data={item} key={index} />
                                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2">Applicants : {item.applicants.length}</h4>
                            </div >
                        ))}
                    </div>
                </>)
                    :
                    <>
                        <div className="w-full h-32 bg-gradient-to-r from-blue-300 to-blue-900 dark:bg-gradient-to-r dark:from-amber-700 dark:to-zinc-950"></div>
                        <div className="flex flex-col h-96 justify-center items-center mt-5 p-4">
                            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-5xl" >You Need To Login First 🚫</h1>
                        </div>
                    </>
            }
        </div>
    )
}