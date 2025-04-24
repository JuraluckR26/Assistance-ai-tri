import httpClient from "./httpClient";
import { mapRawToDocumentItems } from "../mapper/search.mapper";

export async function fetchSearchDocument(question: string) {
  try {
    const data = await httpClient.post("SearchSpe1Document", {
      searchContent: question,
    });
    // console.log("data: ", data)
    const res = data?.data;
    // console.log("res in service: ", res)

    if (!res) return [];

    return mapRawToDocumentItems(res)
  } catch (err) {
    console.error("Search Document", err);
    return [];
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
    console.error("getFAQ error", err);
    return [];
  }
  
}