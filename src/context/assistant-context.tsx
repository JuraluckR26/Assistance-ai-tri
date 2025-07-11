"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAssistants } from "@/lib/api/chatbotService";
import { useAuth } from "./auth-context";

interface AssistantContextType {
  isCanChat: boolean;
  assistantList: string;
  loading: boolean;
}

const AssistantContext = createContext<AssistantContextType>({
  isCanChat: false,
  assistantList: "",
  loading: true,
});

export const AssistantProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCanChat, setIsCanChat] = useState<boolean>(false);
    const [assistantList, setAssistantList] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const { loginId } = useAuth()

    useEffect(() => {
        if (!loginId) return;
        
        const fetch = async () => {
            try {
                const res = await getAssistants(loginId);

                if (!res || !res.IsCanChat) {
                    setIsCanChat(false);
                    return;
                }
                setIsCanChat(res.IsCanChat);
                setAssistantList(res.AssistantList);

            } catch {
                setIsCanChat(false);
            } finally {
                setLoading(false);
            }
        };
        fetch();
        
    }, [loginId]);

    return (
        <AssistantContext.Provider value={{ isCanChat, assistantList, loading }}>
            {children}
        </AssistantContext.Provider>
    );
};

export const useAssistant = () => useContext(AssistantContext);
