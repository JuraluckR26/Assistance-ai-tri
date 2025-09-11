import { handleAxiosError } from "@/utils/handleAxiosError";
import { RequestSearchChat, ResponseAssistant, ResponseSearchChat } from "@/types/chatbot.type";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

export async function searchChat(val: RequestSearchChat): Promise<ResponseSearchChat | string> {
    try {
      const data = await axios.post("/api/chatbot/search", {
        assistantName: val.assistantName,
        question: val.question,
        loginId: val.loginId
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

export async function getAssistants(id: string): Promise<ResponseAssistant> {
  try {
    const data = await axios.post("/api/chatbot/assistants", {
      loginId: id
    });

    const res: ResponseAssistant = data?.data;

    if(!res.IsCanChat) return { IsCanChat: false, AssistantList: ""}

    localStorage.setItem("assistant_list", res.AssistantList);

    return res

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    console.error("Get Assistants error", res);
    return { IsCanChat: false, AssistantList: ""}
  }
  
}

export async function getFAQList(key: string, assistant: string) {
  try {
    const data = await axios.post("/api/chatbot/faq", {
      getKeyword: key,
      assistantName: assistant
    });

    const res = data?.data;
    
    if (!res?.ResString) return [];

    return res.ResString.split(",").map((s: string) => s.trim());

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    console.error("Get FAQ List error", res);
    return []
  }
}