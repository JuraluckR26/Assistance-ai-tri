import { RequestSearchHistory, RequestUpdateHistory, ResponseHistory } from "@/types/history.type";
import axios from "axios";

export async function getHistory(value: RequestSearchHistory): Promise<ResponseHistory | null> {
    try {
        const response = await axios.post("/api/history/search-history", value);
        
        const result: ResponseHistory = response.data;
        
        return result;
    } catch (error: unknown) {
        console.error("Error fetching history:", error);
        
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response: { data?: { message?: string } } };
            const errorMessage = axiosError.response.data?.message || "Unknown API error";
            console.error("API Error:", errorMessage);
            throw new Error(`API Error: ${errorMessage}`);
        } else if (error && typeof error === 'object' && 'request' in error) {
            console.error("Network Error: Unable to reach API");
            throw new Error("Network Error: Unable to reach API");
        } else {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error("Unexpected Error:", errorMessage);
            throw new Error(`Unexpected Error: ${errorMessage}`);
        }
    }
}

export async function updateHistory(value: RequestUpdateHistory): Promise<string | null> {
    try {
        const response = await axios.post("/api/history/update-history", value);
        const result: string = response.data;

        return result;
    } catch (error: unknown) {
        console.error("Error updating history:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Error updating history: ${errorMessage}`);
    }
}

// Helper function to validate date range
export function validateDateRange(startDate: string, endDate: string): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return false;
    }
    
    return start <= end;
}

// Helper function to format date for API
export function formatDateForAPI(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}