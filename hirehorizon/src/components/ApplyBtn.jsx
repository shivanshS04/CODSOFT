import { Button } from "./ui/button";

export default function ApplyBtn({ className }) {
    return <Button className={`bg-blue-600 dark:bg-amber-500 font-semibold w-5/6 md:w-2/6 ${className} `}>Apply</Button>

}