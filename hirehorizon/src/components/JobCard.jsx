'use client'
import { useState } from "react"
import { Button } from "./ui/button";
export default function JobCard({ data }) {
    const [descLength, setDescLength] = useState(150)
    const showMore = () => {
        setDescLength(data.description.length);
    }
    const showLess = () => {
        setDescLength(200)
    }
    return (
        <div className="bg-blue-50 text-black dark:bg-white/75 p-3 rounded-lg w-5/6 lg:w-2/3 cursor-pointer mb-5 drop-shadow-md">
            <div className="flex flex-col md:flex-row items-start justify-start md:justify-between">
                <div>
                    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">{data.job_title}</h3>
                    <p className="text-zinc-500 font-semibold">{data.company} <span className="ml-5">𖡡 {data.location}</span></p>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 md:w-2/3  " >{data.description.substr(0, descLength)}{descLength == 150 ? <span onClick={showMore} className="text-blue-700 font-semibold">...show more</span> : <span className="text-blue-700 font-semibold" onClick={showLess}>show less</span>}</p>
                </div>
                <div className="flex flex-row md:flex-col justify-between max-sm:items-center w-full lg:w-2/6">
                    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Rs. {data.expected_salary}/year</h3>
                    <Button className='bg-blue-600 dark:bg-amber-500 font-semibold'>Apply</Button>
                </div>
            </div>

        </div>
    )
}