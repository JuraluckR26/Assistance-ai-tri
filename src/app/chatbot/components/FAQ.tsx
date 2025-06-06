import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Lightbulb } from "lucide-react";

export default function FAQButton() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-gray-200 rounded-full cursor-pointer">
                        <Lightbulb className="!h-5 !w-5 text-gray-700" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>FAQ</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Example 1</DropdownMenuItem>
                    <DropdownMenuItem>Example 2</DropdownMenuItem>
                    <DropdownMenuItem>Example 3</DropdownMenuItem>
                    <DropdownMenuItem>Example 4</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}