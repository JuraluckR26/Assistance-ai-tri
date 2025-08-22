import { create } from "zustand";
import { persist } from "zustand/middleware";

let initialStateFromStorage = {
  loginId: null,
  isCanChat: false,
  isAuthenticated: null,
};

type AuthStore = {
  loginId: string | null;
  isCanChat: boolean;
  isAuthenticated: boolean | null;
  setLoginData: (loginId: string, isCanChat: boolean) => void;
  logout: () => void;
  clearAuth: () => void;
};

if (typeof window !== "undefined") {
  try {
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      const parsed = JSON.parse(stored).state;
      if (parsed) {
        initialStateFromStorage = parsed;
      }
    }
  } catch (error) {
    console.error("Failed to parse persisted auth state:", error);
  }
}

const clearAuthData = () => {
  localStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    const [name] = cookie.split("=");
    document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  sessionStorage.clear();
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      loginId: null,
      isCanChat: false,
      isAuthenticated: initialStateFromStorage.isAuthenticated ? initialStateFromStorage.isAuthenticated : null,
      setLoginData: (loginId, isCanChat) => set({ loginId, isCanChat, isAuthenticated: true }),
      logout: () => set({ loginId: null, isAuthenticated: false }),
      clearAuth: () => {
          clearAuthData();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
