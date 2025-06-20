"use client"

import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HeaderPage() {
    const pathname = usePathname();
    
    const menuMap: Record<string, string> = {
        "/search": "Ask Khun Jai Dee (ธุรกิจหลังการขาย, เทเลเทค)",
        "/chatbot": "Chat bot",
    }
      
    const pageTitle = menuMap[pathname] || "หน้าแรก"

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-2">
                <SidebarTrigger className="cursor-pointer" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#"><Home size={14}/></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}