import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import { ResultHistoryItem } from "@/types/history.type";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { updateHistory } from "@/lib/api/historyService";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatting";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModuleList, SystemsList } from "@/lib/data";

type ModalDetailProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: ResultHistoryItem | null;
    onSave?: (updated: ResultHistoryItem) => void;
};

const getSystemLabel = (id?: string) => {
    if (!id) return "-";
    return SystemsList.find((s) => s.id === id)?.label ?? id;
};
  
  const getModuleLabel = (moduleId?: string, systemId?: string) => {
    if (!moduleId) return "-";
    const source = systemId ? ModuleList.filter((m) => m.systemId === systemId) : ModuleList;
    return source.find((m) => m.id === moduleId)?.label ?? moduleId;
};

export default function ModalDetail({ open, onOpenChange, data, onSave }: ModalDetailProps) {
    const [activeEdit, setActiveEdit] = useState<boolean>(false)
    const [system, setSystem] = useState<string>("")
    const [module, setModule] = useState<string>("")
    const [valFunction, setValFunction] = useState<string>("")
    const [ticket, setTicket] = useState<string>("")
    const [aiResult, setAiResult] = useState<string>("")
    const [custom1, setCustom1] = useState<string>("")
    const [custom2, setCustom2] = useState<string>("")
    const [custom3, setCustom3] = useState<string>("")

    // คำนวณรายการ System ที่เรียงแล้ว (กัน re-render เกินจำเป็น)
    const systemOptions = useMemo(
        () => [...SystemsList].sort((a, b) => a.label.localeCompare(b.label))
    ,[]);

    // Filter + Sort Module ตาม system ที่เลือก
    const moduleOptions = useMemo(() => {
        if (!system) return [];
        const list = ModuleList.filter((m) => m.systemId === system);
        return list.sort((a, b) => a.label.localeCompare(b.label));
    }, [system]);
    
    const splitDocuments = (docString: string) => {
        return docString ? docString.split('||').map(doc => doc.trim()) : [];
    };
    
    const splitDocumentLocations = (locationString: string) => {
        return locationString ? locationString.split('||').map(loc => loc.trim()) : [];
    };
    
    const documents = data?.document ? splitDocuments(data.document) : [];
    const documentLocations = data?.documentLocation ? splitDocumentLocations(data.documentLocation) : [];
    const description = data?.resultText ? splitDocumentLocations(data.resultText) : [];

    
    const effectiveSystemId = system || data?.system || "";
    const effectiveModuleId = module || data?.module || "";
    const systemLabel = useMemo(() => 
        getSystemLabel(effectiveSystemId)
    , [effectiveSystemId]);
    const moduleLabel = useMemo(() => 
        getModuleLabel(effectiveModuleId, effectiveSystemId)
    , [effectiveModuleId, effectiveSystemId]);

    const handleSave = async () => {
        if (!data) return;

        const payload = {
          id: data.id,
          loginId: data.loginId || "",
          system: systemLabel,
          module: moduleLabel,
          function: valFunction,
          ticket: ticket,
          aiResult: aiResult,
          custom1: custom1,
          custom2: custom2,
          custom3: custom3,
        };
        try {
          await updateHistory(payload);
          const updated: ResultHistoryItem = { ...data, ...payload };
          onSave?.(updated);
          setActiveEdit(false);
          onOpenChange(false);
        } catch (e) {
          console.error(e);
        }
    }
    
    useEffect(() => {
        if (!open || !data) return;
        setSystem(data.system || "");
        setModule(data.module || "");
        setValFunction(data.function || "");
        setTicket(data.ticket || "");
        setAiResult(data.aiResult || "");
        setCustom1(data.custom1 || "");
        setCustom2(data.custom2 || "");
        setCustom3(data.custom3 || "");
    }, [open, data]);

    useEffect(() => {
        setModule("");
    }, [system]);
    
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent 
                    className="bg-white/40 backdrop-blur-xl shadow-2xl rounded-2xl md:max-w-5xl xl:max-w-5xl"
                    overlay="transparent"
                >
                    <DialogHeader className="mb-2" hidden>
                        <DialogTitle className="text-sm"></DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-6 text-sm">
                        {/* header content */}
                        <div className="col-span-2 ">
                            <div className="flex justify-between items-center">
                                <div className="font-bold">Feedback details</div>
                                <div 
                                    className="bg-stone-200 px-1 py-1 rounded-sm cursor-pointer hover:bg-stone-300"
                                    onClick={() => setActiveEdit(v => !v)}
                                >
                                    <Pen size={12} className="text-gray-600"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 font-bold pl-3 pb-2">Question and answer</div>

                        {/* detail content */}
                        <div className="col-span-2 text-sm md:h-[440px] lg:h-[440px] overflow-y-auto">
                            <div className="grid grid-cols-3">
                                <div className="py-1">Feedback</div>
                                <div className="col-span-2 py-1">
                                    {data?.feedback || "-"}
                                </div>
                            </div>
                            <div className="grid grid-cols-3">
                                <div className="py-2">Reason</div>
                                <div className="col-span-2 py-2">{data?.feedbackDetail || "-"}</div>
                            </div>
                            <div className="grid grid-cols-3">
                                <div className="py-2">Report date</div>
                                <div className="col-span-2 py-2">{formatDate(data?.createdDate)}</div>
                            </div>
                            <div className="grid grid-cols-3 flex items-center">
                                <div className="py-2">System</div>
                                <div className="col-span-2 ">
                                    {!activeEdit ? 
                                        <div className="break-words overflow-wrap-anywhere">
                                            {data?.system ? 
                                                data?.system
                                            : (
                                                systemOptions.find((s) => s.id === (data?.system || ""))?.label || data?.system || "-"
                                            )}
                                        </div>
                                    : (
                                        <Select value={system} onValueChange={setSystem}>
                                            <SelectTrigger className="w-full bg-white" size="sm">
                                            <SelectValue placeholder={data?.system ? data?.system : ""} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {systemOptions.map((s) => (
                                                    <SelectItem key={s.id} value={s.id}>
                                                        {s.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                <div className="py-2">Module</div>
                                <div className="col-span-2 ">
                                    {!activeEdit ? 
                                        <div className="break-words overflow-wrap-anywhere">
                                            {data?.module ? 
                                                data?.module
                                            : (
                                                moduleOptions.find((m) => m.id === (data?.module || ""))?.label || data?.module || "-"
                                            )}
                                        </div>
                                    : (
                                        <Select value={module} onValueChange={setModule} disabled={!system}>
                                            <SelectTrigger className="w-full bg-white" size="sm">
                                            <SelectValue placeholder={system ? "เลือก Module" : "เลือก System ก่อน"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {system && moduleOptions.length === 0 ? 
                                                    <>
                                                        <SelectItem value="none" disabled>ไม่มีรายการ Module</SelectItem> 
                                                    </>
                                                : (
                                                    <>
                                                        {moduleOptions.map((m) => (
                                                            <SelectItem key={m.id} value={m.id}>
                                                                {m.label}
                                                            </SelectItem>
                                                        ))}
                                                    </>
                                                )}
                                                
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                <div className="py-2">Function</div>
                                <div className="col-span-2 ">
                                    {!activeEdit ? 
                                        <div className="break-words overflow-wrap-anywhere">{data?.function || "-"}</div>
                                    : (
                                        <Input className="bg-white h-8" defaultValue={data?.function || "-"} onChange={(e) => setValFunction(e.target.value)}/>
                                    )}
                                </div>

                                <div className="py-2">Ticket</div>
                                <div className="col-span-2 ">
                                    {!activeEdit ? 
                                        <div className="break-words overflow-wrap-anywhere">{data?.ticket || "-"}</div>
                                    : (
                                        <Input className="bg-white h-8" defaultValue={data?.ticket || "-"} onChange={(e) => setTicket(e.target.value)}/>
                                    )}
                                </div>

                                <div className="py-2">Result</div>
                                <div className="col-span-2 ">
                                    {!activeEdit ? 
                                        <div className="break-words overflow-wrap-anywhere">{data?.aiResult || "-"}</div>
                                    : (
                                        <Select value={aiResult} onValueChange={setAiResult}>
                                            <SelectTrigger className="w-full bg-white" size="sm">
                                                <SelectValue placeholder="select result" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Correct">Correct</SelectItem>
                                                <SelectItem value="PartialCorrect">Partial correct</SelectItem>
                                                <SelectItem value="notCorrect">not correct</SelectItem>
                                                <SelectItem value="notAnswer">not answer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                <div className="py-2">Custom 1</div>
                                <div className="col-span-2 ">
                                    {!activeEdit ? 
                                        <div className="break-words overflow-wrap-anywhere">{data?.custom1 || "-"}</div>
                                    : (
                                        <Input className="bg-white h-8" defaultValue={data?.custom1 || ""} onChange={(e) => setCustom1(e.target.value)}/>
                                    )}
                                </div>

                                <div className="py-2">Custom 2</div>
                                <div className="col-span-2 ">
                                    {!activeEdit ? 
                                        <div className="break-words overflow-wrap-anywhere">{data?.custom2 || "-"}</div>
                                    : (
                                        <Input className="bg-white h-8" defaultValue={data?.custom2 || ""} onChange={(e) => setCustom2(e.target.value)}/>
                                    )}
                                </div>

                                <div className="py-2">Custom 3</div>
                                <div className="col-span-2 ">
                                    {!activeEdit ? 
                                        <div className="break-words overflow-wrap-anywhere">{data?.custom3 || "-"}</div>
                                    : (
                                        <Input className="bg-white h-8" defaultValue={data?.custom3 || ""} onChange={(e) => setCustom3(e.target.value)}/>
                                    )}
                                </div>
                            </div>
                            {activeEdit && 
                                <DialogFooter className="mt-1">
                                    <Button 
                                        size={"sm"} 
                                        variant={"ghost"} 
                                        onClick={() => { 
                                            setActiveEdit(false); 
                                            setSystem(""); 
                                            setModule(""); 
                                        }}>Cancel</Button>
                                    <Button 
                                        size={"sm"} 
                                        variant={"default"} 
                                        className="bg-slate-800 hover:bg-slate-700" 
                                        onClick={() => {
                                            handleSave();
                                        }}
                                    >Save</Button>
                                </DialogFooter>
                            }
                        </div>
                        <div className="col-span-4 pl-3">
                            <div className="grid grid-cols-6">
                                <div className="py-1">Username</div>
                                <div className="col-span-5 py-1">{data?.createdBy || data?.loginId || "-"}</div>

                                <div className="py-1">Question</div>
                                <div className="col-span-5 py-1 h-full rounded-sm flex flex-col gap-2 lg:max-h-12 xl:max-h-12">
                                    <div className="overflow-y-auto">
                                        {data?.searchText || "-"}
                                    </div>
                                </div>

                                <div className="py-1">Assistant</div>
                                <div className="col-span-5 py-1">{data?.assistantName || "-"}</div>

                                <div className="py-1">Response</div>
                                <div className="col-span-6 py-1">
                                    <div className="bg-[#4D77FF]/20 w-full h-full p-3 rounded-sm flex flex-col gap-2 md:h-72 lg:h-82 xl:h-82">
                                        {data?.resultText ? (
                                            <div className="whitespace-pre-wrap text-sm overflow-y-auto break-words overflow-wrap-anywhere">
                                                <>
                                                    {documents.length > 0 && (
                                                        <div className="space-y-2">
                                                            {data.assistantName === "Khun Jai Dee" ? (
                                                                <>
                                                                    {documents.map((document, index) => (
                                                                        <div key={index}>
                                                                            <Link 
                                                                                href={documentLocations[index]}
                                                                                target="_blank" 
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-600 font-semibold hover:underline"
                                                                            >
                                                                                {index + 1}. {document}
                                                                            </Link>
                                                                            <p className="line-clamp-2">{description[index]}</p>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {data.resultText}
                                                                    <p>เอกสาร :</p>
                                                                    {documents.map((document, index) => (
                                                                        <div key={index}>
                                                                            <Link
                                                                                href={documentLocations[index]}
                                                                                target="_blank" 
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-600 font-semibold hover:underline"
                                                                            >
                                                                                {index + 1}. {document}
                                                                            </Link>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                            
                                                        </div>
                                                    )}
                                                </>
                                            </div>
                                        ) : (
                                            <div className="text-gray-500 italic">ไม่มีข้อมูลการตอบกลับ</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}