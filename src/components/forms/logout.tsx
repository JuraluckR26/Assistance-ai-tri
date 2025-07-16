
export default function useLogout() {
    if (typeof window !== "undefined") {
        window.localStorage.clear();
        document.cookie = "email=; path=/; max-age=0";
        window.location.href = "/login";
    }
}
