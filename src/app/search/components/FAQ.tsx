"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getFAQ } from "@/lib/api/searchService";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface FAQButtonProps {
    onSelect: (text: string) => void
}

function FAQButton({ onSelect }: FAQButtonProps) {
    const [faqList, setFaqList] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const t = useTranslations('Search');

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
                    {/* <Button variant="link" size="icon">FAQ</Button> */}
                    <Button variant="link" className="">{t("faq-button")}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                {loading ? (
                    <DropdownMenuLabel>Loading...</DropdownMenuLabel>
                ) : (
                    <>
                        <DropdownMenuLabel>{t("faq-dropdown_title")}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {faqList.map((text) => (
                            <DropdownMenuItem 
                                key={text} 
                                onClick={() => onSelect(text)}
                                className="data-[highlighted]:bg-[#EEF5FF] focus:bg-[#EEF5FF] hover:bg-[#EEF5FF] px-4 py-2 rounded-md font-medium"
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