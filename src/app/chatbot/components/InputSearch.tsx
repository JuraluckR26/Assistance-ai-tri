"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import FAQButton from "./FAQ";
import { searchChat } from "@/lib/api/chatbotService";
import { MappedSearchResponse, RequestSearchChat } from "@/types/chatbot.type";
import { assistantList } from "@/lib/data";
import { setFormatFromSearchChat } from "@/utils/chatbot.function";
import { BsChatDotsFill } from "react-icons/bs";
import { RequestFeedback } from "@/types/search.type";
import { useAuth } from "@/context/auth-context";
import Feedback from "@/components/Feedback";
import Loader from "@/components/loading";

export default function InputSearch() {
    const [question, setQuestion] = useState<string>("")
    const [assistance, setAssistance] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [responseData, setResponseData] = useState<MappedSearchResponse>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [yourQuestion, setYourQuestion] = useState<string>("")
    const [feedbackData, setFeedbackData] = useState<RequestFeedback>()
    const { loginId } = useAuth()

    const handleSubmit = async () => {
        if (question.trim() === "") return
        
        if (!assistance) {
            window.alert("กรุณาเลือก Assistance ก่อนสอบถาม");
            return;
        }

        setIsLoading(true)
        setIsSubmitted(true)
        setFeedbackData(undefined);     

        try {
            const searchObj: RequestSearchChat = {
                assistantName: assistance,
                question: question
            }
            const data = await searchChat(searchObj)

            if(typeof data === "string") return

            const mapped = setFormatFromSearchChat(data);

            setResponseData(mapped)
            setYourQuestion(question)

            const feedbackObj: RequestFeedback = {
                sender: loginId,
                searchText: question,
                resultText: data.Response,
                document: data.SearchDocument,
                documentLocation: data.SearchDocumentLocation,
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
    }

    return (
        <div>
            {!isSubmitted && (
                <>
                    <p className="text-lg md:text-2xl lg:text-3xl font-semibold text-center pb-2 bg-gradient-to-r from-[#723881] to-[#007AFF] bg-clip-text text-transparent">
                        เริ่มสร้างแชทใหม่ของคุณได้เลย
                    </p>
                    <p className="text-sm text-slate-400 text-center">อย่าลืมเลือก Assistance เพื่อการตอบคำถามได้อย่างถูกต้องตรงประเด็น</p>
                    <BsChatDotsFill size={250} color="#1d8ffe" className="py-6 mx-auto opacity-20 w-auto h-auto"/>
                </>
            )}
            <div className="bg-white rounded-3xl shadow-md shadow-blue-200/50 p-3 flex flex-col gap-2 w-full border border-gray-200">
                <Textarea 
                    value={question}
                    placeholder="ระบุคำถามของคุณที่นี่..." 
                    className="border-none rounded-tl-xl rounded-tr-xl"
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />

                <div className="flex justify-between items-center">
                    <Select value={assistance} onValueChange={setAssistance}>
                        <SelectTrigger className="rounded-full px-4 border text-gray-700 cursor-pointer">
                            <SelectValue placeholder="Assistance name" />
                        </SelectTrigger>
                        <SelectContent>
                            {assistantList.map((val) => (
                                <SelectItem 
                                    key={val.key} 
                                    value={val.text}
                                    onClick={() => setAssistance(val.text)}
                                >{val.text}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex gap-2 items-center">
                        <FAQButton/>

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
            {isSubmitted && (
                <div className="pt-4">
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
                                <CardDescription>
                                    <Badge variant={"secondary"} className="bg-blue-200 text-blue-600 rounded-full px-3">
                                        {assistance}
                                    </Badge>
                                </CardDescription>
                            </CardHeader>
                            {responseData && (
                                <>
                                    <CardContent>
                                        <CardTitle>ตอบ :</CardTitle>
                                        <div className="whitespace-pre-line">
                                            <div dangerouslySetInnerHTML={{ __html: responseData.response }} />
                                            <div>
                                                {responseData.documents?.some(val => val?.url && val?.name) && <p>เอกสาร :</p>}
                                                <ul className="list-disc ml-4">
                                                    {responseData.documents
                                                        .filter(val => val?.url && val?.name)
                                                        .map((val, index) => (
                                                            <li key={index}>
                                                              <a
                                                                href={val.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-500 underline"
                                                              >
                                                                {val.name}
                                                              </a>
                                                            </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-row-reverse">
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
    )
}