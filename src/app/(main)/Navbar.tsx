"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CreditCard, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <div className="flex items-center w-full">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="block h-10 w-auto myCVLogo dark:hidden"
            />

            <Image
              src="/logodark.png"
              alt="Logo dark"
              width={120}
              height={40}
              className="hidden h-10 w-auto myCVLogo dark:block"
            />
          </Link>

          {!isMobile && (
            <div className="w-full flex justify-end gap-3">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-orange-600"
              >
Home              </Link>
              <Link
                href="/resumes"
                className="text-sm font-medium transition-colors hover:text-orange-600"
              >
                My CV
              </Link>

              {/* <Link
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-orange-600"
              >
                Blog
              </Link> */}

              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-orange-600"
              >
                Contact us
              </Link>

              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-orange-600"
              >
                About
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isMobile && <ThemeToggle />}

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

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-t bg-white dark:border-gray-800 dark:bg-black">
                <div className="flex flex-col gap-6 pt-10">
                  <ThemeToggle />
                  <SheetClose asChild>
                    <Link
                      href="/resumes"
                      className="text-base font-medium transition-colors hover:text-orange-600"
                    >
                      My CV
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/blog"
                      className="text-base font-medium transition-colors hover:text-orange-600"
                    >
                      Blog
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className="text-base font-medium transition-colors hover:text-orange-600"
                    >
                      Contact us
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className="text-base font-medium transition-colors hover:text-orange-600"
                    >
                      About
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
