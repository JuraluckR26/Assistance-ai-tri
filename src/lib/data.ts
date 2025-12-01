// src/data/constants.tsx
import type { ReactNode } from "react";

/* Generic option type */
export type Option = { key: string; text: string };

/* Search reasons */
export const searchContent = [
  { key: "incorrect",    text: "ข้อมูลไม่ถูกต้อง" },
  { key: "not_complete", text: "คำตอบยังไม่สมบูรณ์" },
  { key: "no_answer",    text: "ไม่มีคำตอบ" },
  { key: "other",        text: "อื่น ๆ" },
] as const satisfies ReadonlyArray<Option>;
export type SearchReasonKey = typeof searchContent[number]["key"];

/* Assistants list */
export const assistantList = [
  { key: "as_1", text: "IT10 Service desk assistant-new" },
  { key: "as_2", text: "IT10 Service desk assistant" },
  { key: "as_3", text: "MiRai Service desk assistant-new" },
  { key: "as_4", text: "MiRai Service desk assistant" },
  { key: "as_5", text: "PC service assistant" },
  { key: "as_6", text: "Infra service assistant" },
  { key: "as_7", text: "GIS assistant" },
  { key: "as_8", text: "Generic AI (4.0)" },
] as const satisfies ReadonlyArray<Option>;
export type AssistantKey = typeof assistantList[number]["key"];

/* FAQ items */
export type FaqItem = { id: string; q: string; a: ReactNode };

export const faqItems: FaqItem[] = [
  { id: "faq-01", q: "ระบบนี้ค้นหาข้อมูลจากที่ไหนบ้าง?", a: "ค้นหาจากแหล่งข้อมูลที่องค์กรเชื่อมต่อ เช่น SharePoint, Google Drive, OneDrive, Knowledge Base ภายใน และเอกสารที่อนุญาตให้เข้าถึง" },
  { id: "faq-02", q: "ต้องเข้าสู่ระบบก่อนใช้งานไหม?", a: "จำเป็น ต้องล็อกอินด้วยบัญชีองค์กรเพื่อใช้งานตามสิทธิ์และความปลอดภัยของข้อมูล" },
  { id: "faq-03", q: "รองรับการพิมพ์คำถามเป็นภาษาไทยหรือไม่?", a: "รองรับทั้งภาษาไทยและอังกฤษ สามารถสลับภาษาได้ตามต้องการ" },
  { id: "faq-04", q: "ถ้าระบบตอบไม่ตรงคำถาม ควรทำอย่างไร?", a: "กดปุ่มส่งข้อเสนอแนะ/ให้ฟีดแบ็ก แล้วพิมพ์รายละเอียด ทีมงานจะใช้ปรับปรุงคุณภาพคำตอบ" },
  { id: "faq-05", q: "ข้อมูลคำตอบเชื่อถือได้แค่ไหน?", a: "ระบบดึงจากแหล่งข้อมูลจริงขององค์กรและแสดงที่มาให้ตรวจสอบ แต่ควรยืนยันกับเจ้าของข้อมูลก่อนใช้ในงานสำคัญ" },
  { id: "faq-06", q: "สามารถแนบไฟล์ให้ระบบช่วยสรุปหรือค้นหาในไฟล์ได้ไหม?", a: "ได้ (ถ้าองค์กรเปิดใช้) รองรับไฟล์ PDF/Word/Excel และจะอ้างอิงส่วนที่พบให้" },
  { id: "faq-07", q: "ระบบเก็บประวัติการสนทนาไว้หรือไม่?", a: "เก็บเฉพาะเมตาดาต้าและข้อความเพื่อพัฒนาระบบตามนโยบายขององค์กร โดยเคารพข้อกำหนดความเป็นส่วนตัว" },
  { id: "faq-08", q: "อัปเดตข้อมูลใหม่บ่อยแค่ไหน?", a: "โดยทั่วไปซิงก์ทุกวัน หรือกำหนดเป็นรายชั่วโมง/เรียลไทม์ได้ตามการตั้งค่าขององค์กร" },
  { id: "faq-09", q: "ค้นหาเอกสารเวอร์ชันเก่าได้ไหม?", a: "ได้ถ้าระบบจัดเก็บเวอร์ชันและเปิดสิทธิ์ให้ค้นหา ระบบจะระบุเวอร์ชันและวันที่แก้ไขล่าสุด" },
  { id: "faq-10", q: "ถามข้อมูลเชิงกระบวนการ เช่น ขั้นตอนขออนุมัติ ได้หรือไม่?", a: "ได้ ถ้ามีคู่มือ/นโยบายในคลังความรู้ ระบบจะสรุปขั้นตอนและลิงก์อ้างอิงให้" },
  { id: "faq-11", q: "มีลิมิตจำนวนข้อความ/ความยาวที่ถามได้หรือไม่?", a: "มีลิมิตตามโควตาขององค์กร ข้อความยาวมากอาจถูกตัดทอน แนะนำให้ถามเป็นประเด็นสั้นกระชับ" },
  { id: "faq-12", q: "ใช้งานได้บนมือถือหรือแท็บเล็ตไหม?", a: "ได้ UI รองรับ Responsive ทั้ง Desktop/Tablet/Mobile" },
  { id: "faq-13", q: "จะแชร์คำตอบหรือเอกสารให้เพื่อนร่วมงานได้อย่างไร?", a: "คัดลอกลิงก์เอกสารหรือใช้ปุ่มแชร์ แล้วกำหนดสิทธิ์การเข้าถึงตามนโยบายขององค์กร" },
//   {
//     id: "faq-14",
//     q: "ใครเป็นผู้ดูแลระบบและฉันติดต่อได้ที่ไหน?",
//     a: (
//       <>
//         ติดต่อทีม Service Desk: <b>02-079-9777</b> หรืออีเมล{" "}
//         <a className="text-blue-600 hover:underline" href="mailto:servicedesk@trippetch-it.co.th">
//           servicedesk@trippetch-it.co.th
//         </a>
//       </>
//     ),
//   },
  { id: "faq-14", q: "ถ้าต้องการเพิ่มแหล่งข้อมูล/สิทธิ์การเข้าถึง ต้องทำอย่างไร?", a: "ส่งคำขอผ่าน Service Desk ระบุที่อยู่แหล่งข้อมูลและกลุ่มผู้ใช้ที่ต้องการให้เข้าถึง ทีมดูแลจะดำเนินการตามขั้นตอนความปลอดภัย" },
];

// src/mocks/faq/data.ts
export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type FAQItem = {
  id: number;
  title: string;
  blocks: ContentBlock[];
};

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    title: "ระบบเช็กสถานะรถคันสั่งจองทำงานอย่างไร?",
    blocks: [
      {
        type: "p",
        text:
          "ระบบจะผูกกับข้อมูลการผลิต/โลจิสติกส์ของโรงงานและศูนย์กระจายรถ (PDI) แล้วแปลงเป็นสถานะอ่านง่าย เช่น",
      },
      {
        type: "ul",
        items: [
          "กำหนดคิวผลิต → มีหมายเลขสั่งผลิตและสเปครถแน่นอน",
          "กำลังผลิต / ตรวจคุณภาพ → อาจใช้เวลาตามรุ่น/ไลน์ผลิต",
          "ระหว่างขนส่ง → แสดงวิธีขนส่ง (เรือ/รถบรรทุก), ETA และพอร์ตปลายทาง",
          "ถึงศูนย์กระจาย / ผ่าน PDI → ตรวจสภาพ, ติดอุปกรณ์, ทำความสะอาด",
          "ส่งถึงดีลเลอร์ / พร้อมส่งมอบ → สามารถนัดหมายลูกค้าได้",
        ],
      },
      {
        type: "p",
        text:
          "วิธีใช้งาน: ค้นด้วย เลขตัวถัง (VIN) หรือ เลขคำสั่งซื้อ และแชร์ลิงก์สถานะให้ลูกค้าดูแบบ read-only ได้",
      },
    ],
  },
  {
    id: 2,
    title: "ตรวจสอบประวัติซ่อมบำรุงลูกค้าได้อย่างไร และข้อมูลใดสำคัญที่สุด?",
    blocks: [
      { type: "p", text: "ค้นด้วย ทะเบียน / VIN / เบอร์โทร แล้วระบบจะแสดง:" },
      {
        type: "ul",
        items: [
          "ประวัติ RO ทุกครั้ง: อาการลูกค้าระบุ, งานที่ทำ, เวลาแรง (Labor), อะไหล่, ค่าใช้จ่าย",
          "ระยะไมล์ตอนเข้าศูนย์ และเทรนด์ระยะห่างระหว่างรอบ",
          "งานค้าง/คำแนะนำ ที่ควรทำในครั้งถัดไป",
          "การเคลม/รับประกัน ที่ผ่านมา พร้อมผลพิจารณา",
        ],
      },
      { type: "p", text: "เคล็ดลับ: ดู Declined Jobs เพื่อปิดการขายครั้งถัดไป" },
    ],
  },
  {
    id: 3,
    title: "การรับประกัน (Warranty) เหลือกี่ปี/กี่กิโล ตรวจได้ที่ไหน?",
    blocks: [
      {
        type: "ul",
        items: [
          "เช็คจากประวัติรถตาม VIN และเงื่อนไขผู้ผลิต",
          "แสดงหมวดรับประกัน: เครื่องยนต์/เกียร์/ระบบไฟ/ตัวถัง ฯลฯ",
          "แจ้งสิทธิ์เพิ่มเติม (Extended / Goodwill) หากมี",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "บันทึกการซ่อมตามรอบ (PM) แตกต่างจากซ่อมทั่วไปอย่างไร?",
    blocks: [
      {
        type: "ul",
        items: [
          "PM: ตามระยะเวลา/ระยะทาง มีลิสต์งานมาตรฐานและเวลามาตรฐาน",
          "CM: ซ่อมแก้ไขอาการ ต้องวิเคราะห์สาเหตุ เคสนาน/ไม่แน่นอน",
        ],
      },
      { type: "p", text: "ผลต่อระบบ: PM วาง แพ็กเกจราคา และ คิวงาน ล่วงหน้าได้แม่นกว่า" },
    ],
  },
  {
    id: 5,
    title: "จัดการแคมเปญเรียกคืน (Recall) ทำอย่างไร?",
    blocks: [
      {
        type: "ol",
        items: [
          "ค้น VIN → แจ้งเข้าข่าย/ขั้นตอน",
          "จองอะไหล่อัตโนมัติ (ถ้ามีพอ)",
          "นัดหมายและแจ้งลูกค้า (SMS/LINE)",
          "เปิด RO แบบ Recall และบันทึกหลักฐาน",
          "ปิดงาน → ส่งรายงานกลับโรงงาน",
        ],
      },
      { type: "p", text: "KPI: Recall Completion Rate และเวลาปิดเคส" },
    ],
  },
  {
    id: 6,
    title: "สั่งซื้ออะไหล่ระหว่างศูนย์ (Parts Ordering) ต้องทำขั้นตอนไหน?",
    blocks: [
      {
        type: "ul",
        items: [
          "เลือกจาก EPC ด้วย VIN เพื่อลดผิดรุ่น",
          "ดู สต็อกเครือข่าย + ราคา/ส่วนลดตามสิทธิ์",
          "ระบบประเมิน ETA/SLA ตามช่องทางขนส่ง",
          "เปิดเอกสารเบิก–โอน–รับ พร้อมหมายเลขติดตามอัตโนมัติ",
          "กรณีของขาด → Backorder และอัปเดต ETA ให้อัตโนมัติ",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "EPC/Part Catalog ค้นอะไรได้บ้าง และลดผิดอะไหล่อย่างไร?",
    blocks: [
      {
        type: "ul",
        items: [
          "ค้นด้วย VIN จับคู่รุ่นย่อย/ปีผลิต",
          "Exploded View ลดโอกาสเลือกผิดชิ้น",
          "Cross-Reference อะไหล่เทียบ/ชุดซ่อม",
          "พาร์ตที่ถูก supersede ต้องแสดงรุ่นใหม่แทนเสมอ",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "ระบบนัดหมายเข้าศูนย์ (Booking) ทำงานอย่างไร?",
    blocks: [
      {
        type: "ul",
        items: [
          "ตรวจ ช่องซ่อม/ช่าง ที่พร้อม",
          "สำรอง อะไหล่สำคัญ สำหรับ PM/งานคาดเดาได้",
          "คำนวณเวลาแรงรวมและเวลารับ–ส่งรถ",
          "แจ้งลูกค้าเรื่องเตรียมตัว (มาก่อนนัด 10 นาที)",
          "ถ้าคิวแน่น แนะนำ เวลาว่างที่ใกล้ที่สุด หรือศูนย์ใกล้เคียง",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "การเปิดใบสั่งงานซ่อม (RO) จำเป็นต้องใส่อะไรบ้าง?",
    blocks: [
      {
        type: "ul",
        items: [
          "Customer Concern แยกจากผลตรวจช่าง",
          "รหัสอาการ/สาเหตุ/การซ่อม เพื่อทำสถิติ",
          "เวลาแรงมาตรฐาน + ระบุช่าง",
          "กรณีเคลม/ประกันภัย → แนบหลักฐานและเลือกประเภทเคส",
          "ใช้ Estimate/Approval ติดตามงานที่อนุมัติแล้ว",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "ระบบคำนวณค่าแรงอย่างไรให้เป็นมาตรฐาน?",
    blocks: [
      {
        type: "ul",
        items: [
          "อิง Flat Rate ตามงาน/รุ่น",
          "ตัวคูณตามความยาก/รุ่นพิเศษ/พื้นที่",
          "ล็อกเพดานส่วนลด ปรับได้เฉพาะสิทธิ์ผู้จัดการ",
        ],
      },
    ],
  },
  {
    id: 11,
    title: "บริหารคิวช่องซ่อมให้ลื่น ไม่ให้เกิดคอขวด",
    blocks: [
      {
        type: "ul",
        items: [
          "ตารางงานแบบ Drag & Drop ตาม Bay/Technician",
          "สีสถานะ: รอรถ/กำลังทำ/รออะไหล่/ทดสอบ/รอชำระเงิน",
          "เห็น WIP และ SLA แบบ Real-time",
          "มี Load Balancing ย้ายงานข้ามช่องเมื่อใกล้ชนเวลา",
        ],
      },
    ],
  },
  {
    id: 12,
    title: "เอกสารใบเสนอราคา–ใบกำกับภาษี–ใบเสร็จ ออกจากระบบได้ไหม?",
    blocks: [
      {
        type: "p",
        text:
          "ได้ ระบบสร้างฟอร์มมาตรฐาน ดึงแรงงาน/อะไหล่จาก RO คำนวณ VAT/ส่วนลด พิมพ์หรือส่งอีเมล และถ้าเชื่อม ERP/บัญชี จะโพสต์บัญชีอัตโนมัติ",
      },
    ],
  },
  {
    id: 13,
    title: "Inventory รถใหม่/ทดลองขับ ควรดูอะไรบ้าง?",
    blocks: [
      {
        type: "ul",
        items: [
          "จำนวนคงเหลือ แยกสี/รุ่น/สเปก",
          "Aging (ค้างสต็อกกี่วัน) เพื่อวางแคมเปญ",
          "สถานะจดทะเบียน/ไฟแนนซ์/เดโม",
          "นัดหมาย ทดลองขับ และการใช้รถเดโมอย่างเป็นระบบ",
        ],
      },
    ],
  },
  {
    id: 14,
    title: "การวิเคราะห์ความพึงพอใจ (CSI) ที่ใช้ปรับปรุงจริง",
    blocks: [
      {
        type: "ul",
        items: [
          "ส่งแบบสอบถามอัตโนมัติหลังปิดงาน",
          "เก็บคะแนน/คอมเมนต์ + เหตุผลแบบเลือกหมวด",
          "แดชบอร์ดเทียบ ช่าง/ที่ปรึกษา/ประเภทงาน",
          "แจ้งเตือนเคสต่ำกว่ามาตรฐานให้ผู้จัดการติดตามใน 24 ชม.",
        ],
      },
    ],
  },
  {
    id: 15,
    title: "ป้องกันข้อมูลส่วนบุคคล (PDPA) และการเข้าถึงข้อมูล",
    blocks: [
      {
        type: "ul",
        items: [
          "ใช้ RBAC/ABAC แยกบทบาท",
          "บันทึก Audit Log ทุกการเข้าถึง/แก้ไข",
          "เข้ารหัสข้อมูลสำคัญ + Retention Policy",
        ],
      },
    ],
  },
  {
    id: 16,
    title: "โครงสร้างราคาแรงงานให้เป็นมาตรฐาน (เชิงลึก)",
    blocks: [
      {
        type: "ul",
        items: [
          "กำหนด Flat Rate ต่อ Operation และรุ่น",
          "ตัวคูณงานพิเศษ/พื้นที่/รุ่นหายาก",
          "สิทธิ์อนุมัติส่วนลดตามระดับตำแหน่ง",
        ],
      },
    ],
  },
  {
    id: 17,
    title: "ข้อควรรู้เมื่อรถอยู่ระหว่างรออะไหล่ (On Hold)",
    blocks: [
      {
        type: "ul",
        items: [
          "RO เปลี่ยนสถานะเป็น Waiting Parts พร้อม ETA",
          "เสนอทางเลือกชั่วคราว: รถสำรอง/ชดเชย/สลับทำงานอื่นก่อน",
          "แจ้งเตือนอัตโนมัติเมื่ออะไหล่มาถึง",
        ],
      },
    ],
  },
  {
    id: 18,
    title: "วิธีลดงานกลับซ่อม (Repeat Repair)",
    blocks: [
      {
        type: "ul",
        items: [
          "ใช้ Checklists ก่อนส่งมอบ",
          "บันทึกค่าพารามิเตอร์ก่อน–หลังซ่อม (เช่น ค่าคอมเพรสชั่น, โค้ด DTC)",
          "ทดสอบวิ่งตามมาตรฐานและแนบผลกับ RO",
        ],
      },
    ],
  },
  {
    id: 19,
    title: "ลูกค้าย้ายศูนย์/ย้ายจังหวัด ประวัติจะตามไปไหม?",
    blocks: [
      {
        type: "p",
        text:
          "ได้ หากศูนย์อยู่ในเครือเดียวกัน ระบบแชร์ ประวัติซ่อมตาม VIN อัตโนมัติ (ตามสิทธิ์) เพื่อให้บริการต่อเนื่อง",
      },
    ],
  },
  {
    id: 20,
    title: "แนวทางคุยกับลูกค้าที่กังวลค่าใช้จ่าย",
    blocks: [
      {
        type: "ul",
        items: [
          "แสดง ใบเสนอราคาละเอียด แยกแรงงาน/อะไหล่ + เหตุผล",
          "เสนอ ตัวเลือก: ของแท้/ทดแทน/ซ่อมชั่วคราว",
          "อธิบาย ผลกระทบถ้าไม่ทำ และข้อดีของทำครั้งเดียวจบ",
          "มีโปรผ่อนชำระ/คูปอง PM ช่วยตัดสินใจ",
        ],
      },
    ],
  },
];

export type SystemOption = { id: string; label: string; };
export type ModuleOption = { id: string; systemId: string; label: string; };

export const SystemsList: SystemOption[] = [
  { id: "s_mr", label: "MiRai" },
  { id: "s_omo", label: "OMO Sales" },
  { id: "s_omoS", label: "OMO Service" },
  { id: "s_my", label: "my-ISUZU" },
  { id: "s_dcs", label: "Digital CRM system" },
  { id: "s_it10", label: "IT10" },
  { id: "s_ld", label: "LearnD, TIS Minor" },
  { id: "s_tis", label: "TIS Evaluation system, TIS Minor" },
  { id: "s_tisO", label: "TIS Evaluation system(OutSystems), TIS Minor" },
  { id: "s_tisRe", label: "TIS Event Registration System, TIS Minor" },
  { id: "s_qpr", label: "QPR(OutSystems), TIS Minor" },
  { id: "s_ac", label: "Acquisition(OutSystems), TIS Minor" },
  { id: "s_re", label: "Request/Return Asset (OutSystems), TIS Minor" },
  { id: "s_as", label: "AssetDisposal(OutSystems), TIS Minor" },
  { id: "s_bu", label: "Business Trip (OutSystems), TIS Minor" },
  { id: "s_en", label: "Entertainment(OutSystems), TIS Minor" },
  { id: "s_gw", label: "Generic Workflow(OutSystems), TIS Minor" },
  { id: "s_ccs", label: "CCS(OutSystems), TIS Minor" },
  { id: "s_com", label: "Complain management(OutSystems), TIS Minor" },
  { id: "s_is", label: "Isuzu Event Workflow(OutSystems), DLR Minor" },
  { id: "s_te", label: "Teletec(OutSystems), DLR MInor" },
  { id: "s_dealCat", label: "Dealer Souvenir/Catalog(OutSystems), DLR MInor" },
  { id: "s_sal", label: "Sales Marketing Event(OutSystems), DLR MInor" },
  { id: "s_ser", label: "Service Marketing Event(OutSystems), DLR MInor" },
  { id: "s_deal", label: "Dealer Souvenir (OutSystems), DLR MInor" },
  { id: "s_crs", label: "Claim reimbursement status(OutSystems), DLR MInor" },
  { id: "s_pr", label: "PR Banner (OutSystems), DLR MInor" },
  { id: "s_cjr", label: "Claim(CJR) and I-Care Judgement(OutSystems), DLR MInor" },
  { id: "s_mb", label: "Marketing budget(OutSystems), DLR MInor" },
  { id: "s_isC", label: "Isuzu Care(OutSystems), DLR MInor" },
]

export const ModuleList: ModuleOption[] = [
  { id: "m_ser", label: "Service", systemId: "s_mr"},
  { id: "m_veh", label: "Vehicle Sale", systemId: "s_mr" },
  { id: "m_par", label: "Parts", systemId: "s_mr" },
  { id: "m_acc", label: "Accounting", systemId: "s_mr" },
  { id: "m_hr", label: "HR", systemId: "s_mr" },
  { id: "m_crmSer", label: "CRM-Service", systemId: "s_mr" },
  { id: "m_crmSal", label: "CRM-Sales", systemId: "s_mr" },
  { id: "m_com", label: "Common", systemId: "s_mr" },
  { id: "m_sys", label: "System", systemId: "s_mr" },
  { id: "m_o", label: "Other", systemId: "s_mr" },
  { id: "m_bi", label: "BI", systemId: "s_mr" },
  { id: "m_veh2", label: "Vehicle Sale", systemId: "s_it10" },
  { id: "m_crm", label: "CRM", systemId: "s_it10" },
  { id: "m_ser2", label: "Service", systemId: "s_it10" },
  { id: "m_par2", label: "Parts", systemId: "s_it10" },
  { id: "m_acc2", label: "Accounting", systemId: "s_it10" },
  { id: "m_hcm", label: "HCM", systemId: "s_it10" },
  { id: "m_bibo", label: "BIBO", systemId: "s_it10" },
]