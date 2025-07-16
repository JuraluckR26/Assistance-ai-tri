"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { checkLoginAuthenByUserPW } from "@/lib/api/authenService"
import { useRouter } from "next/navigation"
import { RequestLogin } from "@/types/auth.type"
import { useAuth } from "@/context/auth-context"
import { FcGoogle } from "react-icons/fc"
import { getAssistants } from "@/lib/api/chatbotService"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
    const { setLoginId } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        try {
            const payload: RequestLogin = {
                username: username,
                password: password
            };

            const data = await checkLoginAuthenByUserPW(payload)
            
            if (data?.IsAuthenticated) {
                const assistantVal = await getAssistants(data.LoginId);
                if (assistantVal?.IsCanChat !== undefined) {
                    localStorage.setItem('status_chat', JSON.stringify(assistantVal.IsCanChat));
                }

                localStorage.setItem("loginId", data.LoginId);
                setLoginId(data.LoginId)
                router.replace('/search')
            } else {
                alert("ลงชื่อเข้าใช้ไม่สำเร็จ username หรือ password ไม่ถูกต้อง");
            }
    
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Login failed:", err.message)
            } else {
                console.error("Unknown error from login", err)
            }
        }
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        window.location.href = '/api/auth/glogin/start'
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                    Login with your Gmail account
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 pb-4">
                        <div className="flex flex-col">
                            <Button variant="outline" className="w-full cursor-pointer" onClick={handleLogin}>
                                <FcGoogle />
                                Sign in with Gmail
                            </Button>
                        </div>
                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                            <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Or continue with
                            </span>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>                
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <Button type="submit" className="w-full cursor-pointer">
                            Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
