import { create } from "zustand";
import { persist } from "zustand/middleware";

let initialStateFromStorage = {
  loginId: null,
  isCanChat: false,
  isAuthenticated: null,
  isPilot: false,
  loginType: null,
};

type AuthStore = {
  loginId: string | null;
  isCanChat: boolean;
  isAuthenticated: boolean | null;
  isPilot: boolean;
  loginType: 'username' | 'email' | 'token' | null;
  setLoginData: (loginId: string, isCanChat: boolean, loginType: 'username' | 'email' | 'token', isPilot?: boolean) => void;
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
    // Clear corrupted data
    localStorage.removeItem("auth-storage");
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
      isPilot: false,
      loginType: null,
      setLoginData: (loginId, isCanChat, loginType, isPilot = false) => {
        if (!loginType) {
          console.error('loginType is required but not provided');
          return;
        }
        set({ loginId, isCanChat, isPilot, loginType, isAuthenticated: true });
      },
      logout: () => {
        set({ loginId: null, isAuthenticated: false, isPilot: false, loginType: null });
      },
      clearAuth: () => {
          clearAuthData();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
