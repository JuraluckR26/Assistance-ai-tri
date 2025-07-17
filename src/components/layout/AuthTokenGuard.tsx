'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkAuthenticateByLoginId, checkAuthenticateByToken, checkLoginAuthenByEmail } from '@/lib/api/authenService';
import { useAuth } from '@/context/auth-context';
import { getAssistants } from '@/lib/api/chatbotService';

interface Props {
    children: React.ReactNode;
}

export default function AuthTokenGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setLoginId } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const checkToken = async () => {
        const queryToken = new URLSearchParams(window.location.search).get('token');
        const localLoginId = localStorage.getItem('loginId');

        if (queryToken) return await authenticateWithToken(queryToken);
        if (localLoginId) return await authenticateWithLoginId(localLoginId);
        return authenticateWithSessionEmail();

        async function authenticateWithToken(token: string) {
          const result = await checkAuthenticateByToken(token);
          if (!result?.IsAuthenticated) return redirectToLogin();

          await settingValueToStorage(result.LoginId)
          await handleAuthSuccess(result.LoginId);
          localStorage.setItem('loginId', token);
        }

        async function authenticateWithLoginId(loginId: string) {
          const result = await checkAuthenticateByLoginId(loginId);
          if (!result?.IsAuthenticated) {
            localStorage.removeItem('loginId');
            return redirectToLogin();
          }
  
          await handleAuthSuccess(result.LoginId);
        }

        async function authenticateWithSessionEmail() {
          try {
            const res = await fetch('/api/auth/session');
            const data = await res.json();
            const email = data?.email;
  
            if (!email) return redirectToLogin();
  
            const result = await checkLoginAuthenByEmail(email);
            if (!result?.IsAuthenticated) return redirectToLogin();
  
            await settingValueToStorage(result.LoginId)
            await handleAuthSuccess(result.LoginId);
          } catch (e) {
            console.error('Session email fetch failed:', e);
            redirectToLogin();
          }
        }

        async function settingValueToStorage(loginId: string) {
          const assistantVal = await getAssistants(loginId);
            if (assistantVal?.IsCanChat) {
              localStorage.setItem('status_chat', JSON.stringify(assistantVal.IsCanChat));
              localStorage.setItem('assistant_list', assistantVal.AssistantList);
            }
        }

        async function handleAuthSuccess(loginId: string) {
            if (!isMounted) return;

            setLoginId(loginId);
            setIsAuthenticated(true);
            localStorage.setItem('loginId', loginId);
    
            if (pathname === '/login') {
              router.replace('/search');
            } 
            
        }

        function redirectToLogin() {
          if (isMounted) {
            window.localStorage.clear();
            setTimeout(() => {
              setIsAuthenticated(false);
              router.replace('/login');
            }, 300);
          }
        }

    }
    checkToken();

    return () => {
      isMounted = false;
    };

  }, [router, pathname, setLoginId]);

  if (pathname.startsWith('/login')) return <>{children}</>;

  if (isAuthenticated === null) return <div className="flex items-center justify-center h-screen text-xl text-gray-500">กำลังตรวจสอบข้อมูล...</div>;

  return <>{children}</>
}
