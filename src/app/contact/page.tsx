"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const submitted = searchParams.get("success") === "true";
// for commit 
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-6">
            <h1 className="mb-6 text-3xl font-bold text-orange-500 sm:text-4xl md:text-5xl">
              Get in Touch
            </h1>

            <p className="text-justify text-gray-800 dark:text-zinc-300">
              Got a question, feedback, or need help with your CV? We&apos;re
              here for you! Whether you&apos;re a job seeker needing support, a
              recruiter using our premium tools, or just curious about how Make
              A CV works — don&apos;t hesitate to reach out.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-start gap-2 text-sm sm:text-base">
                <Phone className="h-4 w-4" />
                <a
                  className="text-orange-500 hover:underline"
                  href="tel:+27218510119"
                >
                  +27 21 851 0119
                </a>
              </div>
              <div className="flex items-center justify-start gap-2 text-sm sm:text-base">
                <Mail className="h-4 w-4" />
                <a
                  className="text-orange-500 hover:underline"
                  href="mailto:info@makeacv.co.za"
                >
                  info@makeacv.co.za
                </a>
              </div>
            </div>

            {!submitted ? (
              <form
                action="https://formspree.io/f/mzzevryv"
                method="POST"
                className="mt-8 space-y-6"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_redirect"
                  value="https://makeacv.co.za/contact?success=true"
                />

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help you?"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#FB6520] text-white transition hover:bg-[#e0551c]"
                >
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="text-center text-lg font-medium text-green-600">
                ✅ Thanks! Your message has been sent. We&apos;ll be in touch
                shortly.
              </div>
            )}
          </div>

          <div className="flex h-full items-center justify-center">
            <div className="relative aspect-square w-full max-w-md">
              <Image
                src="/contactus.jpg"
                alt="Make a CV - Contact us"
                fill
                className="rounded-lg object-cover shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
