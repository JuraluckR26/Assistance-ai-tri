import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { getAssistants } from "@/lib/api/chatbotService"
import { getHistory } from "@/lib/api/historyService"
import { useAuthStore } from "@/stores/useAuthStore"
import { RequestSearchHistory, ResponseHistory } from "@/types/history.type"
import { setFormatAssistant } from "@/utils/formatting"
import { Search } from "lucide-react"
import { useRef, useState, useCallback, useEffect } from "react"

interface ButtonFilterProps {
  onApply: (filters: { assistance: string; dateOption: string }) => void;
  onHistoryData: (historyData: ResponseHistory | null) => void;
  onResetFilter?: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

export function ButtonFilter({ onApply, onHistoryData, onResetFilter, onLoadingChange }: ButtonFilterProps) {
    const { loginId } = useAuthStore();
    const [assistance, setAssistance] = useState<string>("")
    const [dateOption, setDateOption] = useState("today")
    const [loadFilter, setLoadFilter] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [date2, setDate2] = useState<Date | undefined>(undefined)
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false)
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
    const [assistantList, setAssistantList] = useState<string[]>([])

    const panelRef = useRef<HTMLDivElement>(null);
    
    const handleFilter = useCallback(async () => {
        if (loadFilter) return;
        
        setHasAttemptedSubmit(true);
        
        if (!assistance || assistance.trim() === "") {
            alert("กรุณาเลือก Assistant ก่อนค้นหา");
            return;
        }
        
        try {
            setLoadFilter(true);
            onLoadingChange?.(true);
            
            const now = new Date();
            const thaiTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
            let startDate: string = "";
            let endDate: string = "";

            switch (dateOption) {
                case "today":
                    startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)).toISOString();
                    endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)).toISOString();
                    break;
                case "5days":
                    const fiveDaysAgo = new Date(thaiTime.getTime() - 5 * 24 * 60 * 60 * 1000);
                    startDate = new Date(Date.UTC(fiveDaysAgo.getFullYear(), fiveDaysAgo.getMonth(), fiveDaysAgo.getDate(), 0, 0, 0, 0)).toISOString();
                    endDate = thaiTime.toISOString();
                    break;
                case "30days":
                    const thirtyDaysAgo = new Date(thaiTime.getTime() - 30 * 24 * 60 * 60 * 1000);
                    startDate = new Date(Date.UTC(thirtyDaysAgo.getFullYear(), thirtyDaysAgo.getMonth(), thirtyDaysAgo.getDate(), 0, 0, 0, 0)).toISOString();
                    endDate = thaiTime.toISOString();
                    break;
                case "custom":
                    if (!date || !date2) {
                        alert("กรุณาเลือกวันที่เริ่มต้นและวันที่สิ้นสุด");
                        return;
                    }
                    startDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)).toISOString();
                    endDate = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate(), 23, 59, 59, 59)).toISOString();
                    break;
                default:
                    startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)).toISOString();
                    endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)).toISOString();
                    break;
            }

            const requestData: RequestSearchHistory = {
                assistantName: assistance,
                date: {
                    start: startDate,
                    end: endDate
                }
            };
            const result = await getHistory(requestData)
            
            if(result) {
                onHistoryData(result)
                onApply({ assistance, dateOption });
            }
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoadFilter(false);
            onLoadingChange?.(false);
        }
    }, [assistance, dateOption, date, date2, loadFilter, onLoadingChange, onHistoryData, onApply])

    const loadAssistants = useCallback(async () => {
        if(!loginId) return null;
        try {
            const cachedList = localStorage.getItem('assistant_list');

            if (cachedList) {
                setAssistantList(setFormatAssistant(cachedList));
                return;
            }

            const result = await getAssistants(loginId);
            if (result.AssistantList) {
                setAssistantList(setFormatAssistant(result.AssistantList));
            }
        } catch (error) {
            console.error("Error loading assistants:", error);
        }
    }, [loginId]);

    useEffect(() => {
        if (loginId) loadAssistants();
    }, [loginId, loadAssistants]);

    return (
        <>
            <div className="relative inline-block text-left">
                 <Popover open={popoverOpen} onOpenChange={(open) => {
                     setPopoverOpen(open);
                     if (open) {
                         setHasAttemptedSubmit(false);
                     }
                 }}>
                     <PopoverTrigger asChild>
                         <Button variant="outline">
                             <Search className="w-4 h-4" />
                             Retrieve
                         </Button>
                     </PopoverTrigger>
                     <PopoverContent 
                        className="w-[420px] bg-gray-100 p-0" 
                        ref={panelRef}
                        align="start"
                        side="bottom"
                        sideOffset={5}
                    >
                        <div className="px-3 py-2"><b>Conditions</b></div>
                        <Separator/>
                        <div className="grid grid-cols-5 gap-2 py-2 px-3">
                            <div className="flex items-center"><Label>Assistant <span className="text-red-500">*</span></Label></div>
                            <div className="col-span-4">
                                <Select value={assistance} onValueChange={setAssistance}>
                                    <SelectTrigger className={`w-full bg-white ${hasAttemptedSubmit && !assistance ? 'border-red-300' : ''}`}>
                                    {/* <SelectTrigger className="w-full bg-white"> */}
                                        <SelectValue placeholder="Select assistant" />
                                    </SelectTrigger>
                                    <SelectContent className="absolute z-60">
                                        {assistantList.map((val, index) => (
                                            <SelectItem 
                                                key={index} 
                                                value={val.trim()}
                                            >{val.trim()}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center"><Label>Date</Label></div>
                            <div className="col-span-4">
                                <Select value={dateOption} onValueChange={(value) => {
                                    setDateOption(value);
                                    if (value !== "custom") {
                                        setDate(undefined);
                                        setDate2(undefined);
                                    }
                                }}>
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
                            {dateOption === "custom" && (
                                <div className="col-start-2 col-end-5 flex gap-2">
                                    <div className="grid grid-cols gap-2">
                                        <div className=""><Label>Start Date</Label></div>
                                        <input
                                            type="date"
                                            value={date ? date.toISOString().split('T')[0] : ''}
                                            onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                                            className="w-[150px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="grid grid-cols gap-2">
                                        <div className=""><Label>End Date</Label></div>
                                        <input
                                            type="date"
                                            value={date2 ? date2.toISOString().split('T')[0] : ''}
                                            onChange={(e) => setDate2(e.target.value ? new Date(e.target.value) : undefined)}
                                            className="w-[150px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <Separator/>
                        <div className="grid grid-cols-6 p-2">
                            <div className="col-start-1 col-end-3">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="bg-gray-200 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => { 
                                        setAssistance(""); 
                                        setDateOption(""); 
                                        setDate(undefined);
                                        setDate2(undefined);
                                        setHasAttemptedSubmit(false);
                                        setPopoverOpen(false);
                                        onResetFilter?.();
                                        onHistoryData(null)
                                }}>Clear</Button>
                            </div>
                            <div className="col-span-4 col-end-7 ml-auto flex gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="bg-slate-700 text-white hover:bg-slate-900 hover:text-white cursor-pointer"
                                    onClick={() => {
                                        setPopoverOpen(false);
                                        setHasAttemptedSubmit(false);
                                    }} 
                                    disabled={loadFilter}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="button" 
                                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer" 
                                    size="sm"
                                    onClick={async () => { 
                                        handleFilter(); 
                                        if (assistance) {
                                            setPopoverOpen(false);
                                        }
                                    }}
                                    disabled={loadFilter}
                                >
                                    Retrieve
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            
        </>
    )
}
