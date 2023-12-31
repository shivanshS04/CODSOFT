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
import Selector from "./Selector"
import { Textarea } from "./ui/textarea"
import { useRef, useState } from "react"
import useFilterStore from "@/zustand/filterStore"
import { createJob } from "@/appwrite"
import useAuthStore from "@/zustand/authStore"
import useJobStore from "@/zustand/jobStore"
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast"

export function PostJob() {
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [salary, setSalary] = useState();
    const [description, setDescription] = useState('')
    const location = useFilterStore(state => state.filterState);
    const user = useAuthStore(state => state.user);
    const closeTrigger = useRef()

    const addJob = useJobStore(state => state.addJob)

    const handleJobPost = async () => {
        if (title.length > 0 && company.length > 0 && salary && description.length > 0 && location != null) {
            var loading = toast.loading(`Loading..`);
            const response = await createJob(title, company, description, salary, location, user.email);
            toast.dismiss(loading)

            if (response.success) {
                toast.success("job posting successfull!",
                    {
                        duration: 1000
                    })
                addJob(response.res)
                closeTrigger.current.click()
            }
            else {
                toast.error("Uh oh! Something went wrong.",
                    {
                        duration: 1000
                    })
            }
        }
        else {
            toast.error("Uh oh! Something went wrong.",
                {
                    duration: 1000
                })
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="secondary">Post A Job</Button>
            </DrawerTrigger>
            <DrawerContent >
                {
                    user ?
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader className="flex justify-center items-center">
                                <DrawerTitle>Add a New Job Opening ✨</DrawerTitle>
                            </DrawerHeader>

                            <div className="flex flex-col gap-2 items-center">
                                {/* Job title */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="job_title">Job Title*</Label>
                                    <Input type="text" onChange={(e) => setTitle(e.target.value)} id="job_title" placeholder="Job Title here" />
                                </div>
                                {/* company */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="company">Company*</Label>
                                    <Input type="text" id="company" onChange={(e) => setCompany(e.target.value)} placeholder="Company here" />
                                </div>
                                {/* expected salary */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="salary">Salary*</Label>
                                    <Input type="text" id="salary" onChange={(e) => setSalary(e.target.value)} placeholder="Approximate of salary here" />
                                </div>
                                {/* description */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="job_description">Description*</Label>
                                    <Textarea id="job_description" onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" />
                                </div>
                                {/* location */}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="select_state">Location*</Label>
                                    <Selector id='select_state' />
                                </div>

                            </div>

                            <DrawerFooter>
                                <Button onClick={handleJobPost}>Post 🚀 </Button>
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
