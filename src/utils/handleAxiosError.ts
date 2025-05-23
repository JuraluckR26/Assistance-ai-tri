import axios from "axios";

export function handleAxiosError(error: unknown): { status: number | null; message: string } {
    if (axios.isAxiosError(error)) {
        console.log("error :", error)
        const status = error.response?.status ?? null;
        if (status) {
            return { status, message: `Axios error: ${status}` };
        }

        if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
            return { status: null, message: "Network error: server not reachable" };
        }
    
        return { status: null, message: "Axios error: unknown cause" };
    }
    
    return { status: null, message: "Unexpected error" };
}