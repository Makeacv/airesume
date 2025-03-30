import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t dark:border-zinc-800 py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-zinc-400">

        {/* Logo + Description */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
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
          <p className="text-sm sm:text-base">
            Helping South Africans build standout resumes in minutes - simple, fast &amp; free.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link href="/about" className="hover:text-orange-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-orange-500 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-500 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-orange-500 transition">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3">
            Contact
          </h4>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
            <Phone className="w-4 h-4" />
            <a className="hover:text-orange-500 hover:underline" href="tel:+27218510119">
              +27 21 851 0119
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
            <Mail className="w-4 h-4" />
            <a className="hover:text-orange-500 hover:underline" href="mailto:info@makeacv.co.za">
              info@makeacv.co.za
            </a>
          </div>
        </div>

        {/* Socials */}
        <div className="text-center">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3">
            Follow Us
          </h4>
          <div className="flex justify-center gap-4 text-xl">
            <a href="#" className="hover:text-orange-500 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-orange-500 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-orange-500 transition">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-600">
        © {new Date().getFullYear()} Make a CV. All rights reserved.
      </div>
    </footer>
  );
}
