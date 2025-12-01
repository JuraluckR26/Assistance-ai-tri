import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Search } from "lucide-react";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { FAQ_DATA, type ContentBlock } from "@/lib/data";

export function FAQcontent () {
    const [value, setValue] = useState("")
    const [keyword, setKeyword] = useState("");

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        setKeyword(value.trim());
    };

    // รวมข้อความของแต่ละ FAQ เพื่อค้นหาแบบ case-insensitive
    const filteredFAQs = useMemo(() => {
        const kw = keyword.toLowerCase();
        if (!kw) return FAQ_DATA;
        const stripMd = (s: string) => s.replaceAll("**", "")
        return FAQ_DATA.filter((faq) => {
            const parts: string[] = [faq.title];
            faq.blocks.forEach((b: ContentBlock) => {
                if (b.type === "p") parts.push(b.text);
                if (b.type === "ul" || b.type === "ol") parts.push(...b.items);
            });
            const haystack = stripMd(parts.join(" ").toLowerCase());
            return haystack.includes(kw);
        });
    }, [keyword]);

    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // ไฮไลต์ string (ใช้กับ title)
    const highlightPlain = (text: string, kw: string) => {
        if (!kw) return text;
        const re = new RegExp(`(${escapeRegExp(kw)})`, "gi");
        return text.replace(re, `<mark class="bg-yellow-200 px-0 rounded">$1</mark>`);
    };

    // ไฮไลต์ HTML โดย “ไม่ทำลายแท็ก” (ใช้กับ blocks)
    const highlightHTML = (html: string, kw: string) => {
        if (!kw) return html;
        const re = new RegExp(`(${escapeRegExp(kw)})`, "gi");

        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
        const root = doc.body.firstElementChild!;

        const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const toReplace: Text[] = [];
        let cur: Node | null;
        while ((cur = walker.nextNode())) {
            if ((cur as Text).nodeValue && re.test((cur as Text).nodeValue!)) {
                toReplace.push(cur as Text);
            }
            re.lastIndex = 0;
        }

        toReplace.forEach((textNode) => {
            const parent = textNode.parentNode!;
            const parts = textNode.nodeValue!.split(re);
            const frag = doc.createDocumentFragment();
            parts.forEach((part, i) => {
            if (i % 2 === 1) {
                const mark = doc.createElement("mark");
                mark.className = "bg-yellow-200 px-0 rounded";
                mark.textContent = part;
                frag.appendChild(mark);
            } else {
                frag.appendChild(doc.createTextNode(part));
            }
            });
            parent.replaceChild(frag, textNode);
        });

        return root.innerHTML;
    };


    return (
        <>
            <Card className="py-3">
                <CardContent>
                    <div className="grid grid-flow-col grid-cols-7">
                        <div className="row-span-4">
                            <Image src="/images/human_think.png" alt="icon" width={100} height={100}/>
                        </div>

                        <div className="col-span-6 flex flex-col justify-between h-full">
                            <div>
                                <h1 className="font-semibold">คำถามที่พบบ่อย (FAQs)</h1>
                                <p className="text-gray-400 text-sm">
                                    เลือกคำถามที่แนะนำ เพื่อดูรายละเอียด หรือสามารถค้นหาหัวข้อที่คุณสนใจจากช่อง “ค้นหาคำถาม” ได้ค่ะ
                                </p>

                                {keyword ? (
                                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500 px-4">
                                        <span>ผลลัพธ์ {filteredFAQs.length} รายการ สำหรับ “{keyword}”</span>
                                        <button
                                            onClick={() => {
                                                setKeyword("");
                                                setValue("");
                                            }}
                                            className="underline underline-offset-2 hover:text-slate-700"
                                        >
                                            ล้างคำค้นหา
                                        </button>
                                    </div>
                                ) : <br/>}

                                <form onSubmit={handleSearch} className="w-full">
                                    <div className="flex items-center bg-white rounded-full border border-slate-200 shadow-sm pl-4 pr-1 py-0.5">
                                        <Search className="w-5 h-5 text-slate-400 mr-2" />
                                        <Input
                                            placeholder="ค้นหาคำถาม"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm px-0 flex-1"
                                        />
                                        <Button
                                            type="submit"
                                            size="sm"
                                            className="rounded-full text-sm bg-[#2F80FF] hover:bg-[#2F80FF]/90 whitespace-nowrap"
                                        >
                                            ค้นหา
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="relative md:max-h-[400px] lg:max-h-[580px] xl:max-h-[580px] overflow-y-auto">
                <Accordion type="single" collapsible>
                    {filteredFAQs.map((faq, index) => (
                        <AccordionItem key={faq.id} value={`q${faq.id}`} className="border-0 pb-1.5">
                            <div className="bg-blue-50 rounded-2xl px-1">
                                <AccordionPrimitive.Header className="w-full">
                                    <AccordionPrimitive.Trigger asChild>
                                        <button
                                            className="
                                                group w-full flex items-center justify-between
                                                rounded-[24px] px-3 py-2
                                                text-left text-slate-900 text-sm
                                                hover:no-underline no-underline
                                                focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300
                                            "
                                        >
                                            <span className="flex items-center gap-3">
                                                <span
                                                    className="
                                                        inline-flex h-9 w-9 shrink-0 items-center justify-center
                                                        rounded-full bg-blue-200 text-blue-600 text-sm font-semibold select-none text-xs
                                                    "
                                                >
                                                    Q{index + 1}
                                                </span>
                                                <span
                                                    className="font-medium"
                                                    dangerouslySetInnerHTML={{ __html: highlightPlain(faq.title, keyword) }}
                                                />
                                                {/* <span 
                                                    className="font-medium" 
                                                    dangerouslySetInnerHTML={{ __html: highlightPlain(faq.title, keyword) }}
                                                >{faq.title}</span> */}
                                            </span>

                                            <span
                                                className="relative inline-flex h-6 w-6 items-center justify-center"
                                                aria-hidden
                                            >
                                                <Minus
                                                    className="group-data-[state=closed]:w-0 group-data-[state=closed]:opacity-0 text-[#2F80FF]"
                                                    size={20}
                                                    strokeWidth={2.5}
                                                />
                                                <Plus
                                                    className="absolute block group-data-[state=open]:opacity-0 text-[#2F80FF]"
                                                    size={20}
                                                    strokeWidth={2.5}
                                                />
                                            </span>
                                        </button>
                                    </AccordionPrimitive.Trigger>
                                </AccordionPrimitive.Header>

                                <AccordionContent className="data-[state=open]:mt-1 pl-14 pr-4 pb-3 text-slate-700">
                                    {faq.blocks.map((block: ContentBlock, i: number) => {
                                        if (block.type === "p")
                                        return (
                                            <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: highlightHTML(block.text, keyword) }} />
                                        );
                                        if (block.type === "ul")
                                        return (
                                            <ul key={i} className="list-disc pl-5 space-y-1">
                                                {block.items.map((item: string, j: number) => (
                                                    <li key={j} dangerouslySetInnerHTML={{ __html: highlightHTML(item, keyword) }} />
                                                ))}
                                            </ul>
                                        );
                                        if (block.type === "ol")
                                        return (
                                            <ol key={i} className="list-decimal pl-5 space-y-1">
                                                {block.items.map((item: string, j: number) => (
                                                    <li key={j} dangerouslySetInnerHTML={{ __html: highlightHTML(item, keyword) }} />
                                                ))}
                                            </ol>
                                        );
                                        return <Fragment key={i} />;
                                    })}
                                </AccordionContent>
                            </div>
                        </AccordionItem>
                    ))}

                    {/* No results */}
                    {filteredFAQs.length === 0 && (
                        <div className="text-sm text-slate-500 p-4">ไม่พบคำถามที่ตรงกับ “{keyword}”</div>
                    )}
                </Accordion>
            </div>
        </>
    )
}