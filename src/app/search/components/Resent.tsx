'use client';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { getResent } from "@/lib/api/searchService";
import { mapResentResponse } from "@/lib/mapper/search.mapper";
import { DocumentItem, ResponseResent } from "@/types/search.type";
import { Loader, Newspaper } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Resent() {
    const [recent, setRecent] = useState<DocumentItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [emptyView, setEmptyView] = useState<boolean>(false)

    function checkResponse(data: unknown): data is ResponseResent {
        return (
            typeof data === "object" &&
            data !== null &&
            "Response" in data &&
            "SearchDocument" in data &&
            "SearchDocumentLocation" in data &&
            "Date" in data
        );
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const data = await getResent();
    
                if (typeof data === "string") {
                    setEmptyView(true);
                } else if (checkResponse(data)) {
                    const result = mapResentResponse(data);
                    setRecent(result);
                    setEmptyView(result.length === 0);
                } else {
                    console.warn("Unexpected response format", data);
                    setEmptyView(true);
                }
            } catch(error) {
                console.error("Error fetching resent:", error);
                setEmptyView(true);
            } finally {
                setIsLoading(false);
            }
            
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="relative w-full md:max-w-4xl xl:max-w-5xl">
                <div className="flex flex-row gap-2 pt-3 pb-3">
                    <Newspaper/> 
                    <h4 className="font-bold">ข่าวสารล่าสุด</h4>
                </div>
                <div className="p-2 bg-[#F5F5F5] rounded-md ...">
                    <div className="flex flex-col gap-2">
                        {isLoading ? (
                            <div className="flex justify-center items-center min-h-[100px]">
                                <Loader />
                            </div>
                        ) : emptyView ? (
                            <div className="flex justify-center">
                                <div className="flex items-center gap-2 px-6 py-4">
                                    <Image src="/images/no-data.png" alt="icon" width={40} height={20}/>
                                    <p>ยังไม่ข้อมูลมีข่าวสาร</p>
                                </div>
                            </div>
                        ) : (
                         <>
                            {recent.map((item, index) => (
                                <Card key={item.link || index}>
                                    <CardContent>
                                        <CardTitle className="mb-2">
                                            <a 
                                                href={item.link} 
                                                target="_blank" 
                                                className="no-underline hover:underline text-blue-600 font-semibold line-clamp-2"
                                            >{index + 1}. {item.title}</a>
                                            <p className="font-normal text-gray-400 mt-1">{item.date}</p>
                                        </CardTitle>
                                        <CardDescription>
                                            <p className="line-clamp-2">{item.description}</p>
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                         </>
                        )}
                    
                    </div>
                </div>
            </div>
        </>
    )
}