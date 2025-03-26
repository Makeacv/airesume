"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Or wherever your Button component is
import ThemeToggle from "@/components/ThemeToggle"; // ✅ Import the toggle

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
  {/* Light mode logo */}
  <Image
    src="/logo.png"
    alt="Logo"
    width={120}
    height={40}
    className="h-10 w-auto block dark:hidden"
  />

  {/* Dark mode logo */}
  <Image
    src="/logodark.png"
    alt="Logo dark"
    width={120}
    height={40}
    className="h-10 w-auto hidden dark:block"
  />
</Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
            {/* 👇 Theme toggle button placed here */}
            <ThemeToggle />

            <Link href="/resumes" className="hover:text-orange-500 transition">
              Home
            </Link>

            <Link href="/blog" className="hover:text-orange-500 transition">
              Blog
            </Link>
            <Link href="/about" className="hover:text-orange-500 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>

            {/* CTA + ThemeToggle */}
            <div className="ml-1 flex items-center gap-4">
              <Link href="/resumes">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/resumes">
                <Button variant="premium">Get Started</Button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}