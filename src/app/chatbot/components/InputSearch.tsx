"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Feedback from "./Feedback";
import FAQButton from "./FAQ";
import { searchChat } from "@/lib/api/chatbotService";
import { MappedSearchResponse, RequestSearchChat } from "@/types/chatbot.type";
import { assistantList } from "@/lib/data";
import Loader from "@/components/loading";
import { mapSearchChatResponse } from "@/utils/chatbot.function";

export default function InputSearch() {
    const [question, setQuestion] = useState<string>("")
    const [assistance, setAssistance] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [responseData, setResponseData] = useState<MappedSearchResponse>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [yourQuestion, setYourQuestion] = useState<string>("")

    const handleSubmit = async () => {
        if (question.trim() === "") return
        
        if (!assistance) {
            window.alert("กรุณาเลือก Assistance ก่อนสอบถาม");
            return;
        }

        setIsLoading(true)
        setIsSubmitted(true)
        try {
            const searchObj: RequestSearchChat = {
                assistantName: assistance,
                question: question
            }
            console.log("val be call: ", searchObj)
            const data = await searchChat(searchObj)
            const mapped = mapSearchChatResponse(data);
            setResponseData(mapped)
            setYourQuestion(question)
            console.log("val af call: ", data)
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
                    <h1 className="text-3xl font-semibold text-center pb-2 bg-gradient-to-r from-[#723881] to-[#007AFF] bg-clip-text text-transparent">
                        เริ่มสร้างแชทใหม่ของคุณได้เลย
                    </h1>
                    <p className="text-slate-400 text-center">อย่าลืมเลือก Assistance เพื่อการตอบคำถามได้อย่างถูกต้องตรงประเด็น</p>
                    <Image src="/images/chat.png" alt="icon" width={200} height={100} className="py-6 mx-auto opacity-30 w-auto h-auto" priority/>
                </>
            )}
            <div className="bg-white rounded-[32px] shadow-md shadow-blue-200/50 p-4 flex flex-col gap-2 w-full border border-gray-200">
                <Textarea 
                    value={question}
                    placeholder="ระบุคำถามของคุณที่นี่..." 
                    className="border-none"
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
                        {/* <Button className="rounded-full px-6 border-2 border-pink-500" variant={"outline"}>
                            ค้นหา <ArrowUpRight/>
                        </Button> */}
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
                                            <div>{responseData.response}</div>
                                            <div>
                                                <p>เอกสาร :</p>
                                                <ul className="list-disc ml-4">
                                                {responseData.documents.map((val, index) => {
                                                    return (
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
                                                    );
                                                })}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-row-reverse">
                                        <Feedback/>
                                    </CardFooter>
                                </>
                            )}

                            {/* <CardContent>
                                <CardTitle>ตอบ :</CardTitle>
                                <>
                                    <div className="grid grid-cols-1 gap-y-2">
                                        <div>
                                            คุณสามารถตรวจสอบสถานะของ ISP Contract ได้โดยใช้ T-Code VA43 ตามขั้นตอนดังนี้:
                                        </div>
                                        <div>
                                            <p>1. เข้า T-Code VA43 (Display Contract: Initial Screen)</p>
                                            <p>2. กรอกข้อมูลเลขที่สัญญา (Contract No.) ที่คุณต้องการตรวจสอบ</p>
                                            <p>3. คลิกที่ปุ่มเพื่อแสดงข้อมูลสัญญา</p>
                                            <p>4. จากนั้นเลือกแท็บ "Status" เพื่อดูสถานะของ ISP Contract</p>
                                        </div>
                                        <div>
                                            <p>หากคุณต้องการตรวจสอบ log การแก้ไขสถานะในแท็บนี้ คุณสามารถทำตามขั้นตอนเพิ่มเติมที่ได้อธิบายไว้ในคำตอบก่อนหน้านี้ได้เช่นกันค่ะ</p>
                                        </div>
                                        <div>
                                            <p>หากคุณมีคำถามเพิ่มเติมหรือพบปัญหาใด ๆ สามารถสอบถามได้เลยค่ะ!</p>
                                        </div>
                                        <div>
                                            <p>เอกสาร :</p>
                                            <li>
                                                <a className="text-blue-500">ISP Question and answer for MS-CMF.xlsx,วิธีการตรวจสอบสถานะการสมัคร ISP บนระบบ IT10.docx,UM-ASS-WTY-018 ISP Sales Process.docx,IT10_jira_clarifications5.xlsx</a>
                                            </li>
                                            <li>
                                                <a className="text-blue-500">ISP Question and answer for MS-CMF.xlsx,วิธีการตรวจสอบสถานะการสมัคร ISP บนระบบ IT10.docx,UM-ASS-WTY-018 ISP Sales Process.docx,IT10_jira_clarifications5.xlsx</a>
                                            </li>
                                        </div>
                                    </div>
                                </>
                            </CardContent>
                            <CardFooter className="flex flex-row-reverse">
                                <Feedback/>
                            </CardFooter> */}
                        </Card>
                    )}
                    </div>
                </div>
            )}
        </div>
    )
}