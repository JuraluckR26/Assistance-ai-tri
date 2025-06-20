
export default function useLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loginId');
    localStorage.removeItem('userId');
  
    window.location.href = '/login';
}
