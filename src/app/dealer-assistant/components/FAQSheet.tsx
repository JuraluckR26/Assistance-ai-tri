import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, MessageCircleQuestion, SearchIcon } from "lucide-react";

export function FAQSheet({ items }: { items: { id: string; q: string; a: React.ReactNode }[] }) {
    return (
        <>
            <Sheet>
                <SheetTrigger><div className="w-10 h-10 rounded-full place-items-center content-center bg-gray-800 text-white"><MessageCircleQuestion/></div></SheetTrigger>
                <SheetContent className="bg-gradient-to-b from-white to-blue-50 rounded-tl-xl rounded-bl-xl">
                    <SheetHeader className="pb-0">
                        <SheetTitle>คำถามที่พบบ่อย ?</SheetTitle>
                        <SheetDescription>
                            เลือกคำค้นหาที่แนะนำ เพื่อดูรายละเอียด หรือสามารถค้นหาคำ แนะนำในช่อง “ค้นหาคำถาม” ได้
                        </SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        <InputGroup>
                            <InputGroupInput placeholder="Search..." />
                            <InputGroupAddon>
                            <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        <div className="relative md:max-h-[400px] lg:max-h-[400px] xl:max-h-[700px] overflow-y-auto">
                            <Accordion type="single" collapsible className="space-y-1 pt-4">
                                {items.map((it) => (
                                    <AccordionItem 
                                        key={it.id} 
                                        value={it.id} 
                                        className="
                                            border rounded-md px-3
                                            bg-slate-200 text-slate-800
                                            border-transparent hover:border-slate-300
                                            hover:bg-slate-100
                                            focus-within:border-slate-300
                                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50
                                            data-[state=open]:bg-slate-200/50
                                            transition-colors
                                        "
                                    >

                                        {/* ========== TRIGGER ========== */}
                                        <AccordionTrigger
                                            className="py-2 group [&>svg]:hidden"
                                            // className={`
                                            //     group w-full rounded-md bg-slate-200 text-slate-800
                                            //     border border-slate-200/70 shadow-sm
                                            //     px-3 py-2 text-left transition-all
                                            //     hover:bg-slate-100 hover:shadow
                                            //     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
                                            //     data-[state=open]:bg-slate-200/60
                                            //     [&>svg]:hidden  /* ซ่อนไอคอน default ของ shadcn */
                                            // `}
                                        >
                                            <div className="flex w-full items-center gap-3">
                                                {/* ลูกศรซ้ายในเม็ดแคปซูล + หมุนเมื่อเปิด */}
                                                <span
                                                    className="
                                                        transition-transform duration-200
                                                        group-data-[state=open]:rotate-90
                                                    "
                                                >
                                                    <ChevronRight className="h-3.5 w-3.5" />
                                                </span>

                                                <span className="truncate max-w-[280px]">{it.q}</span>
                                            </div>
                                        </AccordionTrigger>

                                        {/* ========== CONTENT ========== */}
                                        <AccordionContent
                                            className="rounded-md pl-1 text-slate-600 leading-relaxed"
                                        >
                                            {it.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                    <div className="pl-4 text-sm text-slate-600">
                        คุณไม่พบคำถามที่ต้องการ?{" "}
                        <a className="text-blue-600 hover:underline" href="#">ติดต่อเจ้าหน้าที่</a>
                    </div>
                </SheetContent>
            </Sheet>  
        </>
    )
}