import { DocumentItem, ResponseResent, ResponseSearch } from "@/types/search.type"
import { formatThaiDate } from "@/utils/main.funcion"
  
export function mapSearchResponse(raw: ResponseSearch): DocumentItem[] {
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

export function mapResentResponse(raw: ResponseResent): DocumentItem[] {
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
  