import { MappedSearchResponse, ResponseSearchChat } from "@/types/chatbot.type";

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
  