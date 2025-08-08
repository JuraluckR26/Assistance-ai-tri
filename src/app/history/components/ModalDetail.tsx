import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type ModalDetailProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: { assistants: string; descriptions: string; feedback: string; questions: string; reportDate: string; users: string };
};

export default function ModalDetail({ open, onOpenChange, data }: ModalDetailProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white md:max-w-4xl xl:max-w-5xl">
                <DialogHeader>
                    <DialogTitle hidden></DialogTitle>
                    <div className="grid gap-2">
                        <p className="font-bold text-gray-900">รายละเอียด</p>
                        <div className="grid grid-cols-6 gap-3">
                            <Label className="col-start-1 col-end-2 md:text-sm xl:text-base">ชื่อผู้ใช้</Label>
                            <Label className="col-span-5 col-end-7 md:text-sm xl:text-base">{data?.users}</Label>
                            <Label className="col-start-1 col-end-2 md:text-sm xl:text-base">คำถาม</Label>
                            <Label className="col-span-5 col-end-7 md:text-sm xl:text-base">{data?.questions}</Label>
                            <Label className="col-start-1 col-end-2 md:text-sm xl:text-base">Assistant</Label>
                            <Label className="col-span-5 col-end-7 md:text-sm xl:text-base">{data?.assistants}</Label>
                        </div>
                        <Label className="mt-1 md:text-sm xl:text-base">คำตอบ</Label>
                        <div className="bg-blue-100 p-2 rounded-md md:h-64 xl:h-100 overflow-y-auto">
                            <p className="font-semibold text-blue-600 text-sm">1. PMG-PB-OTB-2024 01 เพิ่ม Fig Key หมวดอะไหล่ Body Parts.pdf</p>
                            <p className="md:text-sm xl:text-base">
                                บริษัทตรีเพชรอีซูซุเซลส์เพิ่ม Fig Key ในหมวด Body Parts จำนวน 12 รายการ (รวมเป็น 51 รายการ) โดยมีการปรับเปลี่ยนรายละเอียดให้ชัดเจนขึ้น อัปเดตในระบบมิไร 29 มกราคม 2567
                            </p>
                            <p className="font-semibold text-blue-600 text-sm">2. TIS-PMG 001-2024แจ้งจำหน่ายชุดประดับยนต์ตรีเพชร สำหรับ All new Isuzu D-Max 2020-ปัจจุบัน.pdf</p>
                            <p className="md:text-sm xl:text-base">
                                บริษัท ตรีเพชรอีซูซุเซลส์แจ้งจำหน่ายชุดประดับยนต์ใหม่สำหรับ Isuzu D-Max พร้อมรับคำสั่งซื้อเริ่มตั้งแต่ 18 มกราคม 2567 สินค้าได้แก่ชุดผ่อนแรงและชุดล็อคฝาท้ายกระบะโดยมีราคาขายมากกว่า 1,300 บาท                        
                            </p>
                            <p className="font-semibold text-blue-600 text-sm">3. TIS-PMG 030-2024_แคมเพจน์ส่วนลดพิเศษ 40-90% สำหรับอะไหล่แท้_CDR TISCO AUTEC.pdf</p>
                            <p className="md:text-sm xl:text-base">
                                บริษัท ตรีเพชรอีซูซุเซลส์ จัดแคมเพจ๋นลดราคาสำหรับอะไหล่แท้ 40%-90% ตั้งแต่ 1 ก.ค.-31 ส.ค.2567 ผู้จำหน่ายสามารถสั่งซื้อตั้งแต่วันนี้ โดยไม่สามารถคืนสินค้า และยอดสั่งซื้อไม่รวมเงินรางวัลอื่นๆ                     
                            </p>
                            <p className="font-semibold text-blue-600 text-sm">5. 1) TIS-PMG 014-2023 การรับคืนอะไหล่เป็นกรณีพิเศษ - Copy.pdf</p>
                            <p className="md:text-sm xl:text-base">
                                บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด ประกาศรับคืนอะไหล่ในกรณีพิเศษ ตั้งแต่ 18 เม.ย. - 17 มิ.ย. 66 โดยมีค่าธรรมเนียม 5% ของราคาขายส่ง ผู้จำหน่ายต้องทำตามขั้นตอน กำหนดกลุ่มอะไหล่ที่คืน โดยต้องอยู่ในสภาพสมบูรณ์ หากไม่แน่ใจ สามารถสอบถามข้อมูลเพิ่มเติมได้ค่ะ
                            </p>
                            <p className="font-semibold text-blue-600 text-sm">6. PMG-PB-PIB-2023 09 การเพิ่ม สายการผลิต [ชุบผิวโลหะกันสนิม _ EDP _Electro Deposition Painting].pdf</p>
                            <p className="md:text-sm xl:text-base">
                                มีการเพิ่มสายการผลิตชุบผิวโลหะกันสนิม EDP สำหรับชิ้นส่วนอะไหล่ตัวถัง ในกลุ่มแผงข้างกระบะท้าย โดยสีผิวงานจะเป็นสีเทาเข้ม เริ่มจัดส่งตั้งแต่ 19 ตุลาคม 2566 โดยมีทั้งชิ้นส่วนสีเทาและสีเทาเข้มพร้อมกัน
                            </p>
                            <p className="font-semibold text-blue-600 text-sm">7. TIS-PMG 101-2021 แจ้งจำหน่ายชุดแต่งมาตรฐาน  ALL-NEW D-MAX รุ่น V-Cross 4 ปรตู รุ่นปี 2022 (ฉบับแก้ไข).pdf</p>
                            <p className="md:text-sm xl:text-base">
                                บริษัทตรีเพชรอีซูซุเซลส์แจ้งการจำหน่ายชุดแต่งมาตรฐานสำหรับรถ All-NEW ISUZU D-MAX รุ่น V-Cross 4 ประตู ปี 2022 รวมอะไหล่และราคา ชุดเสริมขอบกระบะมีหลายสี ราคาขายยังไม่รวมภาษีมูลค่าเพิ่ม และอาจมีการเปลี่ยนแปลงราคาได้
                            </p>
                            <p className="font-semibold text-blue-600 text-sm">8. TIS-PMG 006-2020 แจ้งจำหน่าย พื้นปูกระบะ_Spark ปี 2020.pdf</p>
                            <p className="md:text-sm xl:text-base">
                                บริษัท ตรีเพชรอีซูซุเซลส์ แจ้งจำหน่ายพื้นปูกระบะรุ่นสปาร์คปี 2020 พร้อมอุปกรณ์ติดตั้ง ผู้จำหน่ายสามารถสั่งซื้อได้ตั้งแต่บัดนี้ ราคา 4,333 บาท (ขายส่ง) ไม่รวมภาษีมูลค่าเพิ่ม 7% ขอบคุณผู้สนับสนุน
                            </p>
                            <p className="font-semibold text-blue-600 text-sm">9. TIS-PMG 033-2020 แจ้งจำหน่าย พื้นปูกระบะตรีเพชร รุ่น Spark 2020.pdf</p>
                            <p className="md:text-sm xl:text-base">
                                บริษัท ตรีเพชรอีซูซุเซลส์ แจ้งจำหน่ายพื้นปูกระบะสำหรับออล-นิว อีซูซุดีแมคซ์ ปี 2020 รุ่นสปาร์ค เริ่มรับคำสั่งซื้อ 6 เม.ย. 2563 และส่งมอบวันที่ 8 เม.ย. 2563 ราคาขายส่ง 3,549 บาท ขายปลีก 5,460 บาท
                            </p>
                        </div>
                        <p className="font-bold text-gray-900">Feedback</p>
                        <div className="grid grid-cols-6 gap-3">
                            <Label className="col-start-1 col-end-2 md:text-sm xl:text-base">การตอบรับ</Label>
                            {data?.feedback === "Like" ? <Label className="col-span-5 col-end-7 text-green-500 font-semibold md:text-sm xl:text-base">Like</Label> : <Label className="col-span-5 col-end-7 text-red-500 font-semibold md:text-sm xl:text-base">Dislike</Label>}
                            <Label className="col-start-1 col-end-2 md:text-sm xl:text-base">เหตุผล</Label>
                            <Label className="col-span-5 col-end-7 md:text-sm xl:text-base">{data?.descriptions}</Label>
                            <Label className="col-start-1 col-end-2 md:text-sm xl:text-base">วันที่รายงาน</Label>
                            <Label className="col-span-5 col-end-7 md:text-sm xl:text-base">{data?.reportDate}</Label>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}