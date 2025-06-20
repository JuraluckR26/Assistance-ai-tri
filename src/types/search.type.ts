export interface DocumentItem {
    title: string
    description: string
    link: string
    date?: string
}

export type ResponseSearch = {
    Response: string
    SearchDocument: string
    SearchDocumentLocation: string
}

export interface FAQResponse {
    ResString: string
}

export interface RequestFeedback {
    sender: string
    searchText: string
    resultText: string
    document: string
    documentLocation: string
    feecback?: string
    feecbackDetail?: string
}

export type ResponseResent = {
    Date: string;
    Response: string;
    SearchDocument: string;
    SearchDocumentLocation: string;
}

export type RequestSearch = {
    searchContent: string;
    loginId: string;
}