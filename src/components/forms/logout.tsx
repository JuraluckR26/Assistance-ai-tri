import { useState } from 'react';
import { logoutByLoginId } from "@/lib/api/authenService";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from 'sonner';

export default function useLogout() {
    const { loginId } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        if (!loginId) return;

        try {
            setIsLoading(true);
            const result = await logoutByLoginId(loginId);
            
            if (result.Status === "error") {
                toast.error(result.StatusMessage);
                localStorage.clear();
                document.cookie = "email=; path=/; max-age=0";
                window.location.href = "/login";
                // await clearAuth();
                // router.replace("/login");
                return;
            }
            localStorage.clear();
            document.cookie = "email=; path=/; max-age=0";
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
            localStorage.clear();
            document.cookie = "email=; path=/; max-age=0";
            window.location.href = "/login";
            // await clearAuth();
            // router.replace("/login");
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogout, isLoading };
}