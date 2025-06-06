'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkAuthenticateByLoginId, checkAuthenticateByToken } from '@/lib/api/authenService';
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
    const checkToken = async () => {
        // const token = new URLSearchParams(window.location.search).get('token');
        const urlParams = new URLSearchParams(window.location.search)
        const queryToken = urlParams.get('token')

        if (queryToken) {
            const result = await checkAuthenticateByToken(queryToken); 
            if(result?.IsAuthenticated){
              localStorage.setItem('auth_token', queryToken)
              localStorage.setItem('loginId', result.LoginId)
              setLoginId(result.LoginId)
              setIsAuthenticated(true)
              router.replace(pathname)
              return
            }
        } else {
          const loginId = localStorage.getItem("loginId");

          if(loginId){
            const result = await checkAuthenticateByLoginId(loginId); 
            if(result?.IsAuthenticated){
              setLoginId(result.LoginId)
              setIsAuthenticated(true)
              return
            }
          }

          setIsAuthenticated(false)
          router.replace('/login')
        }
    }
    checkToken();

  }, [router, pathname, setLoginId]);

  if (pathname.startsWith('/login')) return <>{children}</>;

  return <>{isAuthenticated && children}</>
}
