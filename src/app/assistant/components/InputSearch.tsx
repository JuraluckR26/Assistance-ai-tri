"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAssistants, getFAQList, searchChat } from "@/lib/api/chatbotService";
import { MappedSearchResponse, RequestSearchChat } from "@/types/chatbot.type";
import { setFormatAssistant, setFormatFromSearchChat } from "@/utils/formatting";
import { BsChatDotsFill } from "react-icons/bs";
import { RequestFeedback } from "@/types/search.type";
import Feedback from "@/components/shared/Feedback";
import Loader from "@/components/shared/loading";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AlertTitle } from "@/components/ui/alert";

// Export ฟังก์ชันสำหรับ get ค่าที่ focus อยู่
export const useFocusedValue = () => {
    const [focusedValue] = useState<string>("");
    const [focusedIndex] = useState<number>(0);
    
    const getFocusedValue = () => focusedValue;
    const getFocusedIndex = () => focusedIndex;
    
    return { getFocusedValue, getFocusedIndex, focusedValue, focusedIndex };
};

export default function InputSearch() {
    const { loginId } = useAuthStore();
    const [question, setQuestion] = useState<string>("")
    const [assistantName, setAssistantName] = useState<string>("")
    const [assistantList, setAssistantList] = useState<string[]>([])
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [responseData, setResponseData] = useState<MappedSearchResponse>()
    const [yourQuestion, setYourQuestion] = useState<string>("")
    const [feedbackData, setFeedbackData] = useState<RequestFeedback>()

    const [faqList, setFaqList] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [openInput, setOpenInput] = useState<boolean>(false)
    const [isReady, setIsReady] = useState<boolean>(false)

    const anchorRef = useRef<HTMLDivElement>(null);
    const [dropUp, setDropUp] = useState(true);
    
    // State for keyboard navigation
    const [activeIndex, setActiveIndex] = useState(0);
    const [focusedValue, setFocusedValue] = useState<string>("");
    const [previewValue, setPreviewValue] = useState<string>("");
    const suggestionRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [shouldSubmit, setShouldSubmit] = useState(false);
    
    // useEffect for sync focusedValue กับ activeIndex
    useEffect(() => {
        if (suggestions.length > 0 && activeIndex >= 0 && activeIndex < suggestions.length) {
            setFocusedValue(suggestions[activeIndex]);
        }
    }, [activeIndex, suggestions]);
    
    // Reset activeIndex เมื่อ suggestions เปลี่ยน
    useEffect(() => {
        setActiveIndex(0);
        setFocusedValue(suggestions[0] || "");
        setPreviewValue("");
    }, [suggestions]);

    
    const loadAssistants = useCallback(async () => {
        if(!loginId) return null;
        try {
            const cachedList = localStorage.getItem('assistant_list');

            if (cachedList) {
                setAssistantList(setFormatAssistant(cachedList));
                return;
            }

            const result = await getAssistants(loginId);
            if (result.AssistantList) {
                setAssistantList(setFormatAssistant(result.AssistantList));
            }
        } catch (error) {
            console.error("Error loading assistants:", error);
        }
    }, [loginId]);

    useEffect(() => {
        if (loginId) loadAssistants();
    }, [loginId, loadAssistants]);

    const fetchFAQ = async (assistantVal: string) => {
        setOpenInput(false)
        setIsReady(false)
        try {
            const resFAQ = await getFAQList("FAQ", assistantVal)
            if (resFAQ && resFAQ.length > 0) {
                await setFaqList(resFAQ)
                setOpenInput(true)
                setIsReady(true)
            } else {
                setFaqList([])
                setOpenInput(true)
                setShowSuggest(false)
            } 
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setOpenInput(true);
        }
    };

    useEffect(() => {
        const updatePlacement = () => {
            const el = anchorRef.current;

            if (!el) return;
            
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // เช็คว่า input อยู่ด้านล่างของหน้าจอ (ต่ำกว่า 60% ของหน้าจอ)
            const isInputAtBottom = rect.top > (windowHeight * 0.6);
            
            // เช็คว่าเป็นการใช้งานครั้งแรก (ยังไม่มีการ submit)
            const isFirstTime = !isSubmitted;
            
            // ถ้า input อยู่ด้านล่าง หรือเป็นการใช้งานครั้งแรก ให้ popup ขึ้นด้านบน
            setDropUp(isInputAtBottom || isFirstTime);
        };

        updatePlacement();
        window.addEventListener("resize", updatePlacement);
        window.addEventListener("scroll", updatePlacement, true);
        return () => {
            window.removeEventListener("resize", updatePlacement);
            window.removeEventListener("scroll", updatePlacement, true);
        };
    }, [showSuggest, suggestions.length, isSubmitted]);

    useEffect(() => {
        if (assistantName) {
            fetchFAQ(assistantName)

        }
    },[assistantName])

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
        
        if (!assistantName) {
            window.alert("กรุณาเลือก Assistance ก่อนสอบถาม");
            return;
        }

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

    if(!loginId) return null;

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
                        {!assistantName ? (
                            <div className="flex items-center"><p className="text-sm p-2 text-gray-400">📢 กรุณาเลือก Assistance ก่อนสอบถาม</p> <span className="text-rose-400">*</span></div>
                        ) : (
                            <>
                                {showSuggest && suggestions.length > 0 && (
                                    <div
                                        className={cn(
                                        "absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden py-2 px-2",
                                        "w-full sm:w-96 md:w-[500px] lg:w-[450px] xl:w-[500px]",
                                        dropUp ? "bottom-full mb-1" : "top-full mt-1"
                                        )}
                                    >
                                        <ul className="overflow-y-auto">
                                            {suggestions.map((item, index) => (
                                            <li key={item} className="list-none">
                                            <button
                                                ref={(el) => { suggestionRefs.current[index] = el; }}
                                                type="button"
                                                onClick={() => {
                                                    setQuestion(item);
                                                    setShowSuggest(false);
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
                                )}
                                <Textarea 
                                    value={previewValue || question}
                                    placeholder={!isReady ? "กำลังโหลดข้อมูล..." : "พิมพ์คำถามของคุณที่นี่..."} 
                                    className="border border-1 rounded-tl-xl rounded-tr-xl text-sm"
                                    disabled={!openInput}
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
                                
                        )} 
                        <div className="flex justify-between items-center">
                            <Select value={assistantName} onValueChange={(v) => setAssistantName(v.trim())}>
                                <SelectTrigger className="rounded-full px-4 border text-gray-700 cursor-pointer">
                                    <SelectValue placeholder="Assistance name" className="lg:text-sm xl:text-base"/>
                                </SelectTrigger>
                                <SelectContent className="h-90">
                                    {assistantList.map((val, index) => (
                                        <SelectItem 
                                            key={index} 
                                            value={val.trim()}
                                            className="lg:text-sm xl:text-base"
                                        >{val.trim()}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* <Button 
                                size={"sm"} 
                                variant={"secondary"}
                                className="rounded-full bg-slate-900 text-neutral-50 hover:bg-slate-800" 
                            >
                                <div  className="flex pr-1 items-center gap-1"><Send/><span>สอบถาม</span></div>
                            </Button> */}
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
                    </div>
                </div>
                
                {isSubmitted && (
                    <div className="pt-4 flex-1 overflow-y-auto">
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
                                    <CardTitle className="lg:text-sm xl:text-base">คำถาม : {yourQuestion}</CardTitle>
                                    <CardDescription>
                                        <Badge variant={"secondary"} className="bg-blue-200 text-blue-600 rounded-full px-3">
                                            {assistantName || "IT10 Service desk assistant"}
                                        </Badge>
                                    </CardDescription>
                                </CardHeader>
                                {responseData && (
                                    <>
                                        <CardContent>
                                            <CardTitle className="lg:text-sm xl:text-base">ตอบ :</CardTitle>
                                            <div className="whitespace-pre-line">
                                                <div dangerouslySetInnerHTML={{ __html: responseData.response }} className="lg:text-sm xl:text-base"/>
                                                <div>
                                                    {responseData.documents?.some(val => val?.url && val?.name) && <p className="text-sm xl:text-base font-semibold">เอกสาร :</p>}
                                                    <ul className="list-disc ml-4">
                                                        {responseData.documents
                                                            .filter(val => val?.url && val?.name)
                                                            .map((val, index) => (
                                                                <li key={index}>
                                                                <Link
                                                                    href={val.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-500 underline lg:text-sm xl:text-base"
                                                                >
                                                                    {val.name}
                                                                </Link>
                                                                </li>
                                                        ))}
                                                    </ul>
                                                </div>
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
            <div>
                <Card className="px-4 py-2 gap-1 text-xs bg-gray-100 border-none shadow-none ">
                    <div className="flex gap-2 items-center">
                        <AlertTitle className="text-orange-300 md:text-xs lg:text-xs xl:text-sm">คำเตือน: ข้อมูลที่ได้จาก เอไอ เซอร์วิสเดส นี้ เป็นเพียงคำแนะนำเบื้องต้น อาจมีขัอผิดพลาด ไม่เป็นปัจจุบัน หรือไม่สมบูรณ์ </AlertTitle>
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