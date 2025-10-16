
"use client"
import Feedback from "@/components/shared/Feedback";
// import ReadAloudButton from "@/components/shared/ListenButton";
import Loader from "@/components/shared/loading";
import { AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getFAQList, searchChat } from "@/lib/api/chatbotService";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { MappedSearchResponse, RequestSearchChat } from "@/types/chatbot.type";
import { RequestFeedback } from "@/types/search.type";
import { setFormatFromSearchChat } from "@/utils/formatting";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";

export default function InputSearch() {
    const { loginId } = useAuthStore();
    const [question, setQuestion] = useState<string>("")
    const assistantName = "MiRai Service desk assistant"
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [responseData, setResponseData] = useState<MappedSearchResponse>()
    const [yourQuestion, setYourQuestion] = useState<string>("")
    const [feedbackData, setFeedbackData] = useState<RequestFeedback>()

    const [faqList, setFaqList] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [isReady, setIsReady] = useState<boolean>(false)

    const anchorRef = useRef<HTMLDivElement>(null);
    const [dropUp, setDropUp] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0);
    const [focusedValue, setFocusedValue] = useState<string>("");
    const [previewValue, setPreviewValue] = useState<string>("");
    const suggestionRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [shouldSubmit, setShouldSubmit] = useState(false);

    // Combined effect for suggestions and focused value management
    useEffect(() => {
        if (suggestions.length > 0) {
            setActiveIndex(0);
            setFocusedValue(suggestions[0]);
            setPreviewValue("");
        } else {
            setFocusedValue("");
            setPreviewValue("");
        }
    }, [suggestions]);

    useEffect(() => {
        if (suggestions.length > 0 && activeIndex >= 0 && activeIndex < suggestions.length) {
            setFocusedValue(suggestions[activeIndex]);
        }
    }, [activeIndex, suggestions]);

    const fetchFAQ = async (assistantName: string) => {
        setIsReady(false)
        try {
            const resFAQ = await getFAQList("FAQ", assistantName)
            if (resFAQ && resFAQ.length > 0) {
                setFaqList(resFAQ)
                setIsReady(true)
            } else {
                setFaqList([])
                setShowSuggest(false)
                setIsReady(true)
            } 
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsReady(true)
        }
    };

    // Initialize FAQ on component mount
    useEffect(() => {
        fetchFAQ(assistantName);
    }, []);

    function normalize(s: string) {
        return s.normalize("NFC").toLocaleLowerCase("th-TH");
    }

    function graphemeLen(s: string) {
        try {
            const seg = new Intl.Segmenter("th", { granularity: "grapheme" });
            return Array.from(seg.segment(s)).length;
        } catch {
            return Array.from(s).length;
        }
    }

    function tokenize(q: string) {
        return q.trim().split(/\s+/).filter(Boolean);
    }

    const scoreMatch = useCallback((query: string, target: string) => {
        const text = normalize(target);
        const tokensAll = tokenize(query).map(normalize);
        const tokens = tokensAll.filter(t => graphemeLen(t) >= 2); 

        if (tokens.length === 0) return 0;

        const positions: number[] = [];
        for (const tok of tokens) {
            const idx = text.indexOf(tok);     
            if (idx === -1) return 0;           
            positions.push(idx);
        }
        
        let score = 50 * tokens.length;            
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const idx = positions[i];
            score += Math.max(0, 30 - idx);
            if (idx === 0) score += 30;
            score += Math.min(20, graphemeLen(tok) * 2);
            if (i > 0 && positions[i] >= positions[i - 1]) score += 5;
        }
        
        return score;
    }, []);

    useEffect(() => {
        const q = question.trim().toLowerCase();

        if (!q) {
            setSuggestions([]);
            setShowSuggest(false);
            return;
        }

        const isExactMatch = faqList.some((t) => t.trim().toLowerCase() === q);
        if (isExactMatch) {
            setSuggestions([]);
            setShowSuggest(false);
            return;
        }

        const ranked = faqList
            .map((text) => ({ text, score: scoreMatch(q, text) })) 
            .filter((x) => x.score > 0)                            
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map((x) => x.text);

        setSuggestions(ranked);
        setShowSuggest(ranked.length > 0);
    }, [question, faqList, scoreMatch]);

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

    // Effect to scroll active item into view
    useEffect(() => {
        if (suggestionRefs.current[activeIndex]) {
            suggestionRefs.current[activeIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [activeIndex]);

    const handleSubmit = useCallback(async () => {
        if (question.trim() === "") return

        setShowSuggest(false)
        setIsSubmitted(true)
        setFeedbackData(undefined);
        setIsLoading(true)

        try {
            const searchObj: RequestSearchChat = {
                assistantName: assistantName,
                question: question,
                loginId: loginId
            }
            const data = await searchChat(searchObj)

            if(typeof data === "string") return

            const mapped = setFormatFromSearchChat(data);

            setResponseData(mapped)
            setYourQuestion(question)

            const feedbackObj: RequestFeedback = {
                id: data.Id,
                loginId: loginId!
            }
            setFeedbackData(feedbackObj)
            setDropUp(false)

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
    }, [question, assistantName, loginId]);

    useEffect(() => {
        if (shouldSubmit && question.trim() !== "") {
            setShouldSubmit(false);
            handleSubmit();
        }
    }, [question, shouldSubmit, handleSubmit]);

    return (
        <div className="h-full flex flex-col pb-2 gap-2">
            {!isSubmitted && (
                <div>
                    <p className="text-lg md:text-2xl lg:text-3xl font-semibold text-center bg-gradient-to-r from-[#723881] to-[#007AFF] bg-clip-text text-transparent">
                        เริ่มสร้างแชทใหม่ของคุณได้เลย
                    </p>
                    <p className="text-sm text-slate-400 text-center">อย่าลืมเลือก Assistance เพื่อการตอบคำถามได้อย่างถูกต้องตรงประเด็น</p>
                     <BsChatDotsFill 
                         size={250} 
                         color="#1d8ffe" 
                         className="mx-auto opacity-20 w-32 h-32 sm:w-48 sm:h-48 md:w-50 md:h-50 lg:w-60 lg:h-60 xl:w-100 xl:h-100"
                     />
                </div>
            )}
            <div className="flex-1 flex flex-col justify-center">
                <div className="relative" ref={anchorRef}>
                    <div className="bg-white rounded-3xl shadow-md shadow-blue-200/50 p-3 flex flex-col gap-2 w-full border border-gray-200">

                        <>
                            {showSuggest && suggestions.length > 0 && (
                                <div
                                    className={cn(
                                        "absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden py-2 px-2",
                                        "w-full sm:w-96 md:w-[500px] lg:w-[450px] xl:w-[500px]",
                                        dropUp ? "bottom-full mb-1" : "top-20 mt-1"
                                    )}
                                >
                                    <div className="max-h-60 overflow-y-auto">
                                        <ul>
                                            {suggestions.map((item, index) => (
                                            <li key={item} className="list-none">
                                                <button
                                                    ref={(el) => { suggestionRefs.current[index] = el; }}
                                                    type="button"
                                                    onClick={() => {
                                                        setQuestion(item);
                                                        setShowSuggest(false);
                                                        setPreviewValue("");
                                                        // setShouldSubmit(true);
                                                    }}
                                                    className={cn(
                                                        "w-full text-left px-2 py-2 cursor-pointer text-sm rounded-sm transition-colors",
                                                        index === activeIndex 
                                                            ? "bg-[#EEF5FF] text-blue-600" 
                                                            : "hover:bg-[#EEF5FF]"
                                                    )}
                                                    onMouseEnter={() => {
                                                        setActiveIndex(index);
                                                        setPreviewValue(item);
                                                    }}
                                                >
                                                    💡 {item}
                                                </button>
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            <Textarea
                                value={previewValue || question}
                                placeholder={!isReady ? "กำลังโหลดข้อมูล..." : "พิมพ์คำถามของคุณที่นี่..."} 
                                className="border border-1 rounded-tl-xl rounded-tr-xl text-sm"
                                disabled={!isReady}
                                autoFocus
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                    setPreviewValue("");
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleKeyDown(e);
                                        if (!showSuggest || suggestions.length === 0) {
                                            handleSubmit();
                                        }
                                    } else {
                                        handleKeyDown(e);
                                    }
                                }}
                            />
                        </>

                        <div className="flex justify-between items-center">
                            <Badge variant={"secondary"} className="bg-blue-100 text-blue-600 rounded-sm px-3 py-1">
                                Mirai, my-ISUZU, OMO
                            </Badge>

                            <div className="flex gap-2 items-center">

                                <div
                                    className="flex rounded-full mx-auto bg-gradient-to-r from-[#1E90FF] via-[#1E90FF] to-[#125699] p-1"
                                >
                                    <Button
                                        onClick={handleSubmit}
                                        className="rounded-full bg-white hover:bg-white py-1 flex items-center gap-1 h-auto cursor-pointer"
                                    >
                                        <span className="text-[#1E90FF] font-bold">สอบถาม</span> <ArrowUpRight className="!w-5 !h-5 text-[#1E90FF]" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {isSubmitted && (
                            <div className="pt-2">
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
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>คำถาม : {yourQuestion}</CardTitle>
                                        </CardHeader>
                                        {responseData && (
                                            <>
                                                <CardContent>
                                                    <CardTitle>ตอบ :</CardTitle>
                                                    <div className="whitespace-pre-line">
                                                        <div dangerouslySetInnerHTML={{ __html: responseData.response }} />
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex ml-auto gap-2">
                                                    {/* <ReadAloudButton
                                                        onClick={() => console.log("เริ่มอ่านเอกสาร")}
                                                        label="อ่านเอกสารให้ฟัง"
                                                        // iconSrc="/icons/microphone.png"
                                                        size={28}
                                                    /> */}
                                                    {feedbackData && <Feedback dataProps={feedbackData} />}
                                                </CardFooter>
                                            </>
                                        )}
                                    </Card>
                                )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div>
                <Card className="px-4 py-2 gap-1 text-xs bg-gray-100 border-none shadow-none ">
                    <div className="flex gap-2 items-center">
                        <AlertTitle className="text-orange-500 md:text-xs lg:text-xs xl:text-sm">คำเตือน: ข้อมูลที่ได้จาก เอไอ เซอร์วิสเดส นี้ เป็นเพียงคำแนะนำเบื้องต้น อาจมีขัอผิดพลาด ไม่เป็นปัจจุบัน หรือไม่สมบูรณ์ </AlertTitle>
                    </div>
                    <div className="text-gray-400 flex gap-2">
                        <p className="lg:text-xs md:text-xs xl:text-sm">กรุณาตรวจสอบด้วยตัวท่านเองอีกครั้งหรือติดต่อเซอร์วิสเดส ตามช่องทางต่อไปนี้</p>
                        <p className="lg:text-xs md:text-xs xl:text-sm">โทรศัพท์: 02-079-9777</p>
                        <p className="lg:text-xs md:text-xs xl:text-sm">อีเมล: servicedesk@tripetch-it.co.th</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}