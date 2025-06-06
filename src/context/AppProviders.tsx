import { ReactNode } from 'react';
import { AuthProvider } from './auth-context';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
}
