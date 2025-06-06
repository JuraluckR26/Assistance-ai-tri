"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assistantList } from "@/lib/data";
import { useState } from "react";

export default function Assistance() {
    const [assistance, setAssistance] = useState<string>("")
    
    return (
        <>
            <Select value={assistance} onValueChange={setAssistance}>
                <SelectTrigger className="rounded-full px-4 border text-gray-700 cursor-pointer">
                    <SelectValue placeholder="Assistance name" />
                </SelectTrigger>
                <SelectContent>
                    {assistantList.map((val) => (
                        <SelectItem 
                            key={val.key} 
                            value={val.key}
                            onClick={() => setAssistance(val.text)}
                        >{val.text}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            
            {/* <select
                value={assistance}
                onChange={(e) => setAssistance(e.target.value)}
                className="rounded-full"
            >
                <option value="">Assistance name</option>
                <option value="A">Assistant A</option>
                <option value="B">Assistant B</option>
            </select> */}
        </>
    )
}