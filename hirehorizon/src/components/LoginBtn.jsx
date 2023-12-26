"use client"
import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from "next/navigation";

export default function LoginBtn() {
    const router = useRouter();
    const handleClick = () => {
        router.push('/login')
    }
    return (
        // <Link href={'/login'}><LogIn /></Link>
        <Button variant="secondary" size="icon" onClick={handleClick}><LogIn /></Button>
    )
}