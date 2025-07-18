import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { assistantList } from "@/lib/data"
import { Filter } from "lucide-react"
import { useState } from "react"

export function ButtonFilter() {
    const [open, setOpen] = useState(false) 
    const [assistance, setAssistance] = useState<string>("")
    const [dateOption, setDateOption] = useState("today")
    
    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger className="flex gap-1"><Filter size={14}/> Filter</MenubarTrigger>
                    <MenubarContent className="bg-gray-100">
                        <div className="p-2"><b>Search Filter</b></div>
                        <Separator/>
                        <div className="grid grid-cols-6 gap-4 p-4">
                            <div className="col-start-1 col-end-3"><Label>Assistant</Label></div>
                            <div className="col-span-4 col-end-7">
                                <Select value={assistance} onValueChange={setAssistance}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select assistant" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {assistantList.map((val) => (
                                            <SelectItem 
                                                key={val.key} 
                                                value={val.key}
                                            >{val.text}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-start-1 col-end-3"><Label>Date</Label></div>
                            <div className="col-span-4">
                                <Select value={dateOption} onValueChange={setDateOption}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Today" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="5days">Last 5 days</SelectItem>
                                            <SelectItem value="30days">Last 30 days</SelectItem>
                                            <SelectItem value="custom">Custom</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Separator/>
                        <div className="grid grid-cols-6 p-2">
                            <div className="col-start-1 col-end-3">
                                <Button variant="outline">Clear Filter</Button>
                            </div>
                            <div className="col-span-4 col-end-7 ml-auto flex gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button type="button" className="bg-blue-600 hover:bg-blue-700">Apply</Button>
                            </div>
                            {/* <div className="col-span-5 grid grid-col-1 gap-2">
                                <Button type="button">Save changes</Button>
                                <Button className="" variant="outline">Cancel</Button>
                            </div> */}
                        </div>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            {/* <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline"><Filter/> Filter</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white" aria-describedby={undefined}>
                    <DialogHeader>   
                        <DialogTitle>Search Filters</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/3">
                            <div>Assistant</div>
                        </div>
                        <div className="basis-2/3">
                            <Select value={assistance} onValueChange={setAssistance}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select assistant" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assistantList.map((val) => (
                                        <SelectItem 
                                            key={val.key} 
                                            value={val.key}
                                        >{val.text}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="basis-1/3">
                            <div>Date</div>
                        </div>
                        <div className="basis-2/3">
                            <Select value={dateOption} onValueChange={setDateOption}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="5days">Last 5 days</SelectItem>
                                        <SelectItem value="30days">Last 30 days</SelectItem>
                                        <SelectItem value="custom">Custom</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="button">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
        </>
    )
}
