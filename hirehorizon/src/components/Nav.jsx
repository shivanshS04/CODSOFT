"use client"
import useAuthStore from "@/zustand/authStore";
import { ProfileBtn } from "./ProfileBtn";
import { ToggleThemeBtn } from "./ToggleThemeBtn";
import LoginBtn from "./LoginBtn";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {

    const user = useAuthStore((state) => state.user)
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {

        return () => {
            setLoaded(true)
        }
    }, [])

    return (
        <div className="w-screen h-[60px] bg-white/30 flex flex-row items-center justify-between p-2 absolute top-0 left-0 backdrop-blur-md rounded-b-xl">
            <Link href="/" className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Hire Horizons
            </Link>
            <div className="flex flex-row justify-center items-center gap-2">
                <ToggleThemeBtn />
                {loaded && user ? <ProfileBtn /> : <LoginBtn />}
            </div>
        </div>
    )
}