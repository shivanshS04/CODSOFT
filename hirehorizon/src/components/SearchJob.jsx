import Selector from "./Selector";
import { Input } from "./ui/input";

export default function SearchJob() {
    return <div className="flex flex-col md:flex-row items-center justify-around p-5 w-5/6 md:w-2/3 gap-3 lg:h-24 mr-auto ml-auto relative top-[-12vh] md:top-[-50px] bg-white/35 backdrop-blur-xl rounded-2xl">
        <Input type="email" placeholder="Search Job Title" className="drop-shadow-md pr-5 pl-5 font-medium text-lg dark:bg-black/65 h-[44px]" />
        <Selector />
    </div >
}