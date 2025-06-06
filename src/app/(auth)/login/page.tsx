import { LoginForm } from "@/components/login-from";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-0">
      <div className="flex w-full max-w-sm flex-col gap-0">
        <LoginForm />
      </div>
    </div>
  )
}
