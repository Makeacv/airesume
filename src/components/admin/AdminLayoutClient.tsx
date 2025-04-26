"use client";

import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/admin/Sidebar";
import { Breadcrumb } from "@/components/admin/Breadcrumb";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-900">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex-1 p-8">
          <Breadcrumb />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
} 