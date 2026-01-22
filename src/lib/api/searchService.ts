import { useAuthStore } from "@/stores/useAuthStore";
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

    if (!res) return "response is emprty";

    if (!res.IsAuthenticated) {
      const { clearAuth } = useAuthStore.getState();
      await clearAuth();
      alert("Unauthorized access. Please log in again.\nการลงชื่อเข้าใช้งานหมดอายุ กรุณาลงชื่อเข้าใช้อีกครั้ง");
      window.location.href = '/login';
    }
  
    return res

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    return res.message
  }
  
}

export async function searchKhunJaiDeeWithCategory(value: RequestSearch): Promise<ResponseSearch | string> {
  try {
    console.log("value is service :", value)
    const data = await axios.post("/api/search/kjd-with-category", {
      searchContent: value.searchContent,
      loginId: value.loginId,
      system: value.system,
      module: value.module,
      function: value.function,
    });
    const res = data?.data;
    // const res = { IsAuthenticated: true, Response: "test" }

    if (!res) return "response is emprty";

    if (!res.IsAuthenticated) {
      const { clearAuth } = useAuthStore.getState();
      await clearAuth();
      alert("Unauthorized access. Please log in again.\nการลงชื่อเข้าใช้งานหมดอายุ กรุณาลงชื่อเข้าใช้อีกครั้ง");
      window.location.href = '/login';
    }
  
    return res
    // return ""

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

export async function getResent(): Promise<ResponseResent> {
  try {
    const { data } = await axios.post("/api/search/recent", {
      searchContent: "",
    });
    
    return data

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    console.error("Error fetching resent:", res.message);
    return { Response: "", SearchDocument: "", SearchDocumentLocation: "", Date: "" };
  }
}