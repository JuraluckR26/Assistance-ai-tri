"use client"

import { createContext, ReactNode, use, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkAuthenticateByLoginId, checkAuthenticateByToken } from '@/lib/api/authenService';
import Loader2 from '@/components/shared/loading2';
import { ro } from 'date-fns/locale';

interface AuthContextType {
  isAuthenticated: boolean;
  loginId: string | null;
  isCanChat: boolean;
  setIsCanChat: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loginId: null,
  isCanChat: false,
  setIsCanChat: () => {}
});

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCanChat, setIsCanChat] = useState(false);
    const [loginId, setLoginId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (typeof window === 'undefined') return;

          const queryToken = new URLSearchParams(window.location.search).get('token');
          const localUserId = localStorage.getItem('loginId');
          console.log('Checking auth for userId:', localUserId);

          if (!localUserId) return router.replace('/login');
          if (queryToken) return await authenticateWithToken(queryToken);
          if (localUserId) return await authenticateWithLoginId(localUserId);
          return authenticateWithSessionEmail();
          
          async function authenticateWithToken(userId: string) {
            const result = await checkAuthenticateByToken(userId);
            if (result.IsAuthenticated) {
              setIsAuthenticated(true);
              setLoginId(userId);
              setIsCanChat(result.IsCanChat);
              router.replace(pathname === '/login' ? '/' : pathname);
            }
          }

          async function authenticateWithLoginId(userId: string) {
            const result = await checkAuthenticateByLoginId(userId)
            if (result.IsAuthenticated) {
              setIsAuthenticated(true);
              setLoginId(userId);
              // setIsCanChat(result.IsCanChat);
              router.replace(pathname === '/login' ? '/' : pathname);
            }
          }

          async function authenticateWithSessionEmail() {
            const res = await fetch('/api/auth/session');
            const data = await res.json();
            const email = data?.email;

            if (!email) return router.replace('/login');

            console.log("กำลังตรวจสอบอีเมล:", email);
            const result = await checkAuthenticateByLoginId(email);
            if (result.IsAuthenticated) {
              setIsAuthenticated(true);
              setLoginId(result.LoginId);
              setIsCanChat(result.IsCanChat);
              router.replace(pathname === '/login' ? '/' : pathname);
            } else {
              router.replace('/login');
            }
          }
          
          // const result = await checkAuthenticateByLoginId(localUserId);
          // console.log('Auth result:', result);
          // if (result?.IsAuthenticated) {
          //   setIsAuthenticated(true);
          //   setLoginId(result.LoginId);
          //   setIsCanChat(result.IsCanChat);
          // } else {
          //   setIsAuthenticated(false);
          //   setLoginId(null);
          //   setIsCanChat(false);
          //   if (pathname !== '/login') {
          //     router.push('/login');
          //   }
          // }
        } catch (err) {
          console.error('Error checking authentication:', err);
          setIsAuthenticated(false);
          setLoginId(null);
          setIsCanChat(false);
          if (pathname !== '/login') {
            router.push('/login');
          }
        } finally {
          setIsLoading(false);
        }
      }
      checkAuth();
    }, [pathname, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-2">
            {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div> */}
            <Loader2/>
            {/* <p className="text-xl text-gray-500">กำลังตรวจสอบสิทธิการเข้าถึง...</p> */}
          </div>
        </div>
      );
    }

    return (
      <AuthContext.Provider value={{ isAuthenticated, loginId, isCanChat, setIsCanChat }}>
        {children}
      </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

