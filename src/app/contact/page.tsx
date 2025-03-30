"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const submitted = searchParams.get("success") === "true";

  return (
    <>
      <main className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-6">
          Get in Touch
        </h1>
        <p className="text-gray-800 dark:text-zinc-300 mb-6 text-justify">
          Got a question, feedback, or need help with your CV? We&apos;re here for you! Whether you&apos;re a job seeker needing support, a recruiter using our premium tools, or just curious about how Make A CV works — don&apos;t hesitate to reach out.
        </p>

        <div className="mb-10 text-center space-y-2">
          <div className="flex items-center justify-start gap-2 text-sm sm:text-base">
            <Phone className="w-4 h-4" />
            <a className="text-orange-500 hover:underline" href="tel:+27218510119">
              +27 21 851 0119
            </a>
          </div>
          <div className="flex items-center justify-start gap-2 text-sm sm:text-base">
            <Mail className="w-4 h-4" />
            <a className="text-orange-500 hover:underline" href="mailto:info@makeacv.co.za">
              info@makeacv.co.za
            </a>
          </div>
        </div>

        {!submitted ? (
          <form
            action="https://formspree.io/f/mzzevryv"
            method="POST"
            className="space-y-6"
          >
            {/* Hidden spam protection */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_redirect" value="https://makeacv.co.za/contact?success=true" />

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <Input
                type="text"
                name="name"
                required
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <Textarea
                name="message"
                required
                rows={5}
                placeholder="How can we help you?"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="bg-[#FB6520] text-white hover:bg-[#e0551c] transition"
            >
              Send Message
            </Button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-medium text-lg">
            ✅ Thanks! Your message has been sent. We’ll be in touch shortly.
          </div>
        )}
      </main>
    </>
  );
}
