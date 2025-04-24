import { DocumentItem, ResponseSearch } from "@/types/search.type"
  
export function mapRawToDocumentItems(raw: ResponseSearch): DocumentItem[] {
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
  