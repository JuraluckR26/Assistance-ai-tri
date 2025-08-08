import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { assistantList } from "@/lib/data"
import { Filter } from "lucide-react"
import { useRef, useState } from "react"

interface ButtonFilterProps {
  onApply: (filters: { assistance: string; dateOption: string }) => void;
}

export function ButtonFilter({ onApply }: ButtonFilterProps) {
    const [open, setOpen] = useState(false) 
    const [assistance, setAssistance] = useState<string>("")
    const [dateOption, setDateOption] = useState("today")

    const panelRef = useRef<HTMLDivElement>(null);
    const togglePanel = () => setOpen(!open);

    function handleFilter() {
        console.log("Filter applied with:", { assistance, dateOption });
        onApply({ assistance, dateOption });
        setOpen(false);
    }

    return (
        <>
            {/* <Menubar>
                <MenubarMenu>
                    <MenubarTrigger className="flex gap-1"><Filter size={14}/> Filter</MenubarTrigger>
                    <MenubarContent className="bg-gray-100">
                        <div className="p-2"><b>Search Filter</b></div>
                        <Separator/>
                        <div className="grid grid-cols-6 gap-4 p-4">
                            <div className="col-start-1 col-end-3"><Label>Assistant</Label></div>
                            <div className="col-span-4 col-end-7">
                                <Select value={assistance} onValueChange={setAssistance}>
                                    <SelectTrigger className="w-full bg-white">
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
                        </div>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar> */}
            <div className="relative inline-block text-left">
                <button
                    onClick={togglePanel}
                    className="flex items-center gap-2 px-3 py-1.5 border rounded-md shadow-sm bg-white hover:bg-gray-100 text-sm font-medium"
                >
                    <Filter className="w-4 h-4" />
                    Filter
                </button>

                {open && (
                    <div
                        ref={panelRef}
                        className="absolute mt-2 w-100 rounded-md border bg-gray-100 shadow-xl z-60 "
                    >
                        <div className="p-2 ml-2"><b>Search Filter</b></div>
                        <Separator/>
                        <div className="grid grid-cols-6 gap-4 p-4">
                            <div className="col-start-1 col-end-3"><Label>Assistant</Label></div>
                            <div className="col-span-4 col-end-7">
                                <Select value={assistance} onValueChange={setAssistance}>
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Select assistant" />
                                    </SelectTrigger>
                                    <SelectContent className="absolute z-60">
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
                                    <SelectTrigger className="w-[180px] bg-white">
                                        <SelectValue placeholder="Today" />
                                    </SelectTrigger>
                                    <SelectContent className="absolute z-60">
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
                                <Button 
                                    variant="outline" 
                                    onClick={() => { 
                                        setAssistance(""); 
                                        setDateOption("today"); 
                                        setOpen(false); 
                                }}>Clear Filter</Button>
                            </div>
                            <div className="col-span-4 col-end-7 ml-auto flex gap-2">
                                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={handleFilter}>Apply</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
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
