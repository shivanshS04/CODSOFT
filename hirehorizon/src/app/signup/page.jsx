"use client"
import { createUser } from "@/appwrite"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import useAuthStore from "@/zustand/authStore"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Login() {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const toast = useToast()
    function checkUser() {
        if (user) {
            redirect('/')
        }
    }
    useEffect(() => {
        checkUser()
    }, [])

    const handleLogin = async (formData) => {
        const email = formData.get("email")
        const password = formData.get("password")
        const isSignedUp = await createUser(email, password);
        if (isSignedUp) {
            setUser({ email });
            redirect('/')
        } else {
            toast({
                title: "Try Again !",
                description: "Invalid Credentials",
            })
            formData.set("email", "");
            formData.set("password", "");
        }
    }
    return (
        <div className="flex flex-col gap-3 justify-center items-center h-screen w-screen">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" >Sign Up</h1>
            <form action={handleLogin} className="sm:w-4/5 lg:w-1/3 flex flex-col justify-center items-center">
                <div className="grid w-full max-w-sm items-center gap-2 mb-5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" name="email" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                    <Label htmlFor="email">Password</Label>
                    <Input type="password" id="password" placeholder="Password" name="password" />
                </div>
                <Button type="submit" >Submit</Button>
            </form>
            <p className="leading-7 text-zinc-700 dark:text-zinc-300 [&:not(:first-child)]:mt-6">Already have an Account ? <Link href='/login' className="font-semibold underline text-zinc-700 dark:text-zinc-200">Login Here</Link> !</p>
            <Toaster />
        </div>
    )
}