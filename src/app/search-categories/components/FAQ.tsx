"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useRef, useState } from "react";

interface FAQButtonProps {
    onSelect: (text: string) => void
    inputRef?: React.RefObject<HTMLInputElement | null>;
    sharedFAQList?: string[];
}

const STORAGE_KEY = "faqList";

function readLocalFAQ(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((s) => (typeof s === "string" ? s.trim() : "")).filter(Boolean)
      : [];
  } catch (e) {
    console.error("faqList parse error", e);
    return [];
  }
}

function dedupe(arr: string[]) {
  return Array.from(new Set(arr.map((s) => s.trim()))).filter(Boolean);
}

function FAQButton({ onSelect, inputRef, sharedFAQList }: FAQButtonProps) {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [localFAQ, setLocalFAQ] = useState<string[]>([]);
    
    useEffect(() => {
        if (sharedFAQList?.length) return;
        setLocalFAQ(readLocalFAQ());
    }, [sharedFAQList]);

    const faqList = useMemo(
        () => dedupe(sharedFAQList?.length ? sharedFAQList : localFAQ),
        [sharedFAQList, localFAQ]
    );

    if (!faqList.length) return null;

    return (
        <>
            <DropdownMenu onOpenChange={(open) => open}>
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