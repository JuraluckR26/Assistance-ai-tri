import httpClient from "./httpClient";
import { RequestFeedback, ResponseResent } from "@/types/search.type";
import { handleAxiosError } from "@/utils/handleAxiosError";

export interface RawResponse {
  Response: string;
  SearchDocument: string;
  SearchDocumentLocation: string;
}

export interface ResentResponse {
  Date: string;
  Response: string;
  SearchDocument: string;
  SearchDocumentLocation: string;
}

export async function fetchSearchDocument(question: string) {
  try {
    const data = await httpClient.post("SearchSpe1Document", {
      searchContent: question,
    });
    const res = data?.data;
    if (!res) return [];
    return res

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    return res.message
  }
  
}

export async function mockFetchSearchDocument(question: string): Promise<RawResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    Response:
      "บริษัท ตรีเพชรอีซูซุเซลส์ จำกัด แจ้งจำหน่ายยางและพรมปูพื้นรถ All-New ISUZU D-MAX รุ่นใหม่ ตั้งแต่ 31 ตุลาคม 2562 โดยมีรายการสินค้ารวมถึงยางปูพื้นรถและพรมปูพื้น พร้อมราคาและเบอร์อะไหล่ รายละเอียดเพิ่มเติมสามารถสอบถามได้ที่บริษัทฯ.||บริษัท ตรีเพชรอีซูซุเซลส์ แจ้งอัปเดตรายการจำหน่ายพื้นปูกระบะและอุปกรณ์ติดตั้งสำหรับรถปิกอัพรุ่นใหม่ปี 2020 โดยมีรายละเอียดเบอร์อะไหล่และราคาจำหน่าย พร้อมหมายเหตุเกี่ยวกับการเปลี่ยนแปลงชื่ออะไหล่และราคาที่อาจมีการเปลี่ยนแปลงได้||รายการอะไหล่รถยนต์รวมถึงหมายเลขอะไหล่และรุ่นต่างๆ เช่น ตัวตรวจจับการไหลของอากาศ, วาล์วนำ, มอเตอร์พัดลม, กระจกบังลมหน้า, และอื่นๆ โดยมีข้อมูลเกี่ยวกับรุ่นรถ เช่น TFR/TFS'2023, FXZ/GXZ'2022 และ FRR'2022 เป็นต้น||รายการอะไหล่รถยนต์ LCV มีราคาพิเศษพร้อมส่วนลด 40%-90% ตั้งแต่ 1 ก.ค. - 31 ส.ค. 2567 ราคาขายยังไม่รวม VAT 7% รวมถึงอะไหล่ต่างๆ เช่น ปะเก็น, แป๊ปเบรก, สลักเบรกเกียร์ และกระจกมองข้าง โดยมีรายละเอียดและเบอร์อะไหล่ระบุชัดเจนในเอกสาร.",
    SearchDocument:
      "TIS-PMG 047-2019(PSC)แจ้งจำหน่ายยางและพรมปูพื้นรถ  All- NEW ISUZU D-MAX  รุ่นใหม่! พลานุภาพ พลิกโลก.pdf||TIS-PMG 064-2020  อัปเดตรายการจำหน่ายพื้นปูกระบะ สำหรับปิกอัพ ปี 2020_ฉบับแก้ไข.pdf||1) TIS-PMG 014-2023 การรับคืนอะไหล่เป็นกรณีพิเศษ - Copy.pdf||TIS-PMG 030-2024_แคมเพจน์ส่วนลดพิเศษ 40-90% สำหรับอะไหล่แท้_CDR TISCO AUTEC.pdf",
    SearchDocumentLocation:
      "https://stgaiassistantv1.blob.core.windows.net/blob-khun-jai-dee-asg/ASG/TIS-PMG%20047-2019(PSC)%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%88%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A2%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9E%E0%B8%A3%E0%B8%A1%E0%B8%9B%E0%B8%B9%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B8%96%20%20All-%20NEW%20ISUZU%20D-MAX%20%20%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88!%20%E0%B8%9E%E0%B8%A5%E0%B8%B2%E0%B8%99%E0%B8%B8%E0%B8%A0%E0%B8%B2%E0%B8%9E%20%E0%B8%9E%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B9%82%E0%B8%A5%E0%B8%81.pdf||https://stgaiassistantv1.blob.core.windows.net/blob-khun-jai-dee-asg/ASG/TIS-PMG%20064-2020%20%20%E0%B8%AD%E0%B8%B1%E0%B8%9B%E0%B9%80%E0%B8%94%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%9B%E0%B8%B9%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B0%20%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%B4%E0%B8%81%E0%B8%AD%E0%B8%B1%E0%B8%9E%20%E0%B8%9B%E0%B8%B5%202020_%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82.pdf||https://stgaiassistantv1.blob.core.windows.net/blob-khun-jai-dee-asg/ASG/1)%20TIS-PMG%20014-2023%20%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B8%B7%E0%B8%99%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%81%E0%B8%A3%E0%B8%93%E0%B8%B5%E0%B8%9E%E0%B8%B4%E0%B9%80%E0%B8%A8%E0%B8%A9%20-%20Copy.pdf||https://stgaiassistantv1.blob.core.windows.net/blob-khun-jai-dee-asg/ASG/TIS-PMG%20030-2024_%E0%B9%81%E0%B8%84%E0%B8%A1%E0%B9%80%E0%B8%9E%E0%B8%88%E0%B8%99%E0%B9%8C%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A5%E0%B8%94%E0%B8%9E%E0%B8%B4%E0%B9%80%E0%B8%A8%E0%B8%A9%2040-90%25%20%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B9%81%E0%B8%97%E0%B9%89_CDR%20TISCO%20AUTEC.pdf",
  };
}

export async function getFAQ(value: string): Promise<string[]> {
  try {
    const data = await httpClient.post("GetCosmosDb", {
      getKeyword: value,
    });
  
    const res = data?.data;
    // const res = {ResString: "อะไหล่รถยนต์,การดูแลรักษารถยนต์,ค่าแรงขันสกรูถ่ายน้ำมันเครื่อง เครื่องยนต์ 4JJ"};
  
    if (!res?.ResString) return [];
  
    return res.ResString.split(",").map((s: string) => s.trim());

  } catch (err) {
    console.error("Get FAQ error", err);
    return [];
  }
  
}

export async function sendFeedback(value: RequestFeedback) {
  try {
    const { data } = await httpClient.post("SaveCosmosDb", value)
    return data

    // mock api Send Feedback
    // await new Promise((resolve) => setTimeout(resolve, 500));

    // return "Success"

  } catch (err) {
    console.error("sendFeedback error", err);
    return { Response: "fail" };
  }
}

export async function getResent(): Promise<ResponseResent | string> {
  try {
    const { data } = await httpClient.post("SearchRecentDocument", {
      searchContent: "",
    });
    return data
  } catch (err: unknown) {
    const res = handleAxiosError(err);
    return res.message
  }
}