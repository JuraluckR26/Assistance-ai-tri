"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { FAQBadge, FAQButton } from "./FAQ";
import { useEffect, useState } from "react";
import { fetchSearchDocument } from "@/lib/api/searchService";
import { DocumentItem } from "@/types/search.type";
import { Skeleton } from "@/components/ui/skeleton";
import Feedback from "./Feedback";

export default function InputSearch() {
    const [question, setQuestion] = useState<string>("")
    const [result, setResult] = useState<DocumentItem[]>([])
    const [yourQuestion, setYourQuestion] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        if (question.trim() === "") return

        setIsLoading(true)
        setIsSubmitted(true)

        try {
            const data = await fetchSearchDocument(question)
            setResult(data)
            console.log("data ", data)
            setYourQuestion(question)
        } catch (err) {
            console.error("Search failed", err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        console.log("Updated result:", result)
    }, [result])

    return (
        <>
            <div className="relative w-full md:max-w-4xl xl:max-w-5xl mb-4">
                <Input
                    type="text"
                    placeholder="Type your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full py-6 px-6 rounded-full bg-white border border-[#D9D9D9] shadow-lg shadow-blue-200/50"
                />
                <div className="absolute inset-y-0 right-2 bottom-0 flex items-center gap-2">
                    <FAQButton onSelect={(value) => setQuestion(value)}/>
                    <Button
                        size="icon"
                        onClick={handleSubmit}
                        className="bg-[#06283D] hover:bg-[#164563] text-white rounded-full"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            {isSubmitted && (
                <div className="relative w-full md:max-w-4xl xl:max-w-5xl">
                    <div className="p-4 bg-[#B4D4FF] rounded-md">
                        {isLoading ? (
                            <Skeleton className="w-full h-[50px] rounded-md" />
                        ) : (
                            <Card className="text-foreground overflow-y-auto max-h-[40vh] md:max-h-[45vh] xl:max-h-[45vh]">

                                <CardHeader>
                                    <CardTitle>
                                        <div>Your question : {yourQuestion}</div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="pb-3">Response</CardTitle>
                                    <CardDescription>
                                    {/* <div className="flex flex-col ...">
                                        <div>
                                            <a href="#" className="no-underline hover:underline ... text-blue-600 font-semibold">1 . TIS-PMG 018-2023 แจ้งจำหน่ายชุดกุญแจล็อคฝาท้าย มือเปิดฝาท้าย.pdf</a>
                                            <p>บริษัท ตรีเพชรอีซูซุเซลส์ แจ้งจำหน่ายมือเปิดฝาท้ายแบบมีกุญแจล็อก สำหรับอีซูซุ ดีแมคซ์ ปี 2020-ปัจจุบัน พร้อมชุดกุญแจล็อกและโบลต์ยึด รายละเอียด ราคาพร้อมวิธีติดตั้งและข้อควรระวังในการติดตั้งให้ครบถ้วน โดยมีเอกสารแนบคู่มือการติดตั้งให้ด้วย...</p>
                                        </div>
                                        <div>
                                            <a href="#" className="no-underline hover:underline ... text-blue-600 font-semibold">2 . TIS-PMG 018-2023 แจ้งจำหน่ายมือเปิดฝาท้ายแบบมีกุญแจล็อค และ ชุดกุญแจล็อคฝาท้าย.pdf</a>
                                            <p>บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด แจ้งจำหน่ายมือเปิดฝาท้ายแบบมีกุญแจล็อกสำหรับอีซูซุ ดีแมคซ์ พร้อมชุดกุญแจล็อคและโบลต์ยึด รายละเอียดการติดตั้ง และราคาอะไหล่มีให้ในเอกสาร พร้อมคำแนะนำการติดตั้งและการตรวจสอบการทำงานของกล้องมองหลังหลังติดตั้ง</p>
                                        </div>
                                        <div>
                                            <a href="#" className="no-underline hover:underline ... text-blue-600 font-semibold">3 . PMG-PB-ATB-2023 02 แนะนำรูปแบบพื้นปูกระบะที่จำหน่ายปี 2020-ปัจจุบัน.pdf</a>
                                            <p>เอกสารภายในนี้แนะนำรูปแบบพื้นปูกระบะ ISUZU ที่จำหน่ายตั้งแต่ปี 2020 โดยมีรายละเอียดเกี่ยวกับลักษณะสินค้าและโลโก้ที่สำคัญ เช่น แบบมีขอบและ ไม่มีขอบ รวมถึงห่วงสำหรับผูกยึดสัมภาระ พร้อมข้อมูลการติดต่อบริษัท ตรีเพชรอีซูซุเซลส์ จำกัด</p>
                                        </div>
                                        <div>
                                            <a href="#" className="no-underline hover:underline ... text-blue-600 font-semibold">4 . TIS-PMG 051-2023 แจ้งจำหน่าย พื้นปูกระบะตัดขอบ อีซูซุดีแมคซ์ รุ่นปี 2024 (โลโก้ D-MAX ).pdf</a>
                                            <p>เอกสารภายในนี้แนะนำรูปแบบพื้นปูกระบะ ISUZU ที่จำหน่ายตั้งแต่ปี 2020 โดยมีรายละเอียดเกี่ยวกับลักษณะสินค้าและโลโก้ที่สำคัญ เช่น แบบมีขอบและ ไม่มีขอบ รวมถึงห่วงสำหรับผูกยึดสัมภาระ พร้อมข้อมูลการติดต่อบริษัท ตรีเพชรอีซูซุเซลส์ จำกัด</p>
                                        </div>
                                    </div> */}
                                    {result.map((item, index) => (
                                        <div key={item.link || index} className="flex flex-col ...">
                                            <div className="mb-2">
                                                <a href={item.link} className="text-blue-600 font-semibold hover:underline">
                                                    {index + 1}. {item.title}
                                                </a>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex flex-row-reverse ...">
                                    <Feedback/>
                                    {/* <Button className="ml-2 bg-gray-400 hover:bg-gray-500" variant="default" size="icon"><ThumbsDown/></Button>
                                    <Button className="bg-lime-600 hover:bg-lime-700" variant="default" size="icon"><ThumbsUp/></Button> */}
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}