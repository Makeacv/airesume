"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

const pagesWithNavbar = ["/", "/about", "/contact", "/faqs"];

export default function LayoutWithNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = pagesWithNavbar.includes(pathname) || pathname.startsWith('/blog');

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}