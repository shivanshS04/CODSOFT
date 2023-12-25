import { states } from "@/data";
import { Selector } from "./Selector";

export default function SearchJob() {
    return <div className="flex flex-row items-center p-5 w-2/3 h-24 mr-auto ml-auto relative top-[-50px] bg-white/35 backdrop-blur-xl rounded-2xl">
        <Selector type="Location" data={states} />
    </div>
}