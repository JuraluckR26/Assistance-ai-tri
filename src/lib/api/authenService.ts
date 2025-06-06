import { RequestLogin } from "@/types/auth.type";
import httpClient from "./httpClient";

export type AuthResult = {
    IsAuthenticated: boolean;
    LoginId: string;
};

export async function checkAuthenticateByToken(token: string): Promise<AuthResult> {
    try {
        const response = await httpClient.post<AuthResult>("GetMiraiAuthenByTokenId", token); 
        const res = response?.data; 
        return res;
    }
    catch (err: unknown) {
        console.error('checkAuthenticateByToken error', err);
        return { IsAuthenticated: false, LoginId: '' };
    }
  
}

export async function checkAuthenticateByLoginId(loginId: string): Promise<AuthResult> {
    try {
        const response = await httpClient.post<AuthResult>("GetMiraiAuthenByLoginId", loginId);

        const res = response?.data;

        return res;
    } 
    catch (err: unknown) {
        console.error('checkAuthenticateByLoginId error', err);
        return { IsAuthenticated: false, LoginId: '' };
    }
}

export async function checkLoginAuthenByUserPW(data: RequestLogin): Promise<AuthResult> {
    try {
        const response = await httpClient.post<AuthResult>("GetAuthenByLogin", {
            userName: data.username,
            passWord: data.password,
        });

        return response?.data;
    }
    catch (err: unknown) {
        console.error('checkLoginAuthenByUserPW error', err);
        return { IsAuthenticated: false, LoginId: '' };
    }
}
