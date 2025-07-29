import { RequestLogin } from "@/types/auth.type";
import axios from "axios";

export type AuthResult = {
    IsAuthenticated: boolean;
    LoginId: string;
    IsCanChat: boolean;
};

export async function checkAuthenticateByToken(token: string): Promise<AuthResult> {
    try {
        const response = await axios.post<AuthResult>("/api/auth/token", {token}); 
        const res = response?.data; 

        return res;
    }
    catch (err: unknown) {
        console.error('checkAuthenticateByToken error', err);
        return { IsAuthenticated: false, LoginId: '', IsCanChat: false };
    }
  
}

export async function checkAuthenticateByLoginId(loginId: string): Promise<AuthResult> {
    try {
        const response = await axios.post<AuthResult>("/api/auth/loginId", {loginId});
        const res = response?.data;

        return res;
    } 
    catch (err: unknown) {
        console.error('checkAuthenticateByLoginId error', err);
        return { IsAuthenticated: false, LoginId: '', IsCanChat: false };
    }
}

export async function checkLoginAuthenByUserPW(data: RequestLogin): Promise<AuthResult> {
    try {
        const response = await axios.post<AuthResult>("/api/auth/userpw", {
            data
        });

        return response?.data;
    }
    catch (err: unknown) {
        console.error('checkLoginAuthenByUserPW error', err);
        return { IsAuthenticated: false, LoginId: '', IsCanChat: false };
    }
}

export async function checkLoginAuthenByEmail(email: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/auth/gmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    return await res.json();
}