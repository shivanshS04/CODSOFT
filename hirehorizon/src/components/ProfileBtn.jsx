"use client"
import {
    Github,
    LogOut,
    Settings,
    User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/zustand/authStore"
import { redirect } from "next/navigation"

export function ProfileBtn() {
    const removeUser = useAuthStore(state => state.removeUser);
    const user = useAuthStore(state => state.user);
    const handleGithub = () => {
        redirect('www.github.com/shivanshs04')
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size='icon'><User /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleGithub}>   
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => removeUser()} >
                    <LogOut className="mr-2 h-4 w-4 text-red-800 font-semibold " />
                    <span className="text-red-800 font-semibold">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
