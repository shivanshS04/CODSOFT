import { states } from "@/data";
import Selector from "./Selector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from 'lucide-react'

export default function SearchJob() {
    return <div className="flex sm:flex-col lg:flex-row items-center justify-around p-5 w-2/3 gap-3 h-24 mr-auto ml-auto relative top-[-50px] bg-white/35 backdrop-blur-xl rounded-2xl">
        <Selector data={states} type="State" />
        <Input type="email" placeholder="Search Job Title" className="drop-shadow-md pr-5 pl-5 font-medium text-lg dark:bg-black/65 h-[44px]" />
        <Button type="submit" size="icon" className="pr-2 pl-2 drop-shadow-md" ><Search /></Button>
    </div>
}