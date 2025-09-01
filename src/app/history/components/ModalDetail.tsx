import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlayTransparent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pen, X } from "lucide-react";

type ModalDetailProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: { assistants: string; descriptions: string; feedback: string; questions: string; reportDate: string; users: string };
};

export default function ModalDetail({ open, onOpenChange, data }: ModalDetailProps) {

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent 
                    className="bg-[#EEEEEE]/40 backdrop-blur-xl shadow-2xl rounded-2xl md:max-w-5xl xl:max-w-5xl"
                    // overlay="transparent"
                >
                    <div className="flex flex-row gap-4">
                        <div className="basis-1/2">
                            <DialogHeader className="mb-2">
                                <DialogTitle className="text-base">
                                    <div className="flex justify-between items-center">
                                        <div>Feedback details</div>
                                        <div className="bg-stone-400 px-1 py-1 rounded-sm"><Pen size={12} className="text-gray-600"/></div>
                                    </div>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="text-sm">
                                <div className="column-2">
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Feedback</Label></div>
                                        <div className="basis-2/3">{data?.feedback}</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Reason</Label></div>
                                        <div className="basis-2/3">{data?.descriptions}</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Report date</Label></div>
                                        <div className="basis-2/3">{data?.reportDate}</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>System</Label></div>
                                        <div className="basis-2/3">-</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Module</Label></div>
                                        <div className="basis-2/3">-</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Function</Label></div>
                                        <div className="basis-2/3">-</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Ticket</Label></div>
                                        <div className="basis-2/3">-</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>AI Result</Label></div>
                                        <div className="basis-2/3">-</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Custom 1</Label></div>
                                        <div className="basis-2/3">
                                            <Input className="bg-white"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Custom 2</Label></div>
                                        <div className="basis-2/3">
                                            <Input className="bg-white"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/3 font-medium"><Label>Custom 3</Label></div>
                                        <div className="basis-2/3">
                                            <Input className="bg-white"/>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <button
                                        className="bg-stone-300 text-neutral-700 font-meduim px-3 py-1 rounded-sm"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="bg-gradient-to-b from-[#5BAEFF] to-[#1f7dff] text-white px-4 py-1 rounded-sm shadow-[inset_1px_0_2px_rgba(0,0,0,0.25)]"
                                        >
                                        Save
                                    </button>
                                </DialogFooter>
                            </div>
                        </div>
                        <div className="basis-2/3">
                            <DialogHeader className="mb-2">
                                <DialogTitle className="text-base">
                                    <div>Question and answer</div>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="text-sm">
                                <div className="column-2">
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/5 font-medium"><Label>Username</Label></div>
                                        <div className="basis-2/3">{data?.users}</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/5 font-medium"><Label>Question</Label></div>
                                        <div className="basis-2/3">{data?.questions}</div>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <div className="basis-1/5 font-medium"><Label>Assistant</Label></div>
                                        <div className="basis-2/3">{data?.assistants}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="basis-1/3 font-medium"><Label>Response</Label></div>
                                    <div className="basis-2/3">
                                        <div className="bg-[#4D77FF]/20 w-full h-full p-3 rounded-sm flex flex-col gap-2">
                                            <div>
                                                <p className="font-semibold text-blue-700">1. TIS-PMG 037-2024 แจ้งจำหน่ายชุดไฟราวหลังคารถบรรทุกอีซูซุ ปี 2024.pdf</p>
                                                <p className="line-clamp-2">บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด ขอแจ้งจำหน่ายชุดไฟราวหลังคา LED สำหรับรถบรรทุกอีซูซุ ปี 2024 ตั้งแต่ 24 กรกฎาคม 2567 โดยมีราคาขายปลีกตั้งแต่ 10,200-10,400 บาท สินค้าใช้สำหรับรุ่นปี 2008-ปัจจุบัน โปรดตรวจสอบราคาที่จุดขาย</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-blue-700">2. โปรแกรมการขยายการรับประกันอีซูซุสมาร์ทโพรเทคชั่น (ISP).pdf</p>
                                                <p className="line-clamp-2">สื่อส่งเสริมการตลาดหลังการขายช่วยให้ลูกค้ารู้สึกมีคุณค่าและสร้างความสัมพันธ์ที่ดีต่อเนื่อง ซึ่งสามารถเพิ่มความพึงพอใจและการซื้อซ้ำ</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-blue-700 line-clamp-1">3. TIS-AMK 016_2025 แคมเพจ์น “ยิ่งใช้นาน ยิ่งเฮ อีซูซุเปย์ 4 ต่อ” (ลูกค้าทั่วไป) R.2.pdf</p>
                                                <p className="line-clamp-2">บริษัท ตรีเพชรอีซูซุเซลส์จัดแคมเปญ "ยิ่งใช้นานยิ่งเฮ! อีซูซุเปย์ 4 ต่อ!" ตั้งแต่ 17 เม.ย.-31 ส.ค. 68 สำหรับรถเล็กและใหญ่ โดยเสนอส่วนลดและบริการพิเศษต่าง ๆ เพื่อส่งเสริมการติดตามลูกค้าเข้าศูนย์บริการ</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-blue-700">4. TIS-AMK 017_2025 แคมเพจ์น “โปรร้อน เดือดสุดขีด!” (ลูกค้าขาดหาย).pdf</p>
                                                <p className="line-clamp-2">บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด เปิดแคมเปญ "โปรร้อน เดือดสุดขีด!" ตั้งแต่ 17 เม.ย. ถึง 31 ส.ค. 68 เน้นดึงลูกค้าที่ขาดหายกลับเข้าบริการพร้อมส่วนลดและแพ็กเกจหลากหลาย เพื่อเพิ่มประสิทธิภาพในการส่งเสริมการตลาดหลังการขาย</p>
                                            </div>
                                        </div>
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