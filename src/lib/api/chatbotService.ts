import { handleAxiosError } from "@/utils/handleAxiosError";
import { RequestSearchChat, ResponseAssistant, ResponseSearchChat } from "@/types/chatbot.type";
import axios from "axios";

export async function searchChat(val: RequestSearchChat): Promise<ResponseSearchChat | string> {
    try {
      const data = await axios.post("/api/chatbot/search", {
        assistantName: val.assistantName,
        question: val.question,
      });

      const res = data?.data;

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

    return res

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    console.error("Get Assistants error", res);
    return { IsCanChat: false, AssistantList: ""}
  }
  
}