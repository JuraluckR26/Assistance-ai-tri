export interface DocumentItem {
    title: string
    description: string
    link: string
}

export type ResponseSearch = {
    Response: string
    SearchDocument: string
    SearchDocumentLocation: string
}

export interface FAQResponse {
    ResDecimal: number
    ResString: string[]
}