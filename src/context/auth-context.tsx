'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  loginId: string
  setLoginId: (id: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginId, setLoginId] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("loginId")
    if (saved) setLoginId(saved)
  }, [])

  return (
    <AuthContext.Provider value={{ loginId, setLoginId }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
