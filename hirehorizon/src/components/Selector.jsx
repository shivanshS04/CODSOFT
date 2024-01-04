"use client"
import { states } from "@/data";
import useFilterStore from "@/zustand/filterStore"
import { useEffect } from "react";

export default function Selector() {
    const setFilterState = useFilterStore(state => state.setFilterState);
    const data = states;
    useEffect(() => {
        setFilterState(null)
    }, [])

    return (
        <select className="p-3 rounded-md font-semibold drop-shadow-md  bg-white dark:bg-black/50 " onChange={(e) => {
            e.target.value == 'select state' ? setFilterState(null) :
                setFilterState(e.target.value)
        }} >
            <option value={null} >select state</option>
            {data.map((item, index) => {
                return <option className="dark:bg-black/65 font-medium p-2 text-lg" value={item} key={index}>{item}</option>
            })}
        </select>
    )
}