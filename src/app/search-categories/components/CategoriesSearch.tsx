"use client"

import { Bot, Car, ChevronDown, File, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { CATEGORIES } from "@/lib/data"

export type SelectedCategory = {
  key: string;      
  cat: string;   
  sub?: string;   
  subKey?: string;  
}

type CategoriesSearchProps = {
  selected: SelectedCategory;
  onChange: (value: SelectedCategory) => void;
}

export function CategoriesSearch({ selected, onChange }: CategoriesSearchProps) {
    const [open, setOpen] = useState(false)

    const getStyleCategories = (key?: string, value?: string, sub?: string) => {

        switch (key) {
            case "After_sales_business":
                return <div className="flex items-center gap-2 text-[12px]"><div className="box-border size-6 p-1 bg-red-100 rounded-full flex items-center justify-center"><File color="#EF4444" className="size-3.5"/></div> <span className="">{value}</span>{sub && <div className="flex gap-2"><span className="">-</span><span className="">{sub}</span></div>}</div>
            case "Teletech":
                return <div className="flex items-center gap-2 text-[12px]"><div className="box-border size-6 p-1 bg-orange-100 rounded-full flex items-center justify-center"><Bot color="#F97316"/></div> <span className="">{value}</span>{sub && <div className="flex gap-2"><span className="">-</span><span className="">{sub}</span></div>}</div>
            case "cat3":
                return <div className="flex items-center gap-2 text-[12px]"><div className="box-border size-6 p-1 bg-green-100 rounded-full flex items-center justify-center"><Car color="#22C55E"/></div> <span className="">{value}</span>{sub && <div className="flex gap-2"><span className="">-</span><span className="">{sub}</span></div>}</div>
            case "cat4": 
                return <div className="flex items-center gap-2 text-[12px]"><div className="box-border size-6 p-1 bg-blue-100 rounded-full flex items-center justify-center"><Wrench color="#3B82F6"/></div> <span className="">{value}</span>{sub && <div className="flex gap-2"><span className="">-</span><span className="">{sub}</span></div>}</div>
            default:
                return <div className="flex items-center gap-2 text-[12px]"><div className="box-border size-6 p-1 bg-gray-200 rounded-full flex items-center justify-center font-semibold"><span className="">All</span></div> <span className="text-xs"> {value}</span> </div>
        }
    }

  return (
    <div className="flex items-start gap-1 sm:flex-row sm:items-center">
        <span className="text-[12px] text-gray-400">ค้นหาเรื่อง :</span>

        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="pl-1 rounded-full bg-gray-50 text-xs" size={"sm"}>
                    <div className="flex items-center gap-2">
                        {getStyleCategories(selected.key, selected.cat, selected.sub)}
                        <ChevronDown/>
                    </div>
                    
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>เลือกหัวข้อค้นหา</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {CATEGORIES.map(cat => (  
                        <div key={cat.key}>
                            {cat.children.length > 0 ? (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <span className="flex items-center gap-2">
                                            {cat.icon === "all" && <div className="box-border size-6 p-1 bg-gray-200 rounded-full flex items-center justify-center"><span className="text-[11px]">All</span></div>}
                                            {cat.icon === "file" && <div className="box-border size-6 bg-red-100 p-1 rounded-full flex items-center justify-center"><File color="#EF4444" className="size-3.5"/></div>}
                                            {cat.icon === "bot" && <div className="box-border size-6 bg-orange-100 p-1 rounded-full flex items-center justify-center"><Bot color="#EF4444" className="size-4"/></div>}
                                            {cat.icon === "car" && <div className="box-border size-6 bg-green-100 p-1 rounded-full flex items-center justify-center"><Car color="#22c55e" className="size-4"/></div>}
                                            {cat.icon === "wrench" && <div className="box-border size-6 bg-blue-100 p-1 rounded-full flex items-center justify-center"><Wrench color="#2563eb" className="size-4"/></div>}
                                            {cat.label}
                                        </span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="px-2">
                                        {cat.children.map(sub => (
                                            <DropdownMenuItem
                                                key={sub.key}
                                                onClick={() => {
                                                    onChange({ key: cat.key, cat: cat.label, sub: sub.label, subKey: sub.key })
                                                    setOpen(false)
                                                }}
                                            >
                                                {sub.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>

                                </DropdownMenuSub>
                            ):(
                                <DropdownMenuItem
                                    key={cat.key}
                                    onClick={() => {
                                        if (!cat.children.length) {
                                            onChange({ key: cat.key, cat: cat.label, sub: "", subKey: "" })
                                            setOpen(false)
                                        }
                                    }}
                                >
                                    <span className="flex items-center gap-2">
                                        {cat.icon === "all" && <div className="box-border size-6 p-1 bg-gray-200 rounded-full flex items-center justify-center"><span className="text-[11px]">All</span></div>}
                                        {cat.icon === "file" && <div className="box-border size-6 bg-red-100 p-1 rounded-full flex items-center justify-center"><File color="#EF4444" className="size-3.5"/></div>}
                                        {cat.icon === "bot" && <div className="box-border size-6 bg-orange-100 p-1 rounded-full flex items-center justify-center"><Bot color="#EF4444" className="size-4"/></div>}
                                        {cat.icon === "car" && <div className="box-border size-6 bg-green-100 p-1 rounded-full flex items-center justify-center"><Car color="#22c55e" className="size-4"/></div>}
                                        {cat.icon === "wrench" && <div className="box-border size-6 bg-blue-100 p-1 rounded-full flex items-center justify-center"><Wrench color="#2563eb" className="size-4"/></div>}
                                        {cat.label}
                                    </span>
                                </DropdownMenuItem>
                            )}
                            
                        </div>
                        
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
