"use client"
import { addUserRecord, updateApplicants, updateResume, uploadResume } from "@/appwrite"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from "@/zustand/authStore"
import { Toaster } from "./ui/toaster"
import { useToast } from "./ui/use-toast"

export default function ApplyBtn({ className, jobData }) {

    const { toast } = useToast();
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser)

    const handleApply = async () => {
        const res = await updateApplicants(jobData.$id, user.email);
        if (res.success) {
            toast({
                title: 'Applied Successfully !'
            })
        }
        else {
            toast({
                title: 'Some Error Occured !'
            })
        }
    }

    const handleResumeUpdate = async (file) => {
        if (!user.resumeId) {
            const resumeUpload = await uploadResume(file);
            if (resumeUpload.success) {
                setUser({ ...user, resumeId: resumeUpload.id, resume: file })
            }
        }
        else {
            const resumeUpdate = await updateResume(user.resumeId, file);
            if (resumeUpdate.success) {
                setUser({ ...user, resume: file })
            }
        }
    }

    const handleSubmit = async () => {
        if (!user.resume || !user.name || !user.contact) {
            return alert('please provide neccessary information!')
        }

        const userRecord = await addUserRecord(user.email, user.name, user.contact, user.resumeId);
        if (userRecord.success) {
            handleApply();
        }

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className={`bg-blue-600 dark:bg-amber-500 text-white hover:text-black dark:hover:text-white font-semibold w-5/6 md:w-2/6 ${className} `}>Apply</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Provide Your Details</DialogTitle>
                    <DialogDescription>
                        Enter all the required details about you , this data will be saved for further use. Click submit when you're done.
                    </DialogDescription>
                </DialogHeader>
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
                        {user.resumeId && <p>{user.resumeId}</p>}
                        <Input type="file" id="resume" accept=".doc , .docx, .pdf" onChange={(e) => handleResumeUpdate(e.target.files[0])} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
            <Toaster />
        </Dialog>
    )
}
