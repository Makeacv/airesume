import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";


import LayoutWithNavbar from "@/components/layout/LayoutWithNavbar"; // ✅ new wrapper
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - AI CV Builder",
    absolute: "Free CV Builder South Africa | Fast & Easy AI Tool | Make A CV",
  },
  description:
    "Create a professional CV in minutes with our free AI tool. It’s mobile-friendly and built for South Africans. No signup or credit card needed. Sign up now!",
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
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6307334884532063"
            crossOrigin="anonymous"></script>
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
          <link rel="icon" href="/favicon.ico" sizes="any" />
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