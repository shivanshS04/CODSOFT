'use client'
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useRef, useState } from "react"
import { useToast } from "./ui/use-toast"
import { Toaster } from "./ui/toaster"
import useAuthStore from "@/zustand/authStore"
import { addUserRecord, updateApplicants, updateResume, uploadResume } from "@/appwrite"


export default function ApplyBtn({ className, jobData }) {
    const closeTrigger = useRef()
    const { toast } = useToast();
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser)

    const handleApply = async () => {
        const res = await updateApplicants(jobData.$id, user.email);
        if (res.success) {
            toast({
                title: 'Applied Successfully !'
            })
            closeTrigger.current.click()
        }
        else {
            toast({
                title: 'Some Error Occured !',
                variant: 'destructive'
            })
        }
    }

    const handleResumeUpdate = async (file) => {
        if (!user.resumeId) {
            const resumeUpload = await uploadResume(file);
            if (resumeUpload.success) {
                setUser({ ...user, resumeId: resumeUpload.id, resume: resumeUpload.res.name })
            }
        }
        else {
            const resumeUpdate = await updateResume(user.resumeId, file);
            if (resumeUpdate.success) {
                setUser({ ...user, resume: resumeUpdate.res.name })
            }
        }
    }

    const handleSubmit = async () => {
        if (!user.resumeId || !user.name || !user.contact) {
            return alert('please provide neccessary information!')
        }
        if (!user.id) {
            const userRecord = await addUserRecord(user.email, user.name, user.contact, user.resumeId);
            if (userRecord.success) {
                setUser({
                    ...user,
                    id: userRecord.id
                })
                handleApply();
            }
        }
        else {
            handleApply();
        }


    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="secondary"
                    className={`bg-blue-600 dark:bg-amber-500 text-white hover:text-black dark:hover:text-white font-semibold w-5/6 md:w-2/6 ${className} `}
                >
                    Apply
                </Button>
            </DrawerTrigger>
            <DrawerContent >
                {
                    user ?
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader className="flex justify-center items-center">
                                <DrawerTitle>Add a New Job Opening ✨</DrawerTitle>
                            </DrawerHeader>


                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        defaultValue={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="contact" className="text-right">
                                        Phone
                                    </Label>
                                    <Input
                                        id="contact"
                                        type="number"
                                        defaultValue={user.contact}
                                        onChange={(e) => setUser({ ...user, contact: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="resume">Resume</Label>
                                    {user.resumeId && <p>{user.resume}</p>}
                                    <Input
                                        type="file"
                                        id="resume"
                                        accept=".doc , .docx, .pdf"
                                        onChange={(e) => handleResumeUpdate(e.target.files[0])}
                                    />
                                </div>
                            </div>

                            <DrawerFooter>
                                <Button onClick={() => handleSubmit()}>Apply 🚀 </Button>
                                <DrawerClose ref={closeTrigger} asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                            <Toaster />
                        </div>
                        :
                        <div className="mx-auto w-full max-w-sm" >
                            <DrawerHeader className="h-32 flex justify-center items-center">
                                <DrawerTitle>You must Sign In before Posting a Job 🚫</DrawerTitle>
                            </DrawerHeader>
                        </div>

                }
            </DrawerContent>
        </Drawer>

    )
}
