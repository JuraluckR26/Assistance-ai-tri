import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import "@/lib/fontawesome";
import { Toaster } from 'sonner';
import { Kanit } from 'next/font/google';
import AuthTokenGuard from "@/components/layout/AuthTokenGuard";
import HeaderPage from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AI-Desk",
  description: "",
  icons: {
    icon: "/favicon.png",
  },
};

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300","400","500","600","700","800"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <>
          <AuthTokenGuard>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex flex-col min-h-screen overflow-x-hidden">
                <header className="flex-shrink-0">
                  <HeaderPage/>
                </header>

                <main className="flex-1 overflow-hidden">
                  <div className="h-full w-full px-3">
                    <>
                      {children}
                    </>
                  </div>
                </main>

              </SidebarInset>
            </SidebarProvider>

            <Toaster richColors position="top-right" />
          </AuthTokenGuard>
        </>
      </body>
    </html>
  );
}
