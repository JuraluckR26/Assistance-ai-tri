import { logoutByLoginId } from "@/lib/api/authenService";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from 'sonner';

export default function useLogout() {
    const { loginId } = useAuthStore();

    const handleLogout = async () => {
        if (!loginId) return;

        try {
            const result = await logoutByLoginId(loginId);
            
            if (result.Status === "error") {
                toast.error(result.StatusMessage);
                localStorage.clear();
                document.cookie = "email=; path=/; max-age=0";
                window.location.href = "/login";
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
        }
    };

    return { handleLogout };
}