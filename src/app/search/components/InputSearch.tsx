"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, PackageSearch, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getFAQ, searchKhunJaiDeeWithCategory } from "@/lib/api/searchService";
import { DocumentItem, RequestFeedback, RequestSearch } from "@/types/search.type";
import Loader from "@/components/shared/loading";
import { setFormatFromSearch } from "@/utils/formatting";
import Feedback from "@/components/shared/Feedback";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CategoriesSearch, SelectedCategory } from "./CategoriesSearch";
import Image from "next/image";

type ViewMode = "ALL" | "TOP_ONLY" | "BOTTOM_ONLY" | "EMPTY";

export default function InputSearch() {
    const { loginId, clearAuth } = useAuthStore();

    const [question, setQuestion] = useState<string>("")
    const [results, setResults] = useState<DocumentItem[]>([])
    const [relatedResults, setRelatedResults] = useState<DocumentItem[]>([])
    const [yourQuestion, setYourQuestion] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [feedbackData, setFeedbackData] = useState<RequestFeedback>()
    const inputRef = useRef<HTMLInputElement>(null);
    const [openDocList, setOpenDocList] = useState<boolean>(false)
    const handleOpenDoc = () => setOpenDocList(prev => !prev)
    const [viewMode, setViewMode] = useState<ViewMode>("EMPTY");
    
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggest, setShowSuggest] = useState(false);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [focusedValue, setFocusedValue] = useState<string>("");
    const [previewValue, setPreviewValue] = useState<string>("");
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const displayAsk = yourQuestion.replace(/\s+/g, " ").trim();

    const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
        key: "default",
        cat: "ทั้งหมด",
        sub: "",
        subKey: "",
    })

    const [faqList, setFaqList] = useState<string[]>(() => {
        const localFAQ = localStorage.getItem('faqList');
        if (localFAQ) {
            return JSON.parse(localFAQ);
        }
        return [];
    });

    useEffect(() => {
        if (suggestions.length > 0 && activeIndex >= 0 && activeIndex < suggestions.length) {
            setFocusedValue(suggestions[activeIndex]);
        }
    }, [activeIndex, suggestions]);
    
    useEffect(() => {
        setActiveIndex(0);
        setFocusedValue(suggestions[0] || "");
        setPreviewValue("");
    }, [suggestions]);


    useEffect(() => {
        const fetchAndSetFAQ = async () => {
            try {
                if (faqList.length > 0) return;

                const data = await getFAQ("FAQKJD");
                if (data && data.length > 0) {
                    setFaqList(data);
                    localStorage.setItem("faqList", JSON.stringify(data));
                }
            } catch (error) {
                console.error("Error fetching FAQ:", error);
            }
        };

        fetchAndSetFAQ();
    }, [faqList.length]);

    function scoreMatch(q: string, t: string) {
        if (!q) return 0;
        
        const index = t.indexOf(q);
        if (index === 0) return 3;
        if (index > 0) return 2;
        return 0;
    }

    useEffect(() => {
        const q = question.trim().toLowerCase();
        if (!q || q.length < 2) {
            setSuggestions([]);
            setShowSuggest(false);
            setActiveIndex(0)
            setFocusedValue("")
            return;
        }

        const isExactMatch = faqList.some((t) => t.trim().toLowerCase() === q);
        if (isExactMatch) {
            setSuggestions([]);
            setShowSuggest(false);
            return;
        }

        const ranked = faqList
            .map((text) => ({ text, score: scoreMatch(q, text.toLowerCase()) }))
            .filter((x) => x.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map((x) => x.text);

        setSuggestions(ranked);
        setShowSuggest(ranked.length > 0);
    },[question, faqList])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggest || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex((prev) => {
                    const newIndex = prev < suggestions.length - 1 ? prev + 1 : 0;
                    const newFocusedValue = suggestions[newIndex];
                    setPreviewValue(newFocusedValue);
                    return newIndex;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((prev) => {
                    const newIndex = prev > 0 ? prev - 1 : suggestions.length - 1;
                    const newFocusedValue = suggestions[newIndex];
                    setPreviewValue(newFocusedValue);
                    return newIndex;
                });
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedValue) {
                    setQuestion(focusedValue);
                    setShowSuggest(false);
                    setPreviewValue("");
                    // setShouldSubmit(true);
                }
                break;
            case 'Escape':
                setShowSuggest(false);
                setPreviewValue("");
                break;
        }
    };

    const mapCategoryToSystemModuleFunction = (catKey?: string, catName?: string, subName?: string) => {
        if (!catKey || catKey === "default" || !catName || catName === "ทั้งหมด") {
            return { system: "ทั้งหมด", moduleName: "", functionName: "" };
        }

        const system = catName;
        const moduleName = subName || "";
        const functionName = "";

        return { system, moduleName, functionName };
    };

    const handleSubmit = useCallback(async () => {
        if (question.trim() === "") return

        setIsLoading(true)
        setIsSubmitted(true)
        setResults([]);      
        setFeedbackData(undefined);
        setOpenDocList(false)
        setYourQuestion(question)
        setShowSuggest(false)
        
        try {
            const { system, moduleName, functionName } = mapCategoryToSystemModuleFunction(
                selectedCategory.key,
                selectedCategory.cat,
                selectedCategory.sub,
            );

            const payload: RequestSearch = {
                searchContent: question,
                loginId: loginId!,
                system: system,
                module: moduleName,
                function: functionName,
            };

            const data = await searchKhunJaiDeeWithCategory(payload)

            if(typeof data === "string") {
                alert(data);
                setIsLoading(false);
                clearAuth();
                return
            }

            const hasTop =
            !!data.Response?.trim() ||
            !!data.SearchDocument?.trim() ||
            !!data.SearchDocumentLocation?.trim();

            const hasBottom =
            !!data.SearchDocument_Other?.trim();

            let mode: ViewMode = "EMPTY";

            if (hasTop && hasBottom) {
            mode = "ALL";
            } else if (hasTop) {
            mode = "TOP_ONLY";
            } else if (hasBottom) {
            mode = "BOTTOM_ONLY";
            }

            setViewMode(mode);

            if (mode !== "EMPTY") {
            const { primary, related } = setFormatFromSearch(data);
            setResults(primary);
            setRelatedResults(related);

            setFeedbackData({
                id: data.Id,
                loginId: loginId!,
            });
            }
            
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Search failed:", err.message)
            } else {
                console.error("Unknown error")
            }
        } finally {
            setQuestion("")
            setIsLoading(false)
        }
    }, [question, loginId, clearAuth, selectedCategory]);

    useEffect(() => {
        if (shouldSubmit && question.trim() !== "") {
            setShouldSubmit(false);
            handleSubmit();
        }
    }, [question, shouldSubmit, handleSubmit]);

    useEffect(() => {
        
    }, [results, relatedResults])
    
    if(!loginId) return null;

    return (
        <>
            <div className="relative w-full md:max-w-4xl xl:max-w-5xl pb-1">
                <CategoriesSearch
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                />
            </div>
            <div className="relative w-full md:max-w-4xl xl:max-w-5xl">
                <Input
                    type="text"
                    placeholder="ระบุคำค้นหา..."
                    value={previewValue || question}
                    onChange={(e) => { 
                        setQuestion(e.target.value);
                        setPreviewValue("");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleKeyDown(e);
                            if (!showSuggest || suggestions.length === 0) {
                                handleSubmit();
                            }
                        } else {
                            handleKeyDown(e);
                        }
                    }}
                    ref={inputRef}
                    className="text-sm w-full py-6 px-6 pr-40 md:pr-40 xl:pr-40 rounded-full bg-white border border-[#D9D9D9] shadow-lg shadow-blue-200/50"
                />
                <div className="absolute inset-y-0 right-2 bottom-0 flex items-center gap-2">
                    {/* <div onKeyDown={(e) => e.stopPropagation()}></div> */}
                    <Button
                        size="icon"
                        onClick={handleSubmit}
                        className="bg-[#1E90FF] hover:bg-[#164563] text-white rounded-full cursor-pointer"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="relative w-full md:max-w-4xl xl:max-w-5xl">
                <div className="">
                    {showSuggest && (
                        <div
                            ref={suggestionsRef} 
                            className="absolute z-10 mt-1 md:w-80 bg-white border border-gray-300 rounded-md shadow-lg h-auto overflow-y-auto p-2"
                        >
                            {suggestions.map((item, index) => (
                                <div
                                    key={`${item}-${index}`}
                                    className={cn(
                                        "px-1 py-2 cursor-pointer text-sm rounded-sm transition-colors",
                                        index === activeIndex 
                                            ? "bg-[#EEF5FF] text-blue-600" 
                                            : "hover:bg-[#EEF5FF]"
                                    )}
                                    onClick={() => {
                                        setQuestion(item);
                                        setShowSuggest(false);
                                        setSuggestions([]);
                                        // setShouldSubmit(true);
                                        inputRef.current?.focus();
                                    }}
                                    onMouseEnter={() => {
                                        setActiveIndex(index);
                                        setPreviewValue(item);
                                    }}
                                >
                                    <div className="flex row">💡 {item}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isSubmitted && (
                <div className="relative w-full md:max-w-4xl xl:max-w-5xl mt-4">
                    <div className="p-2 bg-[#F5F5F5] rounded-md">
                        {isLoading ? (
                            <>
                                <div className="relative w-full min-h-[80px]">
                                    <div className="absolute inset-0 flex items-center justify-center -translate-y-2">
                                        <Loader />
                                    </div>
                                </div>
                            </>

                        ) : (
                            <Card className="text-foreground">
                                {viewMode === "EMPTY" && (
                                    <div className="flex px-10 text-sm">
                                        <div className="flex items-center gap-10 bg-white">
                                            <Image src="/images/no-results.png" alt="icon" width={160} height={20}/>

                                            <div className="">
                                                <div className="grid gap-2">
                                                    <center className="text-lg font-semibold text-gray-800">ขออภัย ฉันไม่พบข้อมูลใดที่เกี่ยวกับคำค้นหาของคุณ</center> 
                                                    <span className="line-clamp-2 break-all max-w-[520px] bg-gray-100 px-4 py-2 rounded-lg">
                                                        {displayAsk}
                                                    </span>
                                                    
                                                    <div>
                                                        <li>ลองตรวจสอบคำสะกดอีกครั้ง</li>
                                                        <li>ลองใช้คำค้นหาที่สั้นลง</li>
                                                        <li>หรือเลือกหมวดหมู่ด้านบน</li>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                )}

                                {(viewMode === "ALL" || viewMode === "TOP_ONLY") && (
                                    <>
                                        <CardHeader>
                                            <CardTitle>
                                                <div>คำถามของคุณ : {yourQuestion}</div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className="pb-3">ตอบ :</CardTitle>
                                            <CardDescription>
                                                {results.map((item, index) => (
                                                    <div key={item.link ?? index} className="flex flex-col ...">
                                                        <div className="mb-2">
                                                            <Link 
                                                                href={item.link}
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 font-semibold hover:underline"
                                                            >
                                                                {index + 1}. {item.title}
                                                            </Link>
                                                            <p className="line-clamp-2">{item.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardDescription>
                                            
                                        </CardContent>
                                        <CardFooter className="flex flex-row-reverse ...">
                                            {feedbackData && <Feedback dataProps={feedbackData} />}
                                        </CardFooter>
                                    </>
                                )}

                                {(viewMode === "ALL" || viewMode === "BOTTOM_ONLY") && (
                                    <>
                                        <CardHeader>
                                            <CardTitle>
                                                <div>คำถามของคุณ : {yourQuestion}</div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className="pb-3">ตอบ :</CardTitle>
                                            <CardDescription>
                                                <span>ไม่มีข้อมูล</span>
                                            </CardDescription>
                                        <>
                                        <Separator className="my-4" />
                                            <Button 
                                                className="rounded-full cursor-pointer bg-[#4D77FF]/20 text-[#4D77FF] hover:bg-[#4D77FF]/20"
                                                onClick={handleOpenDoc}
                                                >
                                                <PackageSearch /> เอกสารเพิ่มเติมที่อาจเกี่ยวข้องกับสิ่งที่คุณสนใจ {!openDocList ? <ChevronUp /> : <ChevronDown />}
                                            </Button>

                                            {openDocList && (
                                                <CardDescription>
                                                    {relatedResults.map((item, index) => (
                                                        <div key={item.title ?? index} className="flex flex-col mt-3">
                                                            <div className="mb-2">
                                                                <Link 
                                                                    href={item.link}
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 font-semibold hover:underline"
                                                                >
                                                                    {index + 1}. {item.title}
                                                                </Link>
                                                                <p className="line-clamp-2">{item.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </CardDescription>
                                            )}
                                        </>
                                        </CardContent>
                                        <CardFooter className="flex flex-row-reverse ...">
                                            {feedbackData && <Feedback dataProps={feedbackData} />}
                                        </CardFooter>
                                    </>
                                )}
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}