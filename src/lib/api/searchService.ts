import httpClient from "./httpClient";
import { RequestFeedback, RequestSearch, ResponseResent, ResponseSearch } from "@/types/search.type";
import { handleAxiosError } from "@/utils/handleAxiosError";

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

export async function searchWithUserId(value: RequestSearch): Promise<ResponseSearch | string> {
  try {
    const data = await httpClient.post("SearchSpeKJDDocument", {
      searchContent: value.searchContent,
      loginId: value.loginId
    });
    
    const res = data?.data;

    if (!res) return { Response: "", SearchDocument: "", SearchDocumentLocation: "" };

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