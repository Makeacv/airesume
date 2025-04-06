"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, CreditCard } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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

// User profile button component
const UserProfileButton = () => {
  const { theme } = useTheme();

  return (
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
  );
};

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b bg-white/80 dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={isSignedIn ? "/resumes" : "/"}
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="block h-10 w-auto dark:hidden"
            />
            <Image
              src="/logodark.png"
              alt="Logo dark"
              width={120}
              height={40}
              className="hidden h-10 w-auto dark:block"
            />
          </Link>

          {/* Desktop Navigation Items */}
          {!isMobile && (
            <div className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
              <ThemeToggle />

              <Link
                href={isSignedIn ? "/resumes" : "/"}
                className="transition hover:text-orange-500"
              >
                {isSignedIn?"My CV": 'Home'}
              </Link>
              <Link href="/blog" className="transition hover:text-orange-500">
                Blog
              </Link>
              <Link href="/about" className="transition hover:text-orange-500">
                About
              </Link>
              <Link
                href="/contact"
                className="transition hover:text-orange-500"
              >
                Contact
              </Link>

              <div className="ml-1 flex items-center gap-4">
                {isSignedIn ? (
                  <UserProfileButton />
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button variant="ghost">Sign in</Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button variant="premium">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Mobile Navigation using Sheet from shadcn */}
          {isMobile && (
            <div className="flex items-center gap-2">
              {isSignedIn && <UserProfileButton />}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="z-50">
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent className="border-t bg-white dark:border-gray-800 dark:bg-black">
                  <div className="space-y-4 px-4 py-6">
                    <ThemeToggle />

                    <SheetClose asChild>
                      <Link
                        href={isSignedIn ? "/resumes" : "/"}
                        className="block transition hover:text-orange-500"
                      >
                        {isSignedIn ? "My CV" : 'Home'}

                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/blog"
                        className="block transition hover:text-orange-500"
                      >
                        Blog
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/about"
                        className="block transition hover:text-orange-500"
                      >
                        About
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="block transition hover:text-orange-500"
                      >
                        Contact
                      </Link>
                    </SheetClose>

                    {!isSignedIn && (
                      <div className="mt-4 flex flex-col gap-2">
                        <SheetClose asChild>
                          <Link href="/sign-in">
                            <Button variant="outline" className="w-full">
                              Sign in
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/sign-up">
                            <Button variant="premium" className="w-full">
                              Get Started
                            </Button>
                          </Link>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
