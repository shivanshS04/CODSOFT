"use client"
import ProfileTab from "@/components/ProfileTab";
import useAuthStore from "@/zustand/authStore"
import useJobStore from "@/zustand/jobStore";
import { useEffect, useState } from "react";

export default function Profile() {
    const user = useAuthStore(state => state.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div>
            {
                isClient && user ? (<>
                    <div className="w-full h-32 bg-gradient-to-r from-blue-300 to-blue-900 dark:bg-gradient-to-r dark:from-amber-700 dark:to-zinc-950"></div>
                    <div className="mt-5 p-1">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Profile</h1>
                        <h2 className="mt-5 text-zinc-700 dark:text-zinc-300 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                            {user.email}
                        </h2>
                        <div className="mt-8 flex justify-center items-center">
                            <ProfileTab />
                        </div>
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