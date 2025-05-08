"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { FAQButton } from "./FAQ";
import { useEffect, useState } from "react";
import { fetchSearchDocument, mockFetchSearchDocument } from "@/lib/api/searchService";
import { DocumentItem, RequestFeedback } from "@/types/search.type";
import { Skeleton } from "@/components/ui/skeleton";
import Feedback from "./Feedback";
import { mapRawToDocumentItems } from "@/lib/mapper/search.mapper";
import Loader from "@/components/loading";

export default function InputSearch() {
    const [question, setQuestion] = useState<string>("")
    const [result, setResult] = useState<DocumentItem[]>([])
    const [yourQuestion, setYourQuestion] = useState<string>("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [feedbackData, setFeedbackData] = useState<RequestFeedback>()

    const handleSubmit = async () => {
        if (question.trim() === "") return

        setIsLoading(true)
        setIsSubmitted(true)

        try {
            // const data = await mockFetchSearchDocument(question)
            const data = await fetchSearchDocument(question)
            setResult(mapRawToDocumentItems(data))
            setYourQuestion(question)
            const feedbackObj: RequestFeedback = {
                sender: "Test",
                searchText: question,
                resultText: data.Response,
                document: data.SearchDocument,
                documentLocation: data.SearchDocumentLocation,
            }
            setFeedbackData(feedbackObj)
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
                    <div className="p-2 bg-[#B4D4FF] rounded-md">
                        {isLoading ? (
                            <>
                                <div className="relative w-full min-h-[80px]">
                                    <div className="absolute inset-0 flex items-center justify-center -translate-y-2">
                                        <Loader />
                                    </div>
                                </div>

                                {/* <Skeleton className="w-full min-h-[80px] rounded-md flex items-center justify-center">
                                    <div className="mb-5">
                                        <Loader />
                                    </div>
                                </Skeleton> */}
                            </>

                        ) : (
                            <Card className="text-foreground">

                                <CardHeader>
                                    <CardTitle>
                                        <div>คำถามของคุณ : {yourQuestion}</div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="pb-3">ตอบ :</CardTitle>
                                    <CardDescription>
                                    {result.map((item, index) => (
                                        <div key={item.link || index} className="flex flex-col ...">
                                            <div className="mb-2">
                                                <a 
                                                    href={item.link}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 font-semibold hover:underline"
                                                >
                                                    {index + 1}. {item.title}
                                                </a>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex flex-row-reverse ...">
                                    {feedbackData && <Feedback dataProps={feedbackData} />}
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}