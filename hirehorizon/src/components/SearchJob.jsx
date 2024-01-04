"use client"
import useFilterStore from "@/zustand/filterStore";
import Selector from "./Selector";
import { Input } from "./ui/input";
import { useEffect } from "react";

export default function SearchJob() {
    const setTitle = useFilterStore(state => state.setFilterTitle);
    useEffect(() => {
        setTitle("")
    }, [])

    return <div className="flex flex-col md:flex-row items-center justify-around p-5 w-5/6 md:w-2/3 gap-3 lg:h-24 mr-auto ml-auto relative top-[-12vh] md:top-[-50px] bg-white/35 backdrop-blur-xl rounded-2xl">
        <Input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Search Job Title" className="drop-shadow-md pr-5 pl-5 font-medium text-lg dark:bg-black/65 h-[44px]" />
        <Selector />
    </div >
}