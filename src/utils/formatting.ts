import { MappedSearchResponse, ResponseSearchChat } from "@/types/chatbot.type"
import { DocumentItem, ResponseResent, ResponseSearch } from "@/types/search.type"
import { formatThaiDate } from "@/utils/helpers"
  
// Search content
export function setFormatFromSearch(raw: ResponseSearch): DocumentItem[] {
  const titles = raw.SearchDocument.split("||")
  const descriptions = raw.Response.split("||")
  const links = raw.SearchDocumentLocation.split("||")

  const result: DocumentItem[] = titles.map((title, index) => ({
    title: title.trim(),
    description: descriptions[index]?.trim() || "",
    link: links[index]?.trim() || "#",
  }))

  return result
}

export function setFormatFromResent(raw: ResponseResent): DocumentItem[] {
  const titles = raw.SearchDocument.split("||");
  const links = raw.SearchDocumentLocation.split("||");
  const descriptions = raw.Response.split("||");
  const dates = raw.Date.split("||");

  const result: DocumentItem[] = titles.map((title, index) => ({
    title: title.trim(),
    description: descriptions[index]?.trim() || "",
    link: links[index]?.trim() || "#",
    date: formatThaiDate(dates[index]?.trim()) || "",
  }));

  return result;
}

// Chatbot content
export function setFormatFromSearchChat(data: ResponseSearchChat): MappedSearchResponse {
    const { Response, SearchDocument, SearchDocumentLocation } = data;
    const nameDoc = SearchDocument.split("||");
    const urlDoc = SearchDocumentLocation.split("||");
    
    const documents = nameDoc.map((name, index) => ({
        name,
        url: urlDoc[index],
    }));

    const formattedResponse = Response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    return {
        response: formattedResponse,
        documents,
    };

}
  