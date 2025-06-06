import httpClient from "./httpClient";
import { RequestFeedback, RequestSearch, ResponseResent } from "@/types/search.type";
import { handleAxiosError } from "@/utils/handleAxiosError";

export interface RawResponse {
  Response: string;
  SearchDocument: string;
  SearchDocumentLocation: string;
}

export interface ResentResponse {
  Date: string;
  Response: string;
  SearchDocument: string;
  SearchDocumentLocation: string;
}

// export async function fetchSearchDocument(question: string) {
//   try {
//     const data = await httpClient.post("SearchSpe1Document", {
//       searchContent: question,
//     });
//     const res = data?.data;
//     if (!res) return [];
//     return res

//   } catch (err: unknown) {
//     const res = handleAxiosError(err);
//     return res.message
//   }
  
// }

export async function searchWithUserId(value: RequestSearch) {
  try {
    const data = await httpClient.post("SearchSpeKJDDocument", {
      searchContent: value.searchContent,
      loginId: value.loginId
    });
    const res = data?.data;
    if (!res) return [];
    return res

  } catch (err: unknown) {
    const res = handleAxiosError(err);
    return res.message
  }
  
}

export async function getFAQ(value: string): Promise<string[]> {
  try {
    const data = await httpClient.post("GetCosmosDb", {
      getKeyword: value,
    });
  
    const res = data?.data;
  
    if (!res?.ResString) return [];
  
    return res.ResString.split(",").map((s: string) => s.trim());

  } catch (err) {
    console.error("Get FAQ error", err);
    return [];
  }
  
}

export async function sendFeedback(value: RequestFeedback) {
  try {
    const { data } = await httpClient.post("SaveCosmosDb", value)
    return data

  } catch (err) {
    console.error("sendFeedback error", err);
    return { Response: "fail" };
  }
}

export async function getResent(): Promise<ResponseResent | string> {
  try {
    const { data } = await httpClient.post("SearchRecentDocument", {
      searchContent: "",
    });
    return data
  } catch (err: unknown) {
    const res = handleAxiosError(err);
    return res.message
  }
}