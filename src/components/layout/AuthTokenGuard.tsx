'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { checkAuthenticateByLoginId, checkAuthenticateByToken, checkLoginAuthenByEmail } from '@/lib/api/authenService';
import { useAuth } from '@/context/auth-context';

interface Props {
    children: React.ReactNode;
}

export default function AuthTokenGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const { setLoginId } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const checkToken = async () => {
        const queryToken = new URLSearchParams(window.location.search).get('token');
        const localLoginId = localStorage.getItem('loginId');

        if (queryToken) {
            const result = await checkAuthenticateByToken(queryToken); 

            if(result?.IsAuthenticated){
              localStorage.setItem('auth_token', queryToken)
              localStorage.setItem('loginId', result.LoginId)
              if (isMounted) {
                setLoginId(result.LoginId);
                setIsAuthenticated(true);
                router.replace(pathname);
              }
              return
            }

        } else {

          if(localLoginId){
            const result = await checkAuthenticateByLoginId(localLoginId); 

            if(result?.IsAuthenticated){
              if (isMounted) {
                setLoginId(result.LoginId);
                setIsAuthenticated(true);
              }
              return
            }

          } 
          else {
            try {
              const res = await fetch('/api/auth/session');
              const data = await res.json();
              const email = data?.email ?? null;

              if(email){
                const result = await checkLoginAuthenByEmail(email);
                if (result?.IsAuthenticated) {
                  localStorage.setItem('loginId', result.LoginId)
                  if (isMounted) {
                    setLoginId(result.LoginId);
                    setIsAuthenticated(true);
                  }
                  return;
                }
              }

            } catch (e) {
              console.error('Failed to fetch session email:', e);
            }
          }

          setIsAuthenticated(false)
          router.replace('/login')
        }
    }
    checkToken();

  }, [router, pathname, setLoginId]);

  if (pathname.startsWith('/login')) return <>{children}</>;

  if (isAuthenticated === null) return <div>Loading...</div>;

  return <>{isAuthenticated && children}</>
}
