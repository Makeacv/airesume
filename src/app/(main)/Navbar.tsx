"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CreditCard } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        {/* Left side: Logo + nav links */}
        <div className="flex items-center gap-6">
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


          {/* ✅ Home link here */}
          <Link
            href="/resumes"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
           Home
          </Link>

          {/* ✅ Blog link here */}
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
            Blog
          </Link>

            {/* ✅ contact link here */}
            <Link
            href="/contact"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
            Contact us 
          </Link>

           {/* ✅ contact link here */}
           <Link
            href="/about"
            className="text-sm font-medium hover:text-orange-600 transition-colors"
          >
            About
          </Link>
        </div>
        

        {/* Right side: Theme toggle + User */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}