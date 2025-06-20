import { handleAxiosError } from "@/utils/handleAxiosError";
import httpClient from "./httpClient";
import { RequestSearchChat, ResponseSearchChat } from "@/types/chatbot.type";

export async function searchChat(val: RequestSearchChat): Promise<ResponseSearchChat | string> {
    try {
      const data = await httpClient.post("ChatCompletion", {
        assistantName: val.assistantName,
        question: val.question,
      });
      console.log("res chat : ", data)
      const res = data?.data;
      if (!res) return { Response: "", SearchDocument: "", SearchDocumentLocation: "" };
      return res
  
    } catch (err: unknown) {
      const res = handleAxiosError(err);
      return res.message
    }
    
}