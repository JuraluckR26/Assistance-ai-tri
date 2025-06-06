import { MappedSearchResponse, ResponseSearchChat } from "@/types/chatbot.type";

export function mapSearchChatResponse(data: ResponseSearchChat): MappedSearchResponse {
    const { Response, SearchDocument, SearchDocumentLocation } = data;
    const nameDoc = SearchDocument.split("||");
    const urlDoc = SearchDocumentLocation.split("||");
    
    const documents = nameDoc.map((name, index) => ({
        name,
        url: urlDoc[index],
    }));

    return {
        response: Response,
        documents,
    };

}
  