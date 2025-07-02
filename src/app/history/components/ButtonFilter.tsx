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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { assistantList } from "@/lib/data"
import { useState } from "react"
import { Calendar22 } from "./DatePicker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"

export function ButtonFilter() {
    const [open, setOpen] = useState(false) 
    const [assistance, setAssistance] = useState<string>("")
    const [dateOption, setDateOption] = useState("Today")
    const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date())
    const [dateTo, setDateTo] = useState<Date | undefined>(new Date())
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
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

                {/* <div className="grid grid-cols-6">
                    <div className="col-span-3 col-start-3 ...">
                        <Calendar22/>
                    </div>
                </div> */}
                
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
