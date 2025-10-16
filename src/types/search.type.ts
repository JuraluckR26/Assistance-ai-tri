export interface DocumentItem {
    title: string
    description: string
    link: string
    date?: string
}

export type ResponseSearch = {
    Id: string
    IsAuthenticated: boolean
    Response: string
    Response_Other?: string
    SearchDocument: string
    SearchDocumentLocation: string
    SearchDocumentLocation_Other?: string
    SearchDocument_Other?: string
}

export interface FAQResponse {
    ResString: string
}

export interface RequestFeedback {
    id: string
    loginId: string
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