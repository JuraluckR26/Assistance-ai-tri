"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Frown, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Feedback() {
    const [feedback, setFeedback] = useState<string | undefined>(undefined);
    const [isDialogOpen, setIsDialogOpen] = useState(false); 
    const [selectedReason, setSelectedReason] = useState<string | null>(null);

    const handleFeedback = (value: string) => {
        setFeedback(value);
        if (value === "like") {
          toast.success("ขอบคุณสำหรับคำตอบที่เป็นประโยชน์ 👍");
        } else if (value === "dislike") {
        //   toast("ขอบคุณสำหรับคำติชม 👎", {
        //     description: "เราจะนำไปปรับปรุงให้ดีขึ้น",
        //   });
            setIsDialogOpen(true);
        }
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
                    className="bg-lime-100 border-1 border-lime-200 hover:bg-lime-600 data-[state=on]:bg-lime-600 data-[state=on]:text-white" 
                    value="like"
                    aria-label="Toggle bold"
                >
                    <ThumbsUp className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem 
                    className="bg-gray-100 border-1 border-gray-200 hover:bg-gray-500 data-[state=on]:bg-gray-500 data-[state=on]:text-white" 
                    value="dislike"
                    aria-label="Toggle italic"
                >
                    <ThumbsDown className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white text-gray-900 rounded-lg shadow-md">
                    <DialogHeader>
                        <DialogTitle className="flex flex-row items-center gap-2">
                            <span className="text-xl">Oh! I'm sorry </span>
                            <Frown/>
                        </DialogTitle>
                        <DialogDescription>
                            Can you please identify the cause?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                        <div className="grid grid-flow-col grid-rows-2 gap-2">
                            <Button 
                                onClick={() => setSelectedReason("incorrect")}
                                className={
                                selectedReason === "incorrect"
                                    ? "bg-slate-800 text-white"
                                    : "bg-gray-200 text-black hover:text-white"
                                }
                            >The content is incorrect.</Button>
                            <Button
                                onClick={() => setSelectedReason("outdated")}
                                className={
                                  selectedReason === "outdated"
                                    ? "bg-slate-800 text-white"
                                    : "bg-gray-200 text-black hover:text-white"
                                }
                            >Old content, urgent update!</Button>
                            <Button
                                onClick={() => setSelectedReason("dislike")}
                                className={
                                  selectedReason === "dislike"
                                    ? "bg-slate-800 text-white"
                                    : "bg-gray-200 text-black hover:text-white"
                                }
                            >I don't like this content.</Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            variant={"outline"}
                            // className="bg-blue-500/20"
                            onClick={() => {
                                setIsDialogOpen(false);
                                toast.success("Thank you for your feedback. I'll take it into consideration for improvement. 🙏");
                            }}
                            >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}