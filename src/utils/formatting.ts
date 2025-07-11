import { MappedSearchResponse, ResponseSearchChat } from "@/types/chatbot.type"
import { DocumentItem, ResponseResent, ResponseSearch } from "@/types/search.type"
import { formatThaiDate } from "@/utils/helpers"
  
// Search content
export function setFormatFromSearch(raw: ResponseSearch): {
  primary: DocumentItem[];
  related: DocumentItem[];
} {
  const primaryTitles = raw.SearchDocument?.split("||") || [];
  const primaryDescriptions = raw.Response?.split("||") || [];
  const primaryLinks = raw.SearchDocumentLocation?.split("||") || [];

  const relatedTitles = raw.SearchDocument_Other?.split("||") || [];
  const relatedDescriptions = raw.Response_Other?.split("||") || [];
  const relatedLinks = raw.SearchDocumentLocation_Other?.split("||") || [];

  const primary: DocumentItem[] = primaryTitles.map((title, index) => ({
    title: title.trim(),
    description: primaryDescriptions[index]?.trim() || "",
    link: primaryLinks[index]?.trim() || "#",
  }));

  const related: DocumentItem[] = relatedTitles.map((title, index) => ({
    title: title.trim(),
    description: relatedDescriptions[index]?.trim() || "",
    link: relatedLinks[index]?.trim() || "#",
  }));

  return { primary, related };
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
  
export function setFormatAssistant(input: string): string[] {
  return input
    .split(',')
    .map(val => val.trim())
    .filter(val => val !== "");
}