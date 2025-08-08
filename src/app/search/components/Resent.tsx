'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { getResent } from "@/lib/api/searchService";
import { DocumentItem } from "@/types/search.type";
import { setFormatFromResent } from "@/utils/formatting";
import { Loader, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Resent() {
    const [recent, setRecent] = useState<DocumentItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [emptyView, setEmptyView] = useState<boolean>(false)

    const fetchResent = async () => {
        setIsLoading(true);
        try {
            const data = await getResent();
            if (data.Response === "" && data.SearchDocument === "" && data.SearchDocumentLocation === "" && data.Date === "") {
                setEmptyView(true);
            }

            const result = await setFormatFromResent(data);
            setRecent(result);
            localStorage.setItem("resent", JSON.stringify(result));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching resent:", error);
            setEmptyView(true);
        }
    }

    useEffect(() => {
        const localResent = localStorage.getItem('resent');
        
        if (!localResent) {
            fetchResent();
        } else {
            setRecent(JSON.parse(localResent));
            setIsLoading(false);
        }

    }, []);

    return (
        <>
            <div className="relative w-full md:max-w-4xl xl:max-w-5xl">
                <div className="flex justify-between items-center py-2">
                    <div className="flex flex-row gap-2">
                        <Newspaper/> 
                        <h4 className="font-bold">ข่าวสารล่าสุด</h4>
                    </div>
                    <div>
                        <Button variant={"link"} className="cursor-pointer text-blue-700" asChild>
                            <Link href={"http://172.30.84.149:18090/pages/viewpage.action?pageId=15377435"} target="_blank">ดูข่าวสารเพิ่มเติม</Link>
                        </Button>
                    </div>
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
                                            <Link 
                                                href={item.link} 
                                                target="_blank" 
                                                className="no-underline hover:underline text-blue-600 font-semibold line-clamp-2"
                                            >{index + 1}. {item.title}</Link>
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