import { RequestFeedback, RequestSearch, ResponseResent, ResponseSearch } from "@/types/search.type";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";

export async function searchKhunJaiDee(value: RequestSearch): Promise<ResponseSearch | string> {
  try {
    const data = await axios.post("/api/search/kjd", {
      searchContent: value.searchContent,
      loginId: value.loginId
    });

    const res = data?.data;
    
    if (!res) return { Response: "", SearchDocument: "", SearchDocumentLocation: "", Response_Other: "", SearchDocument_Other: "", SearchDocumentLocation_Other: "" };

    return res

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    return res.message
  }
  
}

export async function getFAQ(value: string): Promise<string[]> {
  try {
    const data = await axios.post("/api/search/faq", {
      getKeyword: value,
    });

    const res = data?.data;
    
    if (!res?.ResString) return [];
  
    return res.ResString.split(",").map((s: string) => s.trim());

  } catch (err) {
    console.error("Get FAQ error", err);
    return [];
  }
  
}

export async function sendFeedback(value: RequestFeedback) {
  try {
    const data = await axios.post("/api/search/feedback", value)

    return data.data

  } catch (err) {
    console.error("Get FAQ error", err);
    return { Response: "fail" };
  }
}

export async function getResent(): Promise<ResponseResent | string> {
  try {
    const { data } = await axios.post("/api/search/recent", {
      searchContent: "",
    });
    
    return data

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    return res.message
  }
}