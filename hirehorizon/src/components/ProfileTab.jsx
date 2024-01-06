'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import useJobStore from "@/zustand/jobStore"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import useAuthStore from "@/zustand/authStore"
import { Trash2, X } from "lucide-react"
import { getJobs, removeApplication, removeJob } from "@/appwrite"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function ProfileTab() {
    const jobs = useJobStore(state => state.jobs);
    const user = useAuthStore(state => state.user)
    const removeJobState = useJobStore(state => state.removeJob)
    const setJobs = useJobStore(state => state.setJobs)
    const router = useRouter()
    const fetchJobs = async () => {
        const fetchedJobs = await getJobs();
        if (fetchedJobs)
            setJobs(fetchedJobs)
    }

    const handleRemoveJobPosting = async (job_id) => {
        var loading = toast.loading(`Loading..`);
        const removedJob = await removeJob(job_id);
        toast.dismiss(loading)
        if (removedJob) {
            toast.success('Removed Job Posting!', {
                duration: 1000
            })
            removeJobState()
            fetchJobs()
        }
        else {
            toast.error("Uh oh! Something went wrong.",
                {
                    duration: 1000
                })
        }
    }

    const handleRemoveApplication = async (job_id, applicants) => {
        var loading = toast.loading(`Loading..`);
        const isApplicationRemoved = await removeApplication(job_id, applicants, user.email);
        toast.dismiss(loading);
        if (isApplicationRemoved.success) {
            removeJobState()
            fetchJobs();
        }
    }

    return (
        <Tabs defaultValue="posts" className="w-[400px] md:w-1/2">
            <TabsList className="grid w-full grid-cols-2">
                < TabsTrigger value="posts"  >Posts</ TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
            </TabsList >
            <TabsContent value="posts">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Postings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            {
                                jobs &&
                                <Accordion type="multiple" collapsible="true" className="w-full">
                                    {
                                        jobs.filter((item) => item.owner == user.email).map((item, index) => (
                                            <AccordionItem key={index} value={item.job_title}>
                                                <AccordionTrigger >
                                                    <div className="w-full flex flex-row justify-between items-center pl-2 pr-2">
                                                        {item.job_title}
                                                        <Button variant='destructive' onClick={() => handleRemoveJobPosting(item.$id)} size='icon'><Trash2 /></Button>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className='bg-zinc-100 dark:bg-zinc-700 font-medium rounded-lg p-2 mb-3 cursor-pointer'>
                                                    <Link href={`/applicants/${item.$id}`}>Applicants: {item.applicants.length}</Link>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>

                            }
                            <Toaster />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="applied">
                <Card>
                    <CardHeader>
                        <CardTitle>Applied Jobs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            {
                                jobs &&
                                <div>
                                    {
                                        jobs.filter((item) => item.applicants.includes(user.email)).map((item, index) => (
                                            <div key={index} className="w-full flex flex-row justify-between items-center mb-4 border-b p-2">
                                                <p>{item.job_title}</p>
                                                <Button variant='destructive' onClick={() => handleRemoveApplication(item.$id, item.applicants)} size='icon' ><X /></Button>
                                            </div>
                                        ))
                                    }
                                </div>

                            }
                            <Toaster />
                        </div>
                    </CardContent>

                </Card>
            </TabsContent>
        </Tabs >
    )
}
