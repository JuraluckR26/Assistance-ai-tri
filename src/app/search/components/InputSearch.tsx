"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, PackageSearch, Send } from "lucide-react";
import { FAQButton } from "./FAQ";
import { useEffect, useRef, useState } from "react";
import { searchKhunJaiDee } from "@/lib/api/searchService";
import { DocumentItem, RequestFeedback, RequestSearch } from "@/types/search.type";
import Loader from "@/components/shared/loading";
import { setFormatFromSearch } from "@/utils/formatting";
import { useAuth } from "@/context/auth-context";
import { FcReading } from "react-icons/fc";
import Feedback from "@/components/shared/Feedback";
import { Separator } from "@/components/ui/separator";

export default function InputSearch() {
    const [question, setQuestion] = useState<string>("")
    const [results, setResults] = useState<DocumentItem[]>([])
    const [relatedResults, setRelatedResults] = useState<DocumentItem[]>([])
    const [yourQuestion, setYourQuestion] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [feedbackData, setFeedbackData] = useState<RequestFeedback>()
    const [emptyView, setEmptyView] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const { loginId } = useAuth()
    const [openDocList, setOpenDocList] = useState<boolean>(false)
    
    function checkEmptyResponse(data: {Response?: string; SearchDocument?: string; SearchDocumentLocation?: string;}): boolean {
        return (
            !data.Response?.trim() &&
            !data.SearchDocument?.trim() &&
            !data.SearchDocumentLocation?.trim()
        );
    }

    const handleSubmit = async () => {
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
                loginId: loginId
            };

            const data = await searchKhunJaiDee(payload)

            if(typeof data === "string") return

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
                    sender: loginId,
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
    }

    const handleOpenDoc = () => setOpenDocList(prev => !prev)
    
    useEffect(() => {
    }, [results, relatedResults])

    return (
        <>
            <div className="relative w-full md:max-w-4xl xl:max-w-5xl mb-4">
                <Input
                    type="text"
                    placeholder="ระบุคำค้นหา..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    ref={inputRef}
                    className="w-full py-6 px-6 pr-40 md:pr-40 xl:pr-40 rounded-full bg-white border border-[#D9D9D9] shadow-lg shadow-blue-200/50"
                />
                <div className="absolute inset-y-0 right-2 bottom-0 flex items-center gap-2">
                    <div onKeyDown={(e) => e.stopPropagation()}>
                        
                    </div>
                    <FAQButton 
                        onSelect={(value) => {
                            if (!isLoading) {
                                setQuestion(value);
                            }
                        }}
                        inputRef={inputRef}
                    />
                    <Button
                        size="icon"
                        onClick={handleSubmit}
                        className="bg-[#1E90FF] hover:bg-[#164563] text-white rounded-full cursor-pointer"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {isSubmitted && (
                <div className="relative w-full md:max-w-4xl xl:max-w-5xl">
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
                                                            <a 
                                                                href={item.link}
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 font-semibold hover:underline"
                                                            >
                                                                {index + 1}. {item.title}
                                                            </a>
                                                            <p className="line-clamp-2">{item.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardDescription>
                                            {relatedResults.length > 0 && (
                                                <>
                                                    <Separator className="my-4" />
                                                    <Button 
                                                        className="rounded-full cursor-pointer bg-[#4D77FF]/20 text-[#4D77FF] hover:bg-[#4D77FF]/20 mb-3"
                                                        onClick={handleOpenDoc}
                                                        >
                                                        <PackageSearch /> เอกสารเพิ่มเติมที่อาจเกี่ยวข้องกับสิ่งที่คุณสนใจ {!openDocList ? <ChevronUp /> : <ChevronDown />}
                                                    </Button>

                                                    {openDocList && (
                                                        <CardDescription>
                                                            {relatedResults.map((item, index) => (
                                                                <div key={item.title ?? index} className="flex flex-col ...">
                                                                    <div className="mb-2">
                                                                        <a 
                                                                            href={item.link}
                                                                            target="_blank" 
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-600 font-semibold hover:underline"
                                                                        >
                                                                            {index + 1}. {item.title}
                                                                        </a>
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