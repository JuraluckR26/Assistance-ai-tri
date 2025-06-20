"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getFAQ } from "@/lib/api/searchService";
import { useRef, useState } from "react";

interface FAQButtonProps {
    onSelect: (text: string) => void
    inputRef?: React.RefObject<HTMLInputElement | null>;
}

function FAQButton({ onSelect, inputRef }: FAQButtonProps) {
    const [faqList, setFaqList] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const fetchFAQ = async () => {
        setLoading(true);
        try {
          const data = await getFAQ("FAQKJD");
          setFaqList(data);
        } catch (err) {
          console.error("FAQ fetch error", err);
        } finally {
          setLoading(false);
        }
    };

    return (
        <>
            <DropdownMenu onOpenChange={(open) => open && fetchFAQ()}>
                <DropdownMenuTrigger asChild>
                    <Button 
                        ref={triggerRef} 
                        variant="link" 
                        className="cursor-pointer"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    >
                        คำค้นหาที่แนะนำ
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                {loading ? (
                    <DropdownMenuLabel>Loading...</DropdownMenuLabel>
                ) : (
                    <>
                        {/* <DropdownMenuLabel>คำค้นหาที่แนะนำ</DropdownMenuLabel>
                        <DropdownMenuSeparator /> */}
                        {faqList.map((text) => (
                            <DropdownMenuItem 
                                key={text} 
                                onClick={() => {
                                    onSelect(text);
                                    triggerRef.current?.blur();
                                    triggerRef.current?.removeAttribute("tabindex");
                                    setTimeout(() => {
                                        inputRef?.current?.focus();
                                    }, 300);
                                }}
                                className="data-[highlighted]:bg-[#EEF5FF] focus:bg-[#EEF5FF] hover:bg-[#EEF5FF] p-2 rounded-md font-medium"
                            >
                                <p className="truncate max-w-[185px] sm:max-w-[240px] md:max-w-[300px]">{text}</p>
                            </DropdownMenuItem>
                        ))}
                    </>
                )}
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}

function FAQBadge() {
    return (
        <>
            <div className="relative w-full max-w-4xl pb-2">
                <div className="flex flex-wrap-reverse md:flex-row gap-2 ...">
                    <div className="">
                        <Button className="rounded-full bg-gradient-to-r from-[#3FA2F6] to-[#4D77FF] bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 ...">อะไหล่รถกระบะ</Button>
                    </div>
                    <div className="">
                        <Button className="rounded-full bg-gradient-to-r from-[#3FA2F6] to-[#4D77FF] bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 ...">เอกสารอะไหล่รถยนต์</Button>
                    </div>
                    <div className="">
                        <Button className="rounded-full bg-gradient-to-r from-[#3FA2F6] to-[#4D77FF] bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 ...">เอกสารสำคัญสำหรับเบิกอะไหล่รถยนต์ 3</Button>
                    </div>
                    <div className="">
                        <Button className="rounded-full bg-gradient-to-r from-[#3FA2F6] to-[#4D77FF] bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 ...">+ More</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export {
    FAQBadge,
    FAQButton
}