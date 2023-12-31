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
import { useEffect, useRef, useState } from "react"
import useAuthStore from "@/zustand/authStore"
import { deleteResume, getUserRecord, updateApplicants, updateResume, uploadResume } from "@/appwrite"
import { Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import useJobStore from "@/zustand/jobStore"


export default function ApplyBtn({ className, jobData }) {
    const closeTrigger = useRef()
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser)
    const [docUploaded, setDocUploaded] = useState(false);
    const refresh = useJobStore(state => state.removeJob);
    useEffect(() => {
        if (user)
            if (user.resumeId) {
                setDocUploaded(true)
            }
    }, [])

    const handleApply = async () => {
        var loading = toast.loading(`Loading..`);
        const res = await updateApplicants(jobData.$id, jobData.applicants, user.email);
        toast.dismiss(loading)
        if (res.success) {
            refresh()
            toast.success('Applied Successfully !', {
                duration: 1000
            })
            closeTrigger.current.click()
        }
        else {
            toast.error('Some Error Occured !',
                {
                    duration: 1000
                })
        }
    }

    const handleResumeUpdate = async (file) => {
        setDocUploaded(false)
        var loading = toast.loading(`Uploading Resume..`);
        const resumeUpload = await uploadResume(file);
        toast.dismiss(loading);
        if (resumeUpload.success) {
            toast.success('Upload Successful !', {
                duration: 1000
            })
            setUser({ ...user, resumeId: resumeUpload.id, resume: resumeUpload.name })
            setDocUploaded(true)
        }
        else {
            toast.error("Uh oh! Something went wrong.",
                {
                    duration: 1000
                })
        }
    }

    const handleResumeDelete = async () => {
        setDocUploaded(false);
        var loading = toast.loading(`Deleting..`);
        const isResumeDeleted = await deleteResume(user.resumeId);
        toast.dismiss(loading);
        if (isResumeDeleted.success) {
            toast.success('Resume Deleted Successfully', { duration: 1000 })
            setUser({
                ...user, resume: null, resumeId: null
            })
        }
        else {
            toast.error('Error Deleting the file',
                {
                    duration: 1000
                })
        }
    }

    const handleSubmit = async () => {
        if (!user.resumeId || !user.name || !user.contact) {
            return alert('please provide neccessary information!')
        }
        if (!user.id) {
            const userRecord = await getUserRecord(user.email, user.name, user.contact, user.resumeId, user.resume);
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
                                <DrawerTitle>Apply for a Job ✨</DrawerTitle>
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
                                    {user.resumeId ?
                                        <div className="flex flex-row justify-between items-center border-zinc-200 border-2 rounded-lg p-3">
                                            <p className="font-medium ">{user.resume}</p>
                                            <Button variant="destructive" size='icon' onClick={() => handleResumeDelete()} ><Trash2 /></Button>
                                        </div>
                                        :
                                        <Input
                                            type="file"
                                            id="resume"
                                            accept=".doc , .docx, .pdf"
                                            onChange={(e) => handleResumeUpdate(e.target.files[0])}
                                        />}
                                </div>
                            </div>

                            <DrawerFooter>
                                {
                                    jobData.owner == user.email ?

                                        <Button disabled >You Can't Apply To Your own Posting 🚫</Button>
                                        :

                                        jobData.applicants.includes(user.email) ?
                                            <Button disabled >You Have already Applied 🚫</Button>
                                            :
                                            <Button disabled={!docUploaded} onClick={() => handleSubmit()}>Apply 🚀 </Button>
                                }
                                <DrawerClose ref={closeTrigger} asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>

                        </div>
                        :
                        <div className="mx-auto w-full max-w-sm" >
                            <DrawerHeader className="h-32 flex justify-center items-center">
                                <DrawerTitle>You must Sign In before Posting a Job 🚫</DrawerTitle>
                            </DrawerHeader>
                        </div>

                }
                <Toaster />
            </DrawerContent>
        </Drawer>

    )
}
