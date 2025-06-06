import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function Feedback() {
    return (
        <>
            <ToggleGroup 
                type="single" 
                variant={"outline"}
                // value={feedback}
                // onValueChange={handleFeedback}
            >
                <ToggleGroupItem 
                    className="bg-lime-100 border-1 border-lime-200 hover:bg-lime-600 data-[state=on]:bg-lime-600 data-[state=on]:text-white" 
                    value="Good"
                    aria-label="Toggle bold"
                >
                    <ThumbsUp className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem 
                    className="bg-gray-100 border-1 border-gray-200 hover:bg-gray-500 data-[state=on]:bg-gray-500 data-[state=on]:text-white" 
                    value="Bad"
                    aria-label="Toggle italic"
                >
                    <ThumbsDown className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    )
}