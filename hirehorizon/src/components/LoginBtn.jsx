"use client"
import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { redirect } from "next/navigation";

export default function LoginBtn() {
    const handleClick = () => {
        redirect('/login')
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" onClick={handleClick}><LogIn /></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Login</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}