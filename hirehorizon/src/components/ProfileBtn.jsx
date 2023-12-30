"use client"
import {
    LogOut,
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
import Link from "next/link"

export function ProfileBtn() {
    const removeUser = useAuthStore(state => state.removeUser);
    const user = useAuthStore(state => state.user);
    const handleProfileClick = () => {

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size='icon'><User /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleProfileClick}>
                    <Link href="/profile">{user.email}</Link>
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
