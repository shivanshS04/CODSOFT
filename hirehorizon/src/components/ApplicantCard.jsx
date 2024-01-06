'use client'
import { getResumeURL } from "@/appwrite";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ApplicantCard({ data }) {
    const [previewUrl, setPreviewUrl] = useState('')
    const fetchResume = async () => {
        const url = await getResumeURL(data.resumeID);
        setPreviewUrl(url)
    }
    useEffect(() => {
        fetchResume()
    }, [])

    return (
        <div className="min-h-36 flex flex-col md:flex-row gap-3 items-center justify-between bg-blue-50 overflow-ellipsis text-black dark:bg-white/75 p-3 rounded-lg w-full lg:w-2/3 mb-5 drop-shadow-md">
            <div className="w-full" >
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight ">{data.name}</h3>
                <Link href={`mailto:${data.email}`} className="overflow-clip text-zinc-500 font-semibold">email : {data.email}</Link>
                <p className="text-zinc-500 font-semibold">phone : {data.contact}</p>
            </div>
            <div className="max-sm:w-full p-3 font-semibold cursor-pointer bg-blue-500 dark:bg-amber-500 text-white drop-shadow-lg rounded-lg">
                <Link target="_black" href={previewUrl}>Resume</Link>
            </div>
        </div>
    )
}