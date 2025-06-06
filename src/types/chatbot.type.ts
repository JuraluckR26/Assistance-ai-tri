export interface RequestSearchChat {
    assistantName: string,
    question: string
}

export interface ResponseSearchChat {
    Response: string;
    SearchDocument: string;
    SearchDocumentLocation: string;
}

export interface MappedSearchResponse {
    response: string;
    documents: { name: string; url: string }[];
}