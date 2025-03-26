import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";


import LayoutWithNavbar from "@/components/layout/LayoutWithNavbar"; // ✅ new wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - AI Resume Builder",
    absolute: "AI Resume",
  },
  description:
    "Makeacv.ai Builder is the easiest way to create a professional resume that will help you land your dream job.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-G92NEJQXZG"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G92NEJQXZG');
            `}
          </Script>
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LayoutWithNavbar>{children}</LayoutWithNavbar>
            <Toaster />
          </ThemeProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}