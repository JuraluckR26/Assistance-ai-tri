import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import { ResultHistoryItem } from "@/types/history.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { updateHistory } from "@/lib/api/historyService";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatting";

type ModalDetailProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: ResultHistoryItem | null;
    onSave?: (updated: ResultHistoryItem) => void;
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
    
    const splitDocuments = (docString: string) => {
        return docString ? docString.split('||').map(doc => doc.trim()) : [];
    };
    
    const splitDocumentLocations = (locationString: string) => {
        return locationString ? locationString.split('||').map(loc => loc.trim()) : [];
    };
    
    const documents = data?.document ? splitDocuments(data.document) : [];
    const documentLocations = data?.documentLocation ? splitDocumentLocations(data.documentLocation) : [];
    const description = data?.resultText ? splitDocumentLocations(data.resultText) : [];

    const handleSave = async () => {
        if (!data) return;

        const payload = {
          id: data.id,
          loginId: data.loginId || "",
          system: system,
          module: module,
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
    
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent 
                    className="bg-white/40 backdrop-blur-xl shadow-2xl rounded-2xl md:max-w-5xl xl:max-w-5xl"
                    // className="bg-white shadow-2xl rounded-2xl md:max-w-5xl xl:max-w-5xl"
                    overlay="transparent"
                >
                    <div className="flex flex-row">
                        <div className="grid grid-cols-5">
                            <div className="col-span-2 pr-4">
                                <DialogHeader className="mb-2">
                                    <DialogTitle className="text-sm">
                                        <div className="flex justify-between items-center">
                                            <div className="">Feedback details</div>
                                            <div 
                                                className="bg-stone-200 px-1 py-1 rounded-sm cursor-pointer hover:bg-stone-300"
                                                onClick={() => setActiveEdit(v => !v)}
                                            ><Pen size={12} className="text-gray-600"/></div>
                                        </div>
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="text-sm md:h-[440px] lg:h-[440px] overflow-y-auto">
                                    <div className="grid grid-cols-4 gap-2">
                                        <p>Feedback</p>
                                        <div className="col-span-3">{data?.feedback || "-"}</div>
                                        <p>Reason</p>
                                        <div className="col-span-3">{data?.feedbackDetail || "-"}</div>
                                        <p>Report date</p>
                                        {/* <div className="col-span-3">{data?.createdDate ? new Date(data.createdDate).toLocaleString('th-TH') : "-"}</div> */}
                                        <div className="col-span-3">{formatDate(data?.createdDate)}</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-1 pt-2">
                                        <p className="pb-4">System</p>
                                        <div className="col-span-3">
                                            {!activeEdit ? 
                                                <div className="break-words overflow-wrap-anywhere">{data?.system || "-"}</div>
                                            : (
                                                <Input className="bg-white" defaultValue={data?.system || "-"} onChange={(e) => setSystem(e.target.value)}/>
                                            )}
                                        </div>
                                        <p className="pb-4">Module</p>
                                        <div className="col-span-3">
                                            {!activeEdit ? 
                                                <div className="break-words overflow-wrap-anywhere">{data?.module || "-"}</div>
                                            : (
                                                <Input className="bg-white" defaultValue={data?.module || "-"} onChange={(e) => setModule(e.target.value)}/>
                                            )}
                                        </div>
                                        <p className="pb-4">Function</p>
                                        <div className="col-span-3">
                                            {!activeEdit ? 
                                                <div className="break-words overflow-wrap-anywhere">{data?.function || "-"}</div>
                                            : (
                                                <Input className="bg-white" defaultValue={data?.function || "-"} onChange={(e) => setValFunction(e.target.value)}/>
                                            )}
                                        </div>
                                        <p className="pb-4">Ticket</p>
                                        <div className="col-span-3">
                                            {!activeEdit ? 
                                                <div className="break-words overflow-wrap-anywhere">{data?.ticket || "-"}</div>
                                            : (
                                                <Input className="bg-white" defaultValue={data?.ticket || "-"} onChange={(e) => setTicket(e.target.value)}/>
                                            )}
                                        </div>
                                        <p className="pb-4">AI Result</p>
                                        <div className="col-span-3">
                                            {!activeEdit ? 
                                                <div className="break-words overflow-wrap-anywhere">{data?.aiResult || "-"}</div>
                                            : (
                                                <Input className="bg-white" defaultValue={data?.aiResult || "-"} onChange={(e) => setAiResult(e.target.value)}/>
                                            )}
                                        </div>
                                        <p className="pb-4">Custom 1</p>
                                        <div className="col-span-3">
                                            {!activeEdit ? 
                                                <div className="break-words overflow-wrap-anywhere">{data?.custom1 || "-"}</div>
                                            : (
                                                <Input className="bg-white" defaultValue={data?.custom1 || ""} onChange={(e) => setCustom1(e.target.value)}/>
                                            )}
                                        </div>
                                        <p className="pb-4">Custom 2</p>
                                        <div className="col-span-3">
                                            {!activeEdit ? 
                                                <div className="break-words overflow-wrap-anywhere">{data?.custom2 || "-"}</div>
                                            : (
                                                <Input className="bg-white" defaultValue={data?.custom2 || ""} onChange={(e) => setCustom2(e.target.value)}/>
                                            )}
                                        </div>
                                        <p className="pb-4">Custom 3</p>
                                        <div className="col-span-3">
                                            {!activeEdit ? 
                                                <div className="break-words overflow-wrap-anywhere">{data?.custom3 || "-"}</div>
                                            : (
                                                <Input className="bg-white" defaultValue={data?.custom3 || ""} onChange={(e) => setCustom3(e.target.value)}/>
                                            )}
                                        </div>
                                    </div>
                                    {activeEdit && 
                                        <DialogFooter className="mt-1">
                                            <Button size={"sm"} variant={"ghost"} onClick={() => { setActiveEdit(false); }}>Cancel</Button>
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
                            </div>
                            <div className="col-span-3">
                                <DialogHeader className="mb-2">
                                    <DialogTitle className="text-sm">
                                        <div>Question and answer</div>
                                    </DialogTitle>
                                </DialogHeader>
                                
                                <div className="text-sm">
                                    <div className="grid grid-cols-6 gap-2">
                                        <p>Username</p>
                                        <div className="col-span-5 break-words overflow-wrap-anywhere">{data?.createdBy || data?.loginId || "-"}</div>
                                        <p>Question</p>
                                        <div className="col-span-5 break-words overflow-wrap-anywhere">{data?.searchText || "-"}</div>
                                        <div className="">Assistant</div>
                                        <div className="col-span-5 break-words overflow-wrap-anywhere">{data?.assistantName || "-"}</div>
                                    </div>
                                    <div className="">
                                        <div className="py-2">Response</div>
                                        <div className="">
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
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* {loadUpdate && (
                <div>
                    <Loader2/>
                </div>
            )} */}

        </>
    )
}