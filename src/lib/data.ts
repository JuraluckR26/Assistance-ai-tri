// export const searchContent = {
//     feedbackDislike: {
//         incorrect: "The content is incorrect.",
//         outdated: "Old content, urgent update!",
//         dislike: "I don't like this content."
//     }
// }

import { Reports } from "@/app/history/components/Table";

export const searchContent = [
    { key: "incorrect", text: "ข้อมูลไม่ถูกต้อง" },
    { key: "not_complete", text: "คำตอบยังไม่สมบูรณ์" },
    { key: "no_answer", text: "ไม่มีคำตอบ" },
    { key: "other", text: "อื่น ๆ" },
]

export const assistantList = [
    { key: "as_1", text: "IT10 Service desk assistant-new" },
    { key: "as_2", text: "IT10 Service desk assistant" },
    { key: "as_3", text: "MiRai Service desk assistant-new" },
    { key: "as_4", text: "MiRai Service desk assistant" },
    { key: "as_5", text: "PC service assistant" },
    { key: "as_6", text: "Infra service assistant" },
    { key: "as_7", text: "GIS assistant" },
    { key: "as_8", text: "Generic AI (4.0)" },
]

const QUESTIONS: string[] = [
  "อะไหล่รถกระบะ",
  "ขอคู่มือการใช้งานรถ",
  "บริการรถยกฉุกเฉิน",
  "การเคลมประกันภัย",
  "ตารางคิวซ่อม",
  "บริการตรวจเช็ครถฟรี",
  "วิธีเปลี่ยนยางอะไหล่",
  "โปรโมชั่นยางรถยนต์",
  "ส่วนลดลูกค้าประจำ",
  "ข้อมูลประกันภัย",
  "การคืนสินค้าอะไหล่",
  "สอบถามวิธีจองคิวซ่อม",
  "ศูนย์บริการใกล้บ้าน",
  "เวลาทำการศูนย์บริการ",
  "ราคาน้ำมันเครื่อง",
  "การผ่อนชำระค่าซ่อม",
  "สอบถามอะไหล่แท้",
  "ระยะทางในการรับประกัน",
  "ชำระเงินออนไลน์ได้ไหม",
  "ใบเสนอราคารถเก๋ง",
];

const DISLIKE_REASONS = [
  "คำตอบยังไม่สมบูรณ์",
  "อื่นๆ - เหตุผล",
  "ข้อมูลไม่ถูกต้อง",
] as const;

const SAMPLE_FILES = [
  {
    title: "PMG-PB-OTB-2024 01 เพิ่ม Fig Key หมวดอะไหล่ Body Parts.pdf",
    description:
      "บริษัทตรีเพชรอีซูซุเซลส์เพิ่ม Fig Key ในหมวด Body Parts จำนวน 12 รายการ (รวมเป็น 51 รายการ) โดยมีการปรับเปลี่ยนรายละเอียดให้ชัดเจนขึ้น อัปเดตในระบบมิไร 29 มกราคม 2567",
  },
  {
    title: "TIS-PMG 001-2024 แจ้งจำหน่ายชุดประดับยนต์ตรีเพชร สำหรับ All new Isuzu D-Max 2020-ปัจจุบัน.pdf",
    description:
      "บริษัท ตรีเพชรอีซูซุเซลส์แจ้งจำหน่ายชุดประดับยนต์ใหม่สำหรับ Isuzu D-Max พร้อมรับคำสั่งซื้อเริ่มตั้งแต่ 18 มกราคม 2567 สินค้าได้แก่ชุดผ่อนแรงและชุดล็อคฝาท้ายกระบะโดยมีราคาขายมากกว่า 1,300 บาท",
  },
  {
    title: "TIS-PMG 030-2024 แคมเพจน์ส่วนลดพิเศษ 40-90% สำหรับอะไหล่แท้ CDR TISCO AUTEC.pdf",
    description:
      "บริษัท ตรีเพชรอีซูซุเซลส์ จัดแคมเพจ๋นลดราคาสำหรับอะไหล่แท้ 40%-90% ตั้งแต่ 1 ก.ค.-31 ส.ค.2567 ผู้จำหน่ายสามารถสั่งซื้อตั้งแต่วันนี้ โดยไม่สามารถคืนสินค้า และยอดสั่งซื้อไม่รวมเงินรางวัลอื่นๆ",
  },
  {
    title: "TIS-PMG 014-2023 การรับคืนอะไหล่เป็นกรณีพิเศษ - Copy.pdf",
    description:
      "บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด ประกาศรับคืนอะไหล่ในกรณีพิเศษ ตั้งแต่ 18 เม.ย. - 17 มิ.ย. 66 โดยมีค่าธรรมเนียม 5% ของราคาขายส่ง ผู้จำหน่ายต้องทำตามขั้นตอน กำหนดกลุ่มอะไหล่ที่คืน โดยต้องอยู่ในสภาพสมบูรณ์",
  },
  {
    title: "PMG-PB-PIB-2023 09 การเพิ่ม สายการผลิต [ชุบผิวโลหะกันสนิม _ EDP _Electro Deposition Painting].pdf",
    description:
      "เพิ่มสายการผลิตชุบผิวโลหะกันสนิม EDP สำหรับชิ้นส่วนอะไหล่ตัวถัง กลุ่มแผงข้างกระบะท้าย สีผิวงานเป็นสีเทาเข้ม เริ่มจัดส่งตั้งแต่ 19 ตุลาคม 2566",
  },
];

export const mockReports: Reports[] = Array.from({ length: 20 }, (_, i) => {
  // สลับ Like / Dislike เพื่อให้เห็นทั้งสองกรณี
  const feedback = (i % 2 === 0 ? "Like" : "Dislike") as "Like" | "Dislike";

  // ถ้า Dislike ให้ descriptions เป็นหนึ่งในสามเหตุผลแบบวนลูป
  const descriptions =
    feedback === "Like"
      ? "-"
      : DISLIKE_REASONS[i % DISLIKE_REASONS.length];

  const response =
    i < QUESTIONS.length
        ? SAMPLE_FILES
        : [
            {
                title: `ไฟล์ตัวอย่าง-${i + 1}.pdf`,
                description: `รายละเอียดประกอบไฟล์สำหรับคำถาม "${QUESTIONS[i]}"`,
            },
        ];

  return {
    reportDate: `${i + 2} มิถุนายน 2568 เวลา ${String(8 + (i % 9)).padStart(2, "0")}:${String(10 + (i * 3) % 60).padStart(2, "0")}`,
    users: `Username${i + 1}`,
    questions: QUESTIONS[i % QUESTIONS.length],
    assistants: ["AI Search PMG", "IT10 Service desk assistant", "GIS assistant", "MiRai Service desk assistant-new"][i % 4],
    feedback,                 // ✅ "Like" | "Dislike" ตรง type
    descriptions,             // ✅ ทำตามกติกาที่กำหนด
    response,             // จะใส่รายละเอียดไฟล์/สรุปทีหลังได้ตามต้องการ
  };
});