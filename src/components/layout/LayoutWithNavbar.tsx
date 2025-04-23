"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

const pagesWithNavbar = ["/", "/blog", "/about", "/contact", "/faqs"];

export default function LayoutWithNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = pagesWithNavbar.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}