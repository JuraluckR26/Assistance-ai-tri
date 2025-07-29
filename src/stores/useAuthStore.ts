"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  loginId: string | null;
  isCanChat: boolean;
  setLoginData: (loginId: string, isCanChat: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            loginId: null,
            isCanChat: false,
            setLoginData: (loginId, isCanChat) => set({ loginId, isCanChat }),
            logout: () => set({ loginId: null, isCanChat: false }),
        }),
        {
            name: "auth-storage",
        }
    )
)