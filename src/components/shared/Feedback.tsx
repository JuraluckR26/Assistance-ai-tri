"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { sendFeedback } from "@/lib/api/searchService";
import { searchContent } from "@/lib/data";
import { RequestFeedback } from "@/types/search.type";
import { Frown, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FeedbackProps {
    dataProps: RequestFeedback
}

export default function Feedback({ dataProps }: FeedbackProps) {
    const [feedback, setFeedback] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false); 
    const [selectedReason, setSelectedReason] = useState<string>();
    const [customReason, setCustomReason] = useState<string>("");

    const handleFeedback = (value: string) => {
        setFeedback(value);
        if (value === "Good") {
            handleGoodFeedback()
        } else if (value === "Bad") {
            setIsDialogOpen(true);
        }
    };

    const handleGoodFeedback = async () => {
        if (dataProps) {
          const payload: RequestFeedback = {
            ...dataProps,
            feecback: "Good",
            feecbackDetail: ""
          };
          const res = await sendFeedback(payload);
          if (res === "Success") {
            toast.success("ขอบคุณสำหรับคำตอบที่เป็นประโยชน์ 👍");
          }
        }
    };

    const handleBadFeedbackSubmit = async () => {
        if (!selectedReason) return;
    
        if (dataProps) {
          const payload: RequestFeedback = {
            ...dataProps,
            feecback: "Bad",
            feecbackDetail: selectedReason === "อื่น ๆ" ? customReason : selectedReason
          };
          const res = await sendFeedback(payload);
          if (res === "Success") {
            toast.success("ขอบคุณสำหรับคำติชม 👎", {description: "เราจะนำไปปรับปรุงให้ดีขึ้น",});
          }
        }
        setIsDialogOpen(false);
        setSelectedReason(undefined);
        setCustomReason("");
    };

    return (
        <>
            <ToggleGroup 
                type="single" 
                variant={"outline"}
                value={feedback}
                onValueChange={handleFeedback}
            >
                <ToggleGroupItem 
                    className="bg-lime-100 border-1 border-lime-200 hover:bg-lime-600 data-[state=on]:bg-lime-600 data-[state=on]:text-white cursor-pointer" 
                    value="Good"
                    aria-label="Toggle bold"
                >
                    <ThumbsUp className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem 
                    className="bg-gray-100 border-1 border-gray-200 hover:bg-gray-500 data-[state=on]:bg-gray-500 data-[state=on]:text-white cursor-pointer" 
                    value="Bad"
                    aria-label="Toggle italic"
                >
                    <ThumbsDown className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white text-gray-900 rounded-lg shadow-md">
                    <DialogHeader>
                        <DialogTitle className="flex flex-row items-center gap-2">
                            <span className="text-xl">ขอโทษด้วยจริงๆ </span>
                            <Frown/>
                        </DialogTitle>
                        <DialogDescription>
                            คุณช่วยระบุสาเหตุได้ไหม?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <div className="grid grid-flow-col grid-rows-2 gap-2">
                            {searchContent.map((val,index) => (
                                <Button 
                                    key={`${val.key}-${index}`}
                                    onClick={() => setSelectedReason(val.text)}
                                    className={
                                    selectedReason === val.text
                                        ? "bg-slate-800 text-white"
                                        : "bg-gray-200 text-black hover:text-white"
                                    }
                                >{val.text}</Button>
                            ))}
                        </div>
                        {selectedReason === "อื่น ๆ" && 
                            <div className="pt-2">
                                <Input
                                    value={customReason}
                                    onChange={(e) => setCustomReason(e.target.value)}
                                />
                            </div>
                        }
                        
                    </div>
                    <DialogFooter>
                        <Button
                            disabled={!selectedReason}
                            variant="outline"
                            onClick={handleBadFeedbackSubmit}
                            className="cursor-pointer"
                        >
                            ส่งคำติชม
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}