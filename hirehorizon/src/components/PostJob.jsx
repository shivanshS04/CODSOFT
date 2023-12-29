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
import { useToast } from "./ui/use-toast"
import { Toaster } from "./ui/toaster"
import { ToastAction } from "./ui/toast"
import { createJob } from "@/appwrite"
import useAuthStore from "@/zustand/authStore"


export function PostJob() {
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [salary, setSalary] = useState(0);
    const [description, setDescription] = useState('')
    const location = useFilterStore(state => state.filterState);
    const user = useAuthStore(state => state.user);
    const { toast } = useToast();
    const closeTrigger = useRef()

    const handleJobPost = async () => {
        if (title.length > 0 && company.length > 0 && salary != 0 && description.length > 0 && location != null) {
            const response = await createJob(title, company, description, salary, location, user.email);
            if (response) {
                toast({
                    title: "job posting successfull!",
                    description: "your job has been successfully added to the portal 🎊"
                })
                closeTrigger.current.click()
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        }
        else {
            toast({
                variant: "destructive",
                title: "Some feilds are still empty",
                description: "Please provide all necessary details about your posting",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    return (
        user &&
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="secondary">Post A Job</Button>
            </DrawerTrigger>
            <DrawerContent >
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="flex justify-center items-center">
                        <DrawerTitle>Add a New Job Opening ✨</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-2 items-center">
                        {/* Job title */}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="job_title">Job Title*</Label>
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="job_title" placeholder="Job Title here" />
                        </div>
                        {/* company */}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="company">Company*</Label>
                            <Input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company here" />
                        </div>
                        {/* expected salary */}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="salary">Salary*</Label>
                            <Input type="text" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Approximate of salary here" />
                        </div>
                        {/* description */}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="job_description">Description*</Label>
                            <Textarea id="job_description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" />
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
                    <Toaster />
                </div>
            </DrawerContent>
        </Drawer>

    )
}
