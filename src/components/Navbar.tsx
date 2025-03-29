"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";

// Custom hook to detect media query matches with a fallback for older browsers
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const handleChange = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [query]);

  return matches;
}

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 border-b dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto block dark:hidden"
            />
            <Image
              src="/logodark.png"
              alt="Logo dark"
              width={120}
              height={40}
              className="h-10 w-auto hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation Items */}
          {!isMobile && (
            <div className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
              <ThemeToggle />

              <Link href="/" className="hover:text-orange-500 transition">
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

              <div className="ml-1 flex items-center gap-4">
                <Link href="/resumes">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link href="/resumes">
                  <Button variant="premium">Get Started</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Navigation using Sheet from shadcn */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="z-50">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white dark:bg-black border-t dark:border-gray-800">
                <div className="px-4 py-6 space-y-4">
                  <ThemeToggle />

                  <SheetClose asChild>
                    <Link href="/" className="block hover:text-orange-500 transition">
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/blog" className="block hover:text-orange-500 transition">
                      Blog
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/about" className="block hover:text-orange-500 transition">
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/contact" className="block hover:text-orange-500 transition">
                      Contact
                    </Link>
                  </SheetClose>

                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link href="/resumes">
                        <Button variant="outline" className="w-full">
                          Sign in
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/resumes">
                        <Button variant="premium" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
}
