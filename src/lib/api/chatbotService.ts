import { handleAxiosError } from "@/utils/handleAxiosError";
import { RequestSearchChat, ResponseAssistant, ResponseSearchChat } from "@/types/chatbot.type";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

export async function searchChat(val: RequestSearchChat): Promise<ResponseSearchChat | string> {
    try {
      const data = await axios.post("/api/chatbot/search", {
        assistantName: val.assistantName,
        question: val.question,
      });

      const res = data?.data;

      if (res?.IsAuthenticated === false) {
        const { clearAuth } = useAuthStore.getState();
        await clearAuth();
        window.location.href = '/login';
        return { Response: "", SearchDocument: "", SearchDocumentLocation: "" };
      }

      if (!res) return { Response: "", SearchDocument: "", SearchDocumentLocation: "" };
      
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
    localStorage.setItem("assistant_list_timestamp", Date.now().toString());

    return res

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    console.error("Get Assistants error", res);
    return { IsCanChat: false, AssistantList: ""}
  }
  
}