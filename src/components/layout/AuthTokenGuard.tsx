'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkAuthenticateByLoginId, checkAuthenticateByToken, checkLoginAuthenByEmail } from '@/lib/api/authenService';
import { useAuthStore } from '@/stores/useAuthStore';
import Loader2 from '../shared/loading2';

interface Props {
    children: React.ReactNode;
}

export default function AuthTokenGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { loginId, setLoginData } = useAuthStore();
  console.log(isAuthenticated)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const queryToken = new URLSearchParams(window.location.search).get('token');

        if (loginId) return await authenticateWithLoginId(loginId);
        if (queryToken) return await authenticateWithToken(queryToken);
        return authenticateWithSessionEmail();

        async function authenticateWithLoginId(userId: string) {
          const result = await checkAuthenticateByLoginId(userId);
          // if (!result.IsAuthenticated) return redirectToLogin();
          await handleAuthSuccess();
        }

        async function authenticateWithToken(userId: string) {
          const result = await checkAuthenticateByToken(userId);
          if (!result.IsAuthenticated) return redirectToLogin();

          setLoginData(userId, result.IsCanChat);
          await handleAuthSuccess();
        }

        async function authenticateWithSessionEmail() {
          const sessionEmail = await fetch('/api/auth/session');
          const data = await sessionEmail.json();
          const email = data?.email;

          if (!email) {
            setIsAuthenticated(false);
            return;
          }

          const result = await checkLoginAuthenByEmail(email);
          if (!result.IsAuthenticated) return redirectToLogin();

          setLoginData(result.LoginId, result.IsCanChat);
          handleAuthSuccess();
        }

        async function handleAuthSuccess() {
          setIsAuthenticated(true);
          if (pathname === '/login') {
            router.replace('/search');
          } 
        }

        function redirectToLogin() {
          setIsAuthenticated(false);
          setTimeout(() => {
            router.replace('/login');
          }, 300);
        }
        
      } catch (error) {
        console.error('Error checking authentication:', error);
      } 
    }
    checkAuth();

  }, [router, pathname, loginId, setLoginData]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2/>
        </div>
      </div>
    );
  }
  return <>{children}</>
}
