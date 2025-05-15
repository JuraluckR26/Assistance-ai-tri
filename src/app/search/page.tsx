import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, MessageCircleQuestion, Newspaper, Send, Slash, ThumbsDown, ThumbsUp } from "lucide-react";
import InputSearch from "./components/InputSearch";
import Resent from "./components/Resent";

export default function Page() {
    return (
        <main className="w-full">
            <header>
                {/* <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/search"><Home size={14}/></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                        <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Ask Khun Jai Dee</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb> */}
            </header>
            <div className="w-full py-0 px-0 flex flex-col items-center">
                <h1 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-[#EC221F] via-[#9053A1] to-[#4D77FF] bg-clip-text text-transparent">
                    สวัสดี :D ให้ฉันช่วยอะไรคุณดี?
                </h1>
                <InputSearch/>
                <Resent/>
            </div>
        </main>
    )
}