import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.png"; // ✅ Replace with your current logo path
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"; // Or whichever social icons you use

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t dark:border-zinc-800 py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-zinc-400">
        
        {/* Logo + Description */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image src={logo} alt="Make a CV Logo" width={35} height={35} />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">Make a CV</span>
          </Link>
          <p className="text-sm">Helping South Africans build standout resumes in minutes — simple, fast & free.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-orange-500 transition">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-orange-500 transition">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-orange-500 transition">Contact</Link></li>
            <li><Link href="/pricing" className="hover:text-orange-500 transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3">Contact</h4>
          <p>📞 +27 21 851 0119</p>
          <p>📧 info@makeacv.co.za</p>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-orange-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaLinkedin /></a>
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