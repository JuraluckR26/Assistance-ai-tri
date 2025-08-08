"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  loginId: string | null;
  isCanChat: boolean;
  isAuthenticated: boolean | null;
}

interface AuthActions {
  setLoginData: (loginId: string, isCanChat: boolean) => void;
  setIsAuthenticated: (val: boolean) => void;
  initializeAuth: () => void;
  clearAuth: () => void;
}

const initialState: AuthState = {
  loginId: null,
  isCanChat: false,
  isAuthenticated: null,
};

const clearAuthData = () => {
  localStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    const [name] = cookie.split("=");
    document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  sessionStorage.clear();
};

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            ...initialState,

            setLoginData: (loginId, isCanChat) => set({ loginId, isCanChat, isAuthenticated: true }),
            setIsAuthenticated: (val) => set({ isAuthenticated: val }),
            initializeAuth: () => {
                if (typeof window === "undefined") return;
                try {
                    const stored = localStorage.getItem("auth-storage");
                    if (stored) {
                        const { state } = JSON.parse(stored);
                        set(state);
                    }
                } catch (error) {
                    console.error("Failed to initialize auth:", error);
                    set(initialState);
                }
            },
            clearAuth: () => {
                clearAuthData();
                set(initialState);
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                loginId: state.loginId,
                isCanChat: state.isCanChat,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)