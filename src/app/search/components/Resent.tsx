import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default function Resent() {
    return (
        <>
            <div className="relative w-full md:max-w-4xl xl:max-w-5xl">
                <div className="flex flex-row gap-2 pt-3 pb-3">
                    <Newspaper/> 
                    <h4 className="font-bold">ข่าวสารล่าสุด</h4>
                </div>
                <div className="p-2 bg-[#F5F5F5] rounded-md ...">
                    <div className="flex flex-col gap-2">
                        <Card>
                            <CardContent>
                                <CardTitle className="mb-2">
                                    <a href="#" className="no-underline hover:underline text-blue-600 font-semibold line-clamp-2">1 . T. TIS-PMG 027-2022 แจ้งจำหน่ายชุดสายไฟ TELETEC รถบรรทุกอีซูซุ N-Series , F&G-Series..pdf</a>
                                </CardTitle>
                                <CardDescription>
                                    <p className="line-clamp-2">ชุดเทเลเทค "ใหม่" สำหรับรถบรรทุกอีซูซุ HOLY มีสายไฟแยกจำหน่ายสำหรับรุ่น N-Series ปี 2008-2016 และรุ่นอื่น ๆ โดยมีเบอร์อะไหล่และ dsadsadasdas dsadsadzzz</p>
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <CardTitle className="mb-2">
                                    <a href="#" className="no-underline hover:underline ... text-blue-600 font-semibold line-clamp-2">2 . TIS-PMG 048-2021 แจ้งจำหน่ายอะไหล่แท้ตรีเพชร 4 รายการ_Car Dealer.pdf</a>
                                </CardTitle>
                                <CardDescription>
                                    <p className="line-clamp-2">บริษัท ตรีเพชรอีซูซุเซลส์ แจ้งจำหน่ายอะไหล่แท้ 4 รายการ เริ่ม 4 พฤษภาคม 2564 รายละเอียดรวมถึงชื่ออะไหล่ เบอร์อะไหล่ ราคา ขายส่ง...</p>
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <CardTitle className="mb-2">
                                    <a href="#" className="no-underline hover:underline ... text-blue-600 font-semibold line-clamp-2">3 . PMG-PB-PTA-002 แจ้งข้อมูลการเปลี่ยนแปลงซุ้มล้อรถบรรทุกอีซูซุขนาดใหญ่ .pdf</a>
                                </CardTitle>
                                <CardDescription>
                                    <p className="line-clamp-2">บริษัท ตรีเพชรอีซูซุเซลส์ แจ้งการเปลี่ยนแปลงซุ้มล้อหลังสำหรับรถบรรทุกอีซูซุขนาดใหญ่ โดยปรับปรุงให้แข็งแรงขึ้น เปลี่ยนเบอร์อะไหล่จาก...</p>
                                </CardDescription>
                            </CardContent>
                        </Card>  
                        <Card>
                            <CardContent>
                                <CardTitle className="mb-2">
                                    <a href="#" className="no-underline hover:underline ... text-blue-600 font-semibold line-clamp-2">4 . PMG-PB-PTA-002 แจ้งข้อมูลการเปลี่ยนแปลงซุ้มล้อรถบรรทุกอีซูซุขนาดใหญ่ .pdf</a>
                                </CardTitle>
                                <CardDescription>
                                    <p className="line-clamp-2">บริษัท ตรีเพชรอีซูซุเซลส์ แจ้งการเปลี่ยนแปลงซุ้มล้อหลังสำหรับรถบรรทุกอีซูซุขนาดใหญ่ โดยปรับปรุงให้แข็งแรงขึ้น เปลี่ยนเบอร์อะไหล่จาก...</p>
                                </CardDescription>
                            </CardContent>
                        </Card>  
                        <Card>
                            <CardContent>
                                <CardTitle className="mb-2">
                                    <a href="#" className="no-underline hover:underline ... text-blue-600 font-semibold line-clamp-2">5 . PMG-PB-PTA-002 แจ้งข้อมูลการเปลี่ยนแปลงซุ้มล้อรถบรรทุกอีซูซุขนาดใหญ่ .pdf</a>
                                </CardTitle>
                                <CardDescription>
                                    <p className="line-clamp-2">บริษัท ตรีเพชรอีซูซุเซลส์ แจ้งการเปลี่ยนแปลงซุ้มล้อหลังสำหรับรถบรรทุกอีซูซุขนาดใหญ่ โดยปรับปรุงให้แข็งแรงขึ้น เปลี่ยนเบอร์อะไหล่จาก...</p>
                                </CardDescription>
                            </CardContent>
                        </Card>   
                    </div>
                </div>
            </div>
        </>
    )
}