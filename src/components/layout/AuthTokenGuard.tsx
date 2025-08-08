'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkAuthenticateByToken, checkLoginAuthenByEmail } from '@/lib/api/authenService';
import { useAuthStore } from '@/stores/useAuthStore';
import Loader2 from '../shared/loading2';

interface Props {
    children: React.ReactNode;
}

export default function AuthTokenGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setLoginData, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const handleAuthSuccess = useCallback(async (loginId: string, isCanChat: boolean) => {
    setLoginData(loginId, isCanChat);
    if (pathname === '/login') {
      await router.replace('/search');
    }
  },[setLoginData, pathname, router]);

  const checkTokenAuth = useCallback(async (token: string) => {
    const result = await checkAuthenticateByToken(token);
    if (result.IsAuthenticated) {
      await handleAuthSuccess(result.LoginId, result.IsCanChat);
      return true;
    }
    return false;
  },[handleAuthSuccess]);

  const checkEmailAuth = useCallback(async (email: string) => {
    const result = await checkLoginAuthenByEmail(email);
    if (result.IsAuthenticated) {
      await handleAuthSuccess(result.LoginId, result.IsCanChat);
      return true;
    }
    return false;
  }, [handleAuthSuccess]);

  const handleAuthFailure = useCallback(async () => {
    clearAuth();
    if (pathname !== '/login') {
      await router.replace('/login');
    }
  }, [clearAuth, pathname, router]);

  useEffect(() => {
    if (isAuthenticated === true && pathname === '/login') {
      router.replace('/search');
    }
  }, [isAuthenticated, pathname, router]);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated === true) return;

      try {
        setIsLoading(true);

        if (isAuthenticated === false) {
          await handleAuthFailure();
          return;
        }

        const queryToken = new URLSearchParams(window.location.search).get('token');
        if (queryToken && await checkTokenAuth(queryToken)) {
          return;
        }

        const sessionEmail = await fetch('/api/auth/session');
        const { email } = await sessionEmail.json();
        if (email && await checkEmailAuth(email)) {
          return;
        }

        // await handleAuthFailure();
      } catch (error) {
        console.error('Error checking authentication:', error);
        await handleAuthFailure();
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [isAuthenticated, checkTokenAuth, checkEmailAuth, handleAuthFailure]);

  const LoadingState = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 />
        <p className="text-sm text-gray-500">กำลังตรวจสอบสิทธิ์การเข้าถึง...</p>
      </div>
    </div>
  );

  if (isLoading) return <LoadingState />

  return <>{children}</>
}
