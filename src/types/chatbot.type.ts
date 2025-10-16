export interface RequestSearchChat {
    assistantName: string,
    question: string,
    loginId: string | null,
}

export interface ResponseSearchChat {
    Id: string
    IsAuthenticated: boolean
    Response: string;
    SearchDocument: string;
    SearchDocumentLocation: string;
}

export interface MappedSearchResponse {
    response: string;
    documents: { name: string; url: string }[];
}

export interface ResponseAssistant {
    AssistantList: string
    IsCanChat: boolean
}