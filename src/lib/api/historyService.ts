import { RequestSearchHistory, ResponseHistory } from "@/types/history.type";
import axios from "axios";

export async function getHistory(value: RequestSearchHistory): Promise<ResponseHistory | null> {
    try {
        const response = await axios.post("/api/history/search-history", value);
        
        const result: ResponseHistory = response.data;
        
        return result;
    } catch (error: any) {
        console.error("Error fetching history:", error);
        
        // Handle different error types
        if (error.response) {
            // API returned an error response
            const errorMessage = error.response.data?.message || "Unknown API error";
            console.error("API Error:", errorMessage);
            throw new Error(`API Error: ${errorMessage}`);
        } else if (error.request) {
            // Network error
            console.error("Network Error: Unable to reach API");
            throw new Error("Network Error: Unable to reach API");
        } else {
            // Other errors
            console.error("Unexpected Error:", error.message);
            throw new Error(`Unexpected Error: ${error.message}`);
        }
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