import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import "@/lib/fontawesome";
import { Toaster } from 'sonner';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthTokenGuard from "@/components/layout/AuthTokenGuard";
import HeaderPage from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AI-Desk",
  description: "",
  icons: {
    icon: "/favicon.png",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <>
          <AuthTokenGuard>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header>
                  <HeaderPage/>
                </header>

                <main className="flex-1 min-h-screen overflow-auto">
                  <div className="px-0">
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
