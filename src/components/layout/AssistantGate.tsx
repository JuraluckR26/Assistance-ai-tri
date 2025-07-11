'use client';
import { useAssistant } from "@/context/assistant-context";

export default function AssistantGate({ children }: { children: React.ReactNode }) {
  const { loading } = useAssistant();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-500">
        กำลังโหลดหน้า...
      </div>
    );
  }

  return <>{children}</>;
}
