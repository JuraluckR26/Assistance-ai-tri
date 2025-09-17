"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, PackageSearch, Send } from "lucide-react";
import { FAQButton } from "./FAQ";
import { useCallback, useEffect, useRef, useState } from "react";
import { getFAQ, searchKhunJaiDee } from "@/lib/api/searchService";
import { DocumentItem, RequestFeedback, RequestSearch } from "@/types/search.type";
import Loader from "@/components/shared/loading";
import { setFormatFromSearch } from "@/utils/formatting";
import { FcReading } from "react-icons/fc";
import Feedback from "@/components/shared/Feedback";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function InputSearch() {
    const { loginId, clearAuth } = useAuthStore();

    const [question, setQuestion] = useState<string>("")
    const [results, setResults] = useState<DocumentItem[]>([])
    const [relatedResults, setRelatedResults] = useState<DocumentItem[]>([])
    const [yourQuestion, setYourQuestion] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [feedbackData, setFeedbackData] = useState<RequestFeedback>()
    const [emptyView, setEmptyView] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [openDocList, setOpenDocList] = useState<boolean>(false)
    const handleOpenDoc = () => setOpenDocList(prev => !prev)
    
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggest, setShowSuggest] = useState(false);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [focusedValue, setFocusedValue] = useState<string>("");
    const [previewValue, setPreviewValue] = useState<string>("");
    const [shouldSubmit, setShouldSubmit] = useState(false);

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
                    setShouldSubmit(true);
                }
                break;
            case 'Escape':
                setShowSuggest(false);
                setPreviewValue("");
                break;
        }
    };

    function checkEmptyResponse(data: {Response?: string; SearchDocument?: string; SearchDocumentLocation?: string;}): boolean {
        return (
            !data.Response?.trim() &&
            !data.SearchDocument?.trim() &&
            !data.SearchDocumentLocation?.trim()
        );
    }

    const handleSubmit = useCallback(async () => {
        if (question.trim() === "") return

        setIsLoading(true)
        setIsSubmitted(true)
        setEmptyView(false);
        setResults([]);      
        setFeedbackData(undefined);
        setOpenDocList(false)

        try {
            const payload: RequestSearch = {
                searchContent: question,
                loginId: loginId!
            };

            const data = await searchKhunJaiDee(payload)

            if(typeof data === "string") {
                alert(data);
                setIsLoading(false);
                clearAuth();
                return
            }

            if(checkEmptyResponse(data))
            {
                setEmptyView(true);
                return;
                
            } else {
                const { primary, related } = setFormatFromSearch(data);
                setResults(primary)
                setRelatedResults(related)
                setYourQuestion(question)

                const feedbackObj: RequestFeedback = {
                    sender: loginId!,
                    searchText: question,
                    resultText: data.Response,
                    document: data.SearchDocument,
                    documentLocation: data.SearchDocumentLocation,
                }
                setFeedbackData(feedbackObj)                
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
    }, [question, loginId, clearAuth]);

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
                    <div onKeyDown={(e) => e.stopPropagation()}>
                        
                    </div>
                    {/* <FAQButton 
                        onSelect={(value) => {
                            if (!isLoading) {
                                setQuestion(value);
                            }
                        }}
                        inputRef={inputRef}
                        sharedFAQList={faqList}
                    /> */}
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
                                {emptyView ? (
                                    <div className="flex justify-center">
                                        <div className="flex items-center gap-6 bg-white px-6 py-4">
                                            <FcReading size={60}/>

                                            <div className="text-left">
                                                <p className="text-lg font-semibold text-gray-800">ขออภัย เราไม่พบข้อมูลที่ตรงกับคำค้นหาของท่าน</p>
                                                <p className="text-gray-500 font-medium mt-1">กรุณาค้นหาใหม่อีกครั้ง หรือค้นหาจากคำค้นหาที่แนะนำ</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ) : (
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
                                            {relatedResults.length > 0 && (
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
                                            )}
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